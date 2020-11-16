import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url = 'http://localhost:8888/empresas'

  constructor(private httpClient:HttpClient) { }

  signIn(company):Observable<any>{
    return this.httpClient.post(this.url+'/signin', company);
  }

  signUp(company):Observable<any>{
    return this.httpClient.post(this.url+'/signup', company);
  }

}
