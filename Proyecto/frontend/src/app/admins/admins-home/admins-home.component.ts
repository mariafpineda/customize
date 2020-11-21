import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminsComponent } from '../admins/admins.component'


@Component({
  selector: 'app-admins-home',
  templateUrl: './admins-home.component.html',
  styleUrls: ['./admins-home.component.css']
})
export class AdminsHomeComponent implements OnInit {
  @ViewChild('admins') adminsComponent:AdminsComponent;

  constructor() { }

  ngOnInit(): void {
  }

  categoriaSeleccionada(categoria){
    console.log('Admins-home', categoria);
  }



}
