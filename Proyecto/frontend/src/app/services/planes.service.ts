import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private url="http://localhost:8888/planes"

  constructor(private httpClient:HttpClient) { }

  getPlans():Observable<any>{
    return this.httpClient.get(this.url+'/');
  }

  getPlan(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}`);
  }

  updatePlan(id, plan):Observable<any>{
    return this.httpClient.put(this.url+`/${id}`, plan);
  }

  addPlan(plan):Observable<any>{
    return this.httpClient.post(this.url+'/', plan);
  }

  deletePlan(id):Observable<any>{
    return this.httpClient.delete(this.url+`/${id}`);
  }
}
