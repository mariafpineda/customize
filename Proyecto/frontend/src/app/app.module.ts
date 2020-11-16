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
import { HttpClientModule } from '@angular/common/http';
import { UsersHomeComponent } from './usuarios/users-home/users-home.component';
import { AdminsComponent } from './usuarios/admins/admins.component';
import { EmpresasComponent } from './usuarios/empresas/empresas.component';
import { AdminsHomeComponent } from './admins/admins-home/admins-home.component';
import { CompaniesHomeComponent } from './empresas/companies-home/companies-home.component'

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
    AdminsComponent,
    EmpresasComponent,
    AdminsHomeComponent,
    CompaniesHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
