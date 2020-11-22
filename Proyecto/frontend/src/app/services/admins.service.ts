import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private url = 'http://localhost:8888/admins';

  constructor(private httpClient:HttpClient) { }

  signIn(admin):Observable<any>{
    return this.httpClient.post(this.url+'/signin', admin);
  }

  signUp(admin):Observable<any>{
    return this.httpClient.post(this.url+'/signup', admin);
  }

  getAdmins():Observable<any>{
    return this.httpClient.get(this.url+'/');
  }
}
