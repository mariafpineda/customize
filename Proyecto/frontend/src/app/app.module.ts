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
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';


import { AuthGuard } from './auth.guard';
import { TokenService } from "./services/token.service";
import { SidebarComponent } from './admins/sidebar/sidebar.component';
import { AdminsComponent } from './admins/admins/admins.component';
import { EmpresasComponent } from './admins/empresas/empresas.component';
import { PlanesComponent } from './admins/planes/planes.component';
import { PlantillasComponent } from './admins/plantillas/plantillas.component';
import { ConfiguracionesComponent } from './admins/configuraciones/configuraciones.component';
import { EditorComponent } from './admins/editor/editor.component';
import { BancoComponent } from './empresas/banco/banco.component';
import { CategoriasComponent } from './empresas/categorias/categorias.component';
import { ProductosComponent } from './empresas/productos/productos.component';
import { TiendasComponent } from './empresas/tiendas/tiendas.component';
import { EditorTiendasComponent } from './empresas/editor-tiendas/editor-tiendas.component';
import { InicioTiendasComponent } from './empresas/inicio-tiendas/inicio-tiendas.component';
import { PerfilTiendasComponent } from './empresas/perfil-tiendas/perfil-tiendas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


//Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ConfigGeneralesComponent } from './empresas/config-generales/config-generales.component';


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
    ConfiguracionesComponent,
    EditorComponent,
    BancoComponent,
    CategoriasComponent,
    ProductosComponent,
    TiendasComponent,
    EditorTiendasComponent,
    InicioTiendasComponent,
    PerfilTiendasComponent,
    PageNotFoundComponent,
    ConfigGeneralesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    AuthGuard
    ,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
