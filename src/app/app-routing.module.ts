import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from "./registro/registro.component"
import { AuthGuard } from "./_guards/auth.guard";
import { SucursalBoardComponent } from "./sucursal-board/sucursal-board.component";
import { UserFormComponent } from './user-form/user-form.component';
import { VehiculoFormComponent } from "./vehiculo-form/vehiculo-form.component";
import { ProfileGuard } from './_guards/profile.guard';
import { ViajeFormComponent } from './viaje-form/viaje-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "registro", component: RegistroComponent },
  { path: "sucursal_board", component: SucursalBoardComponent, canActivate: [AuthGuard] },
  { 
    path: 'user_list', 
    component: UserListComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: ["1", "2"]
    } 
  },
  { 
    path: 'user_form', 
    component: UserFormComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: ["1", "2"],
      title: "Registrar usuario"
    } 
  },
  { 
    path: 'user_form/:id', 
    component: UserFormComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: ["1", "2"],
      title: "Modificar usuario"
    } 
  },
  { 
    path: 'vehiculo_form', 
    component: VehiculoFormComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: ["1", "2"]
    } 
  },
  { 
    path: 'viaje_form', 
    component: ViajeFormComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: ["4"]
    } 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: []
    } 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'pedidoForm' , component: PedidoFormComponent, canActivate: [ProfileGuard], data: {expectedRole:[]}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      //,{ enableTracing: true }   //use for debug
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
