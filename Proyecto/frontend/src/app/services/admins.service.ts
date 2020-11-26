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

  loggedIn(){
    return !!localStorage.getItem('tokenAdmin');
  }

  getAdmin(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}`);
  }

  updateData(id, admin):Observable<any>{
    return this.httpClient.put(this.url+`/${id}`, admin);
  }

  deleteAdmin(id):Observable<any>{
    return this.httpClient.delete(this.url+`/${id}`);
  }
}
