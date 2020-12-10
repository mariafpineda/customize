import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit as farEdit, faTrashAlt as farTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor-tiendas',
  templateUrl: './editor-tiendas.component.html',
  styleUrls: ['./editor-tiendas.component.css']
})
export class EditorTiendasComponent implements OnInit {
  public isMenuCollapsed=true;
  public isSidebarCollapsed=true;
  public isCollapsed=true;
  public isCollapsed2=true;
  public isCollapsed3=true;
  disabled = false;
  faBars=faBars;
  faChevronDown=faChevronDown;
  faPlus=faPlus;
  farEdit=farEdit;
  farTrashAlt=farTrashAlt;

  editorContent:String;
  bloqueSeleccionado:number;
  bloques:any=[];
  adaptabilidad={
    xl:'',
    lg:'',
    md:'',
    sm:'',
    xs:''
  };

  constructor(private route:ActivatedRoute,
    private modalService:NgbModal) { 
    console.log(this.route.snapshot.paramMap.get('idCompany'));
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idPage'));
  }

  open(content, id){
    this.modalService.open(content, {centered:true});
    this.bloqueSeleccionado=id;
    console.log(this.bloqueSeleccionado);
  }

  agregarBloque(){
    console.log(this.adaptabilidad);
    this.bloques.push(this.adaptabilidad);
    console.log(this.bloques);
    var bloque=(<HTMLDivElement>document.getElementById('content'));
    bloque.innerHTML+=`
      <div id="${this.bloques.length}" class="col-xl-${this.adaptabilidad.xl}
      col-lg-${this.adaptabilidad.lg}
      col-md-${this.adaptabilidad.md}
      col-sm-${this.adaptabilidad.sm} 
      col-${this.adaptabilidad.xs}" style="background-color: red; height:50px"></div>
    `;
  }

  editarBloque(index){

  }

  eliminarBloque(){
    var bloque=(<HTMLDivElement>document.getElementById(`${this.bloqueSeleccionado}`));
    bloque.remove();
    this.bloques.splice(this.bloqueSeleccionado-1, 1);
    this.modalService.dismissAll();
  }
}
