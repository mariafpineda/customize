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

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getCompany(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}`);
  }

  getCompanies():Observable<any>{
    return this.httpClient.get(this.url+'/');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  stateCompany(id, state):Observable<any> {
    return this.httpClient.post(this.url+`/${id}/estado/${state}`, {});
  }

  deleteCompany(id):Observable<any>{
    return this.httpClient.delete(this.url+`/${id}`);
  }

  getPlan(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}/plan`);
  }

  addImage(id, nombre, descripcion, imagen):Observable<any>{
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('imagen', imagen);
    return this.httpClient.post(this.url+`/${id}/nuevaImagen`, fd);
  }

  addVideo(id, nombre, descripcion, imagen):Observable<any>{
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('video', imagen);
    return this.httpClient.post(this.url+`/${id}/nuevoVideo`, fd);
  }

  addFile(id, nombre, descripcion, imagen):Observable<any>{
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('archivo', imagen);
    return this.httpClient.post(this.url+`/${id}/nuevoArchivo`, fd);
  }

}
