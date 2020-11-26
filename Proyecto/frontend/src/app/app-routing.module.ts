import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './landingPage/home/home.component';
import { VendeComponent } from './landingPage/vende/vende.component';
import { CompraComponent } from './landingPage/compra/compra.component';
import { LoginUserComponent } from './landingPage/login-user/login-user.component';
import { LoginBrandComponent } from './landingPage/login-brand/login-brand.component';
import { LoginAdminComponent } from './landingPage/login-admin/login-admin.component';
import { RegisterUserComponent } from './landingPage/register-user/register-user.component';
import { RegisterBrandComponent } from './landingPage/register-brand/register-brand.component';
import { UsersHomeComponent } from './usuarios/users-home/users-home.component';
import { AdminsHomeComponent } from './admins/admins-home/admins-home.component';
import { CompaniesHomeComponent } from "./empresas/companies-home/companies-home.component";

import { AuthGuard } from './auth.guard'

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'vende', component: VendeComponent},
  {path:'compra', component: CompraComponent},
  {path:'loginUser', component: LoginUserComponent},
  {path:'loginBrand', component: LoginBrandComponent},
  {path:'customize-admin', component: LoginAdminComponent},
  {path:'registerUser', component: RegisterUserComponent},
  {path:'registerBrand', component: RegisterBrandComponent},
  {path: 'usersHome', component: UsersHomeComponent, canActivate: [AuthGuard], data: { role: 'user'}},
  {path: 'adminsHome', component: AdminsHomeComponent, canActivate:[AuthGuard], data: { role: 'admin'}},
  {path: 'companiesHome', component: CompaniesHomeComponent, canActivate:[AuthGuard], data: { role: 'company'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
