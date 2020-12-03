import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  private url = 'http://localhost:8888/imagenes/'
  constructor(private httpClient:HttpClient) { }

  addImage(photo:File):Observable<any>{
    const fd= new FormData()
    fd.append('imagen', photo)
    return this.httpClient.post(this.url, fd)
  }

  getImages():Observable<any>{
    return this.httpClient.get(this.url);
  }
}
