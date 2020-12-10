import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private idTemplante= new BehaviorSubject<string>('Prueba');

  public customMessage=this.idTemplante.asObservable();

  constructor() { }

  public changeMessage(msg:string):void{
    this.idTemplante.next(msg);
  }
}
