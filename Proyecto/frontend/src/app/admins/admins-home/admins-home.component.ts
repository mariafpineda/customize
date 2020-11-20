import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-admins-home',
  templateUrl: './admins-home.component.html',
  styleUrls: ['./admins-home.component.css']
})
export class AdminsHomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  categoriaSeleccionada(categoria){
    console.log('Admins-home', categoria);
  }



}
