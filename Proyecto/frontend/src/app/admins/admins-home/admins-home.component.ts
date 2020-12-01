import { Component, OnInit, ViewChild } from '@angular/core';
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router'
import { Title } from '@angular/platform-browser';
import { EditorComponent } from '../editor/editor.component';



@Component({
  selector: 'app-admins-home',
  templateUrl: './admins-home.component.html',
  styleUrls: ['./admins-home.component.css']
})
export class AdminsHomeComponent implements OnInit {
  @ViewChild('editor') editorComponent:EditorComponent;
  faSignOutAlt=faSignOutAlt;
  faBars=faBars;
  regionVisible:String='';
  public isCollapsed = true;


  constructor( private router:Router,
    private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Administración');
    this.regionVisible='administradores';
  }

  categoriaSeleccionada(categoria){
    this.regionVisible=categoria;
    this.isCollapsed=true;
  }

  plantillaSeleccionada(id){
    this.editorComponent.obtenerPlantilla(id);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('idAdmin');
    this.router.navigate(['/admin/login']);
  }



}
