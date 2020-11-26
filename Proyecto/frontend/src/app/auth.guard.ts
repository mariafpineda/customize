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
      this.router.navigate(['/userLogin']);
      return false;
    } else if(this.usuariosService.loggedIn()==true && role=='user'){
      return true;
    } else if(this.adminsService.loggedIn()==false && role=='admin'){
      this.router.navigate(['/admin/login']);
      return false;
    } else if (this.adminsService.loggedIn()==true && role=='admin'){
      return true
    } else if(this.empresasService.loggedIn()==false && role=='company'){
      this.router.navigate(['/company/login']);
      return false;
    } else{
      return true;
    }
  }
  
}
