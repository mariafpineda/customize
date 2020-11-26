import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { UsuariosService } from "./usuarios.service";
import { AdminsService } from './admins.service';
import { EmpresasService } from './empresas.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{
  token:any;

  constructor(
    private usuariosService:UsuariosService,
    private adminsService:AdminsService,
    private empresasService:EmpresasService
  ) { }

//Para añadir cabezera a petición
  intercept(req, next){
    if(this.usuariosService.getToken()!=""){
      this.token=this.usuariosService.getToken();
    } else if(this.adminsService.getToken()!=""){
      this.token=this.adminsService.getToken();
    } else{
      this.token=this.empresasService.getToken();
    }
    const tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(tokenizeReq);
  }

  
}
