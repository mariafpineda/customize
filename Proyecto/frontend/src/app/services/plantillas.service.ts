import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {

  private url = "http://localhost:8888/plantillas/"
  constructor(private httpClient:HttpClient) { }

  addTemplate(template):Observable<any>{
    return this.httpClient.post(this.url, template);
  }

  getTemplates():Observable<any>{
    return this.httpClient.get(this.url);
  }

  deleteTemplate(id):Observable<any>{
    return this.httpClient.delete(this.url+`${id}`)
  }

  getTemplate(id):Observable<any>{
    return this.httpClient.get(this.url+`${id}`);
  }
}
