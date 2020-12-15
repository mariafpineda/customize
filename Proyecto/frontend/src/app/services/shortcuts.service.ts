import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {

  private url = 'http://localhost:8888/shortcuts/'

  constructor(private httpClient:HttpClient) { }

  getTemplate(type):Observable<any>{
    return this.httpClient.get(this.url+`${type}`);
  }
}
