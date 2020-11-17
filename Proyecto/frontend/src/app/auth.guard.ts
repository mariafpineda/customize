import { Injectable } from '@angular/core';
import { CanActivate, Router,  } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './services/usuarios.service'
import 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private usuariosService:UsuariosService,
    private router:Router
  ) { }

  canActivate():boolean{
    if(this.usuariosService.loggedIn()){
      return true;
    }

    this.router.navigate(['/usersHome']);
    return false;
  }
  
}
