import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';

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
import { UserFormComponent } from './user-form/user-form.component';
import { DomicilioService } from './_services/domicilio.service';
import { UserListComponent } from './user-list/user-list.component';
import { AgmCoreModule } from '@agm/core'            // @agm/core
import { AgmDirectionModule } from 'agm-direction';
import { DashboardComponent, ComenzarDialog, FinalizarDialog, ConsultaDialog } from './dashboard/dashboard.component';
import { PedidoFormComponent, ResumenDialog } from './pedido-form/pedido-form.component'   // agm-direction
import { ItemMenuService } from './_services/item-menu.service';
import { IsNullValuePipe } from './_pipe/is-null-value.pipe';
import { DetallePedidoService } from './_services/detalle-pedido.service';

export function tokenGetter() {
  return localStorage.getItem('currentUser');
}

@NgModule({
  entryComponents:[
    ComenzarDialog,
    FinalizarDialog,
    ResumenDialog,
    ConsultaDialog
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    UserFormComponent,
    UserListComponent,
    DashboardComponent,
    PedidoFormComponent,
    ComenzarDialog,
    FinalizarDialog,
    ResumenDialog,
    ConsultaDialog,
    IsNullValuePipe
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyA-FowwXJQObnQv6el2beO-WT9GF3KtW4U',
    }),
    AgmDirectionModule      // agm-direction
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
