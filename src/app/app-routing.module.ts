import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from "./registro/registro.component"
import { AuthGuard } from "./_guards/auth.guard";
import { ProfileGuard } from './_guards/profile.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PedidoFormComponent } from './pedido-form/pedido-form.component';
import { ReportEmpleadoIngresosComponent } from './report-empleado-ingresos/report-empleado-ingresos.component';
import { ReportEmpleadoOperacionesComponent } from './report-empleado-operaciones/report-empleado-operaciones.component';
import { ReportPedidoCanceladosComponent } from './report-pedido-cancelados/report-pedido-cancelados.component';
import { ReportPedidoDemoradosComponent } from './report-pedido-demorados/report-pedido-demorados.component';
import { ReportPedidoVentasComponent } from './report-pedido-ventas/report-pedido-ventas.component';
import { ReportMesaComentariosComponent } from './report-mesa-comentarios/report-mesa-comentarios.component';
import { ReportMesaFacturacionComponent } from './report-mesa-facturacion/report-mesa-facturacion.component';
import { ReportMesaImportesComponent } from './report-mesa-importes/report-mesa-importes.component';
import { ReportMesaTopFacturacionComponent } from './report-mesa-top-facturacion/report-mesa-top-facturacion.component';
import { ReportMesaUsosComponent } from './report-mesa-usos/report-mesa-usos.component';
import { ConsultaPedidoComponent } from './consulta-pedido/consulta-pedido.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "registro", component: RegistroComponent },
  { path: "consultaPedido/:pedido/:mesa", component: ConsultaPedidoComponent },
  { 
    path: 'pedidoForm', 
    component: PedidoFormComponent, 
    canActivate: [ProfileGuard], 
    data: { 
      expectedRole: [3, 2]
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
  { path: 'report-empleado-ingresos' , component: ReportEmpleadoIngresosComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-empleado-operaciones' , component: ReportEmpleadoOperacionesComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-pedido-cancelados' , component: ReportPedidoCanceladosComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-pedido-demorados' , component: ReportPedidoDemoradosComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-pedido-ventas' , component: ReportPedidoVentasComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-mesa-comentarios' , component: ReportMesaComentariosComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-mesa-facturacion' , component: ReportMesaFacturacionComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-mesa-importes' , component: ReportMesaImportesComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-mesa-top-facturacion' , component: ReportMesaTopFacturacionComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}},
  { path: 'report-mesa-usos' , component: ReportMesaUsosComponent, canActivate: [ProfileGuard], data: {expectedRole:[1,2]}}
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
