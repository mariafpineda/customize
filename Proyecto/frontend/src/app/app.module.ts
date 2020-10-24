import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './landingPage/home/home.component';
import { VendeComponent } from './landingPage/vende/vende.component';
import { CompraComponent } from './landingPage/compra/compra.component';
import { LoginComponent } from './landingPage/login/login.component';
import { RegisterComponent } from './landingPage/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
/*import { RouterModule } from '@angular/router'; */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VendeComponent,
    CompraComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
