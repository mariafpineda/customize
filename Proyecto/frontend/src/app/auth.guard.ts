import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminsService } from './services/admins.service';
import { EmpresasService } from './services/empresas.service';
import { UsuariosService } from './services/usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuariosService:UsuariosService,
    private adminsService:AdminsService,
    private empresasService:EmpresasService,
    private router:Router
  ) { }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    const role = route.data.role
    if(this.usuariosService.loggedIn()==false && role=='user'){
      this.router.navigate(['/loginUser']);
      return false;
    } else if(this.usuariosService.loggedIn()==true  && role=='user'){
      this.router.navigate(['/usersHome']);
      return false;
    } 
    if(this.adminsService.loggedIn()==false && role=='admin'){
      this.router.navigate(['/customize-admin']);
      return false;
    } else if (this.adminsService.loggedIn()==true && role=='admin'){
      this.router.navigate(['/adminsHome']);
      return false;
    }

    if(this.empresasService.loggedIn()==false && role=='company'){
      this.router.navigate(['/loginBrand']);
      return false;
    } else{
      this.router.navigate(['/companiesHome']);
      return false;
    }
  }
  
}
