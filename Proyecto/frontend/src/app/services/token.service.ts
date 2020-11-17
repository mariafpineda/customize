import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { UsuariosService } from "./usuarios.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{


  constructor(
    private usuariosService:UsuariosService
  ) { }

//Para añadir cabezera a petición
  intercept(req, next){
    const tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.usuariosService.getToken()}`
      }
    });
    return next.handle(tokenizeReq)
  }

  
}
