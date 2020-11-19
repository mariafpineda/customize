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
}
