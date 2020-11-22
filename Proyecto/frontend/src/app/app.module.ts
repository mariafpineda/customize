import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './landingPage/home/home.component';
import { VendeComponent } from './landingPage/vende/vende.component';
import { CompraComponent } from './landingPage/compra/compra.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterUserComponent } from './landingPage/register-user/register-user.component';
import { RegisterBrandComponent } from './landingPage/register-brand/register-brand.component';
import { LoginBrandComponent } from './landingPage/login-brand/login-brand.component';
import { LoginUserComponent } from './landingPage/login-user/login-user.component';
import { LoginAdminComponent } from './landingPage/login-admin/login-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersHomeComponent } from './usuarios/users-home/users-home.component';
import { AdminsHomeComponent } from './admins/admins-home/admins-home.component';
import { CompaniesHomeComponent } from './empresas/companies-home/companies-home.component';
import { FormsModule } from '@angular/forms';


import { AuthGuard } from './auth.guard';
import { TokenService } from "./services/token.service";
import { SidebarComponent } from './admins/sidebar/sidebar.component';
import { AdminsComponent } from './admins/admins/admins.component';
import { EmpresasComponent } from './admins/empresas/empresas.component';
import { PlanesComponent } from './admins/planes/planes.component';
import { PlantillasComponent } from './admins/plantillas/plantillas.component';
import { ConfiguracionesComponent } from './admins/configuraciones/configuraciones.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VendeComponent,
    CompraComponent,
    NavbarComponent,
    RegisterUserComponent,
    RegisterBrandComponent,
    LoginBrandComponent,
    LoginUserComponent,
    LoginAdminComponent,
    UsersHomeComponent,
    AdminsHomeComponent,
    CompaniesHomeComponent,
    SidebarComponent,
    AdminsComponent,
    EmpresasComponent,
    PlanesComponent,
    PlantillasComponent,
    ConfiguracionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
