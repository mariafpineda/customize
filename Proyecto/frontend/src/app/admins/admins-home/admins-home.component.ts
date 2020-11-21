import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminsComponent } from '../admins/admins.component'
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'app-admins-home',
  templateUrl: './admins-home.component.html',
  styleUrls: ['./admins-home.component.css']
})
export class AdminsHomeComponent implements OnInit {
  @ViewChild('admins') adminsComponent:AdminsComponent;

  faSignOutAlt=faSignOutAlt;
  faBars=faBars;
  regionVisible:String='';
  public isCollapsed = false;


  constructor() { }

  ngOnInit(): void {
    this.regionVisible='administradores';
  }

  categoriaSeleccionada(categoria){
    this.regionVisible=categoria;
  }



}
