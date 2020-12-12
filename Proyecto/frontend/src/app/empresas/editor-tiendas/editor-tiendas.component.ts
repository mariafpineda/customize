import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit as farEdit, faTrashAlt as farTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

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
 
  /*Monaco Editor*/
  editorOptions=[{theme:'vs-dark', language:'html'},
  {theme:'vs-dark', language:'css'}]
  codeHTML:String=""
  codeCSS:String;
 
  /*Froala Editor*/
  editorContent:String;

  bloqueSeleccionado:number;
  active=1;
  bloques:any=[];
  adaptabilidad={
    xl:'',
    lg:'',
    md:'',
    sm:'',
    xs:'',
    height:''
  };
  bloqueContenido:any;
  
  archivo:File;

  constructor(private route:ActivatedRoute,
    private modalService:NgbModal) { 
    console.log(this.route.snapshot.paramMap.get('idCompany'));
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idPage'));
    this.prueba();
    this.bloqueContenido=(<HTMLIFrameElement>document.getElementById('content')).contentWindow.document;
    this.bloqueContenido.open();
    this.bloqueContenido.write(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">`);
    this.bloqueContenido.write('<div class="container-fluid"><div class="row" id="contenido"></div> </div>')
  }

  open(content, id){
    this.modalService.open(content, {centered:true});
    this.bloqueSeleccionado=id;
    console.log(this.bloqueSeleccionado);
  }

  agregarBloque(){
    console.log(this.adaptabilidad);
    this.bloques.push(this.adaptabilidad);
    console.log(this.bloqueContenido.getElementById('contenido'));
    var bloque=`
      <div id="${this.bloques.length}" class="col-xl-${this.adaptabilidad.xl}
      col-lg-${this.adaptabilidad.lg}
      col-md-${this.adaptabilidad.md}
      col-sm-${this.adaptabilidad.sm} 
      col-${this.adaptabilidad.xs}" style="background-color: red; height:${this.adaptabilidad.height}px">
      </div>
    `
    this.bloqueContenido.getElementById('contenido').innerHTML+=(bloque);
  }

  editarBloque(index){

  }

  eliminarBloque(){
    var bloque=(<HTMLDivElement>document.getElementById(`${this.bloqueSeleccionado}`));
    bloque.remove();
    this.bloques.splice(this.bloqueSeleccionado-1, 1);
    this.modalService.dismissAll();
  }

  onFileSelected(event: HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.archivo=<File>event.target.files[0];
    }

    console.log(this.archivo);
  }

  actualizarContenido(){
    var contenido=(<HTMLDivElement>document.getElementById(`${this.bloqueSeleccionado}`));
    contenido.innerHTML='';
    contenido.innerHTML+=this.editorContent;
    contenido.innerHTML+=this.codeHTML;
    console.log(this.editorContent);
    console.log(this.codeHTML);
    console.log(this.archivo);
    console.log(this.bloqueSeleccionado);
    contenido.removeAttribute("class");
    contenido.removeAttribute("style");
    contenido.style.height=`${this.adaptabilidad.height}px`;
    contenido.classList.add(`col-xl-${this.adaptabilidad.xl}`,`col-lg-${this.adaptabilidad.lg}`,`col-md-${this.adaptabilidad.md}`,`col-sm-${this.adaptabilidad.sm}`,`col-${this.adaptabilidad.xs}`);
    console.log(contenido);
    this.bloques[this.bloqueSeleccionado-1]=this.adaptabilidad
    console.log(this.adaptabilidad);
  }

  prueba(){
    var prueba="Probando"
    var codigo="Hola, ${prueba}"
    console.log(codigo);
    var res = codigo.replace("${prueba}", `${prueba}`)
    console.log(res);
  }
}
