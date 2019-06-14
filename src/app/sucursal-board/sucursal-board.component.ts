import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucursal-board',
  templateUrl: './sucursal-board.component.html',
  styleUrls: ['./sucursal-board.component.css']
})
export class SucursalBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private sucursales = [];

  delete(sucursal){
    alert("work!");
  }

  edit(sucursal){
    alert("work!");
  }

}
