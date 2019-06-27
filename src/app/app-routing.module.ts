import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from "./registro/registro.component"
import { AuthGuard } from "./_guards/auth.guard";
import { UserFormComponent } from './user-form/user-form.component';
import { ProfileGuard } from './_guards/profile.guard';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "registro", component: RegistroComponent },
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
