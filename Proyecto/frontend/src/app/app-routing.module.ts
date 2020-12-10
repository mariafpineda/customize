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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './auth.guard'
import { EditorComponent } from './admins/editor/editor.component';
import { PerfilTiendasComponent } from './empresas/perfil-tiendas/perfil-tiendas.component';
import { EditorTiendasComponent } from './empresas/editor-tiendas/editor-tiendas.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'vende', component: VendeComponent},
  {path:'compra', component: CompraComponent},
  {path:'user/login', component: LoginUserComponent},
  {path:'company/login', component: LoginBrandComponent},
  {path:'admin/login', component: LoginAdminComponent},
  {path:'user/register', component: RegisterUserComponent},
  {path:'company/register', component: RegisterBrandComponent},
  {path: 'user/home', component: UsersHomeComponent, canActivate: [AuthGuard], data:{role: 'user'}},
  {path: 'admin/home', component: AdminsHomeComponent, canActivate: [AuthGuard], data:{role: 'admin'}},
  {path: 'company/home', component: CompaniesHomeComponent, canActivate: [AuthGuard], data:{role: 'company'}},
  {path: 'admin/editor', component:EditorComponent, canActivate:[AuthGuard], data:{role: 'admin'}},
  {path: 'admin-companies/:idCompany/pages/:idPage', component: EditorTiendasComponent, canActivate:[AuthGuard], data:{role:'company'}},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
