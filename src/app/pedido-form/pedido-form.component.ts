import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { PedidoService } from '../_services/pedido.service';
import { ItemMenuService } from '../_services/item-menu.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private itemMenuService: ItemMenuService
    ) { }

  ngOnInit() {
   this.itemMenuService.getItems().subscribe(
     (result)=>{
       this.itemsMenu = result;
     },
     error=>console.error(error),
     ()=>console.log("Complete!")
   ); 
  }

  private itemsMenu;

  pedidoForm = this.fb.group({
    id: [''],
    mozo: [''],
    mesa: [''],
    codigo: [''],
    cliente: ['', Validators.required],
    foto: [''],
    fechaCreacion: [''],
    fechaFin: [''],
    estado: [''],
    items: this.fb.array([
    ])
  });

  get items() {
    return this.pedidoForm.get('items') as FormArray;
  }


  updateProfile() {
    this.pedidoForm.patchValue({
      cliente: 'Nancy'
    });
  }

  addItem() {
    this.items.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.info(this.pedidoForm.value);
  }

}
