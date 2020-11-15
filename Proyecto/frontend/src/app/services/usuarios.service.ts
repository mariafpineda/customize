import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:8888/usuarios';

  constructor(private httpClient:HttpClient) { }

  signUp(user):Observable<any>{
    return this.httpClient.post(this.url+'/signup', user);
  }

  signIn(user):Observable<any>{
    return this.httpClient.post(this.url+'/signin', user);
  }


}
