import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartsModule } from 'ng2-charts';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { CustomMaterialModule } from "./_core/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileGuard } from './_guards/profile.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { GeolocationService } from "./_services/geolocation.service";
import { PedidoService } from "./_services/pedido.service";
import { ReCaptchaModule } from "angular2-recaptcha";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { DomicilioService } from './_services/domicilio.service';
import { DashboardComponent, ComenzarDialog, FinalizarDialog, ConsultaDialog, EntregarDialog, CancelarDialog } from './dashboard/dashboard.component';
import { PedidoFormComponent, ResumenDialog } from './pedido-form/pedido-form.component'
import { ItemMenuService } from './_services/item-menu.service';
import { IsNullValuePipe } from './_pipe/is-null-value.pipe';
import { DetallePedidoService } from './_services/detalle-pedido.service';
import { ReportEmpleadoIngresosComponent } from './report-empleado-ingresos/report-empleado-ingresos.component';
import { ReportEmpleadoOperacionesComponent } from './report-empleado-operaciones/report-empleado-operaciones.component';
import { ReportPedidoVentasComponent } from './report-pedido-ventas/report-pedido-ventas.component';
import { ReportPedidoDemoradosComponent } from './report-pedido-demorados/report-pedido-demorados.component';
import { ReportPedidoCanceladosComponent } from './report-pedido-cancelados/report-pedido-cancelados.component';
import { ReportMesaUsosComponent } from './report-mesa-usos/report-mesa-usos.component';
import { ReportMesaFacturacionComponent } from './report-mesa-facturacion/report-mesa-facturacion.component';
import { ReportMesaImportesComponent } from './report-mesa-importes/report-mesa-importes.component';
import { ReportMesaTopFacturacionComponent } from './report-mesa-top-facturacion/report-mesa-top-facturacion.component';
import { ReportMesaComentariosComponent } from './report-mesa-comentarios/report-mesa-comentarios.component';
import { ConsultaPedidoComponent, PreguntaDialog } from './consulta-pedido/consulta-pedido.component';
import { UserListComponent, ConfirmarDialog } from './user-list/user-list.component';

export function tokenGetter() {
  return localStorage.getItem('currentUser');
}

@NgModule({
  entryComponents:[
    ComenzarDialog,
    FinalizarDialog,
    ResumenDialog,
    ConsultaDialog,
    EntregarDialog,
    CancelarDialog,
    PreguntaDialog,
    ConfirmarDialog
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    DashboardComponent,
    PedidoFormComponent,
    ComenzarDialog,
    FinalizarDialog,
    ResumenDialog,
    ConsultaDialog,
    EntregarDialog,
    CancelarDialog,
    PreguntaDialog,
    ConfirmarDialog,
    IsNullValuePipe,
    ReportEmpleadoIngresosComponent,
    ReportEmpleadoOperacionesComponent,
    ReportPedidoVentasComponent,
    ReportPedidoDemoradosComponent,
    ReportPedidoCanceladosComponent,
    ReportMesaUsosComponent,
    ReportMesaFacturacionComponent,
    ReportMesaImportesComponent,
    ReportMesaTopFacturacionComponent,
    ReportMesaComentariosComponent,
    ConsultaPedidoComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    ReCaptchaModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
  ],
  providers: [
    AuthGuard,
    ProfileGuard,
    AuthenticationService,
    UserService,
    DomicilioService,
    GeolocationService,
    PedidoService,
    ItemMenuService,
    DetallePedidoService
    // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
