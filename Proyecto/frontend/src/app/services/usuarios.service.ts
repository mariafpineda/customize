import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'http://localhost:8888/usuarios';

  constructor(private httpClient:HttpClient,
    private router:Router) { }

  signUp(user):Observable<any>{
    return this.httpClient.post(this.url+'/signup', user);
  }

  signIn(user):Observable<any>{
    return this.httpClient.post(this.url+'/signin', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }
}
