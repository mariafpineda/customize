import { Injectable } from '@angular/core';
import { CanActivate, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminsService } from './services/admins.service';
import { EmpresasService } from './services/empresas.service';
import { UsuariosService } from './services/usuarios.service'


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

  canActivate():boolean{
    if(this.usuariosService.loggedIn()==false){
      this.router.navigate(['/loginUser']);
      return true;
    }
    this.router.navigate(['/usersHome']);
    return false;
  }
  
}
