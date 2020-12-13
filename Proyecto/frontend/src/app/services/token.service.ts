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
    var tokenizeReq;
    if(this.usuariosService.getToken()!=null){
      this.token=this.usuariosService.getToken();
       tokenizeReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${this.token}`
        }
      });
    } else if(this.adminsService.getToken()!=null){
      this.token=this.adminsService.getToken();
        tokenizeReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${this.token}`
        }
      });
    } else{
      this.token=this.empresasService.getToken();
        tokenizeReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    
    return next.handle(tokenizeReq);
  }

  
}
