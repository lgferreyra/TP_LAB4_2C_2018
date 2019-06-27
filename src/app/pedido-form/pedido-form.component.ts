import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { PedidoService } from '../_services/pedido.service';
import { ItemMenuService } from '../_services/item-menu.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MesaService } from '../_services/mesa.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {
  
  private itemsMenu = [];
  private selectedItemsMenu = [];
  private pedidoDetalles = [];
  private mesas = [];
  private mozo;
  private selectedSector = "0";

  pedidoForm = this.fb.group({
    id: [''],
    mozo: [''],
    mesa: ['', Validators.required],
    codigo: [''],
    cliente: ['', Validators.required],
    foto: [null],
    fechaCreacion: [''],
    fechaFin: [''],
    estado: ['']
  });
  
  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private itemMenuService: ItemMenuService,
    private authService: AuthenticationService,
    private mesaService: MesaService,
    private router: Router,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
   this.itemMenuService.getItems().subscribe(
     (result)=>{
       this.itemsMenu = result;
       this.selectedItemsMenu = this.itemsMenu;
     },
     error=>console.error(error)
   );
   let token = localStorage.getItem('currentUser');
   if(token!=null){
    this.authService.getUserInfo(token).subscribe(
      (result)=>{
        this.mozo = result.data.id;
        this.pedidoForm.get('mozo').setValue(this.mozo);
      }
    );
    this.mesaService.getMesas().subscribe(
      (result)=>{
        console.log(result);
        this.mesas = result;
        if(this.mesas.length>0){
          this.pedidoForm.get('mesa').setValue(this.mesas[0].MesaID)
        }
      }
    );
   }
  }


  clear(){
    this.pedidoForm.reset();
    this.pedidoForm.get('mozo').setValue(this.mozo);
    this.pedidoDetalles = [];
  }

  addItem(item){
    console.log(item);
    let exist = false;
    this.pedidoDetalles.forEach(element => {
      if(element.item.itemMenuID===item.itemMenuID){
        exist = true;
      }
    });
    if(!exist){
      this.pedidoDetalles.push({item:item, cantidad:1});
    }
  }

  removeItem(item){
    console.log(item);
    console.log(this.pedidoDetalles.indexOf(item));
    this.pedidoDetalles.splice(this.pedidoDetalles.indexOf(item),1);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    let pedido = this.pedidoForm.value;
    pedido.pedidoDetalles = this.pedidoDetalles;
    console.info(pedido);
    this.pedidoService.savePedido(pedido).subscribe(
      (response)=>{
        console.log(response);
        const dialogRef = this.dialog.open(ResumenDialog, {
          width: '270px',
          data: {codigoPedido:response.codigoPedido,codigoMesa:response.codigoMesa}
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(["/dashboard"]);
        });
      }
    );
  }

  changeSector(){
    console.log(this.selectedSector);
    this.selectedItemsMenu = this.itemsMenu;
    this.selectedItemsMenu = this.selectedItemsMenu.filter(
      (item, index)=>{
        console.log(item);
        if(this.selectedSector == "0" || item.sectorID == parseInt(this.selectedSector)){
          return item;
        }
      }
    );
  }

  test(){
    const dialogRef = this.dialog.open(ResumenDialog, {
      width: '270px',
      data: {codigoPedido:1,codigoMesa:2}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/dashboard"]);
    });
  }

}

@Component({
  selector: 'resumen-dialog',
  templateUrl: 'resumen-dialog.html',
})
export class ResumenDialog {

  constructor(
    public dialogRef: MatDialogRef<ResumenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}