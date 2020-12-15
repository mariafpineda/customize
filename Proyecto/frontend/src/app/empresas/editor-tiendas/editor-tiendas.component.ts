import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faBars, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit as farEdit, faTrashAlt as farTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantillasService } from 'src/app/services/plantillas.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { regExpEscape } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ShortcutsService } from 'src/app/services/shortcuts.service';

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

  //prueba="{'prueba':dasdas}"
  regexJSON= new RegExp('\{.*\:.*\}');
  regexTexto= new RegExp('^[a-z0-9-]+');
  //test2= this.prueba.match(this.regex);
  //test = this.regex.test(this.prueba);


  disabled = false;
  faBars=faBars;
  faChevronDown=faChevronDown;
  faPlus=faPlus;
  faArrowLeft=faArrowLeft;
  farEdit=farEdit;
  farTrashAlt=farTrashAlt;

  plantillas:any=[];
 
  /*Monaco Editor*/
  editorOptions=[{theme:'vs-dark', language:'html'},
  {theme:'vs-dark', language:'css'},
  {theme:'vs-dark', language:'javascript'}]
  codeHTML:String=""
  codeCSS:String="";
  codeJS:String="";

 
  /*Froala Editor*/
  editorContent:string="";

  

  bloqueSeleccionado:number;
  active=1;
  pagina:any=[];
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
  plantillaSeleccionada:any=[];
  titulo:String="";
  descripcion:String="";
  paginaPrincipal:Boolean=false;
  visibilidad:Boolean=false;

  productos:any=[];
  categorias:any=[];

  constructor(private route:ActivatedRoute,
    private modalService:NgbModal,
    private plantillasService:PlantillasService,
    private empresasService:EmpresasService,
    private router:Router,
    private shortcutsService:ShortcutsService) { 
    }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('idPage'));
    console.log(this.route.snapshot.paramMap.get('idCompany'));
    
    this.plantillasService.getTemplates()
    .subscribe(res => {
      this.plantillas=res;
    }, error => {
      console.log(error);
    });
    

    this.obtenerEmpresa();
    this.obtenerProductos();
    this.obtenerCategorias();

    this.bloqueContenido=(<HTMLIFrameElement>document.getElementById('content')).contentWindow.document;
    this.bloqueContenido.open();
    this.bloqueContenido.write(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">`);
    this.bloqueContenido.write('<div class="container-fluid"><div class="row" id="contenido"></div> </div>');
   
  
  }

  ngAfterViewInit(){
   
  }

  obtenerProductos(){
    this.empresasService.getProducts(localStorage.getItem('idBrand'))
    .subscribe(res => {
      console.log(res[0].productos);
    }, error => console.log(error));
  }

  obtenerCategorias(){
    this.empresasService.getCategories(localStorage.getItem('idBrand'))
    .subscribe(res => {
      console.log(res.categorias);
    }, error => console.log(error));
  }

  open(content, id){
    this.titulo=this.pagina[0].paginas[0].titulo;
    this.descripcion=this.pagina[0].paginas[0].descripcion;
    this.paginaPrincipal=this.pagina[0].paginas[0].paginaPrincipal;
    this.visibilidad=this.pagina[0].paginas[0].visibilidad;
    this.modalService.open(content, {centered:true});
    this.bloqueSeleccionado=id;
    if(id!=''){
      this.adaptabilidad=this.bloques[id-1].adaptabilidad;
      this.editorContent=this.bloques[id-1].editorFroala;
      this.codeHTML=this.bloques[id-1].codeHTML;
      this.codeCSS=this.bloques[id-1].codeCSS;
    }
  }

  obtenerEmpresa(){
    this.empresasService.getPage(this.route.snapshot.paramMap.get('idCompany'),
    this.route.snapshot.paramMap.get('idPage'))
    .subscribe( res => {
       this.pagina.push(res[0]);
       this.bloques.push(res[0].paginas[0].codigo);
       this.bloques=this.bloques[0];
       console.log(this.bloques);
       if(this.bloques.length!=0 && this.bloques.plantilla==undefined){
        for(let i=0; i<this.bloques.length; i++){
          this.bloqueContenido.write(`<style>${this.bloques[i].codeCSS}</style>`)
          var bloque=`
            <div id="${i+1}" class="col-xl-${this.bloques[i].adaptabilidad.xl}
            col-lg-${this.bloques[i].adaptabilidad.lg}
            col-md-${this.bloques[i].adaptabilidad.md}
            col-sm-${this.bloques[i].adaptabilidad.sm} 
            col-${this.bloques[i].adaptabilidad.xs}" style="height:${this.bloques[i].adaptabilidad.height}px">
            </div>
          `
          this.bloqueContenido.getElementById('contenido').innerHTML+=(bloque);
          this.bloqueContenido.getElementById(`${i+1}`).innerHTML+=this.bloques[i].editorFroala;
          this.bloqueContenido.getElementById(`${i+1}`).innerHTML+=this.bloques[i].codeHTML;
        }
      } else if(this.bloques.length!=0 && this.bloques.plantilla != undefined){
        this.usarPlantilla(this.bloques.plantilla);
      }
    }, error => {
      console.log(error);
    }
   )
  }
  
  openTemplate(content, id){
    this.modalService.open(content, {centered:true});
    this.bloqueSeleccionado=id;
  }

  agregarBloque(){
    if(this.plantillaSeleccionada.length!=0){
      this.eliminarPlantilla();
    }
    this.bloques.push({
      editorFroala:"",
      codeHTML:"",
      codeCSS:"",
      "adaptabilidad":this.adaptabilidad});
    var bloque=`
      <div id="${this.bloques.length}" class="col-xl-${this.adaptabilidad.xl}
      col-lg-${this.adaptabilidad.lg}
      col-md-${this.adaptabilidad.md}
      col-sm-${this.adaptabilidad.sm} 
      col-${this.adaptabilidad.xs}" style="height:${this.adaptabilidad.height}px">
      </div>
    `
    this.bloqueContenido.getElementById('contenido').innerHTML+=(bloque);
  }

  editarBloque(index){
    console.log(this.codeCSS);
    console.log(this.codeHTML)
  }

  eliminarBloque(){
    var bloque = this.bloqueContenido.getElementById(`${this.bloqueSeleccionado}`);
    bloque.remove();
    this.bloques.splice(this.bloqueSeleccionado-1, 1);
    this.modalService.dismissAll();
  }

  actualizarContenido(){
    var contenido =this.bloqueContenido.getElementById(`${this.bloqueSeleccionado}`);
      contenido.innerHTML='';
      contenido.removeAttribute("class");
      contenido.removeAttribute("style");
      contenido.style.height=`${this.bloques[this.bloqueSeleccionado-1].adaptabilidad.height}px`;
      contenido.classList.add(`col-xl-${this.bloques[this.bloqueSeleccionado-1].adaptabilidad.xl}`,
      `col-lg-${this.bloques[this.bloqueSeleccionado-1].adaptabilidad.lg}`,
      `col-md-${this.bloques[this.bloqueSeleccionado-1].adaptabilidad.md}`,
      `col-sm-${this.bloques[this.bloqueSeleccionado-1].adaptabilidad.sm}`,
      `col-${this.bloques[this.bloqueSeleccionado-1].adaptabilidad.xs}`);
      this.bloques[this.bloqueSeleccionado-1]={
        adaptabilidad:this.adaptabilidad,
        editorFroala: this.editorContent,
        codeHTML:this.codeHTML,
        codeCSS:this.codeCSS,
        codeJS:this.codeJS
      }
      this.bloqueContenido.write(`<style>${this.codeCSS}</style>`);
      this.bloqueContenido.getElementById(this.bloqueSeleccionado).innerHTML+=this.editorContent;
      this.bloqueContenido.getElementById(this.bloqueSeleccionado).innerHTML+=this.codeHTML;

    
  }

  usarPlantilla(plantilla){
    console.log(plantilla);
    this.bloques=[];
    this.plantillaSeleccionada=plantilla;
    this.bloqueContenido.write(`<style>${plantilla.codigoCSS}</style>`)
    this.bloqueContenido.getElementById('contenido').innerHTML=plantilla.codigoHTML;
    this.bloqueContenido.write(`<script>${plantilla.codigoJS}</script>`)
  }

  eliminarPlantilla(){
    this.plantillaSeleccionada=[];
    this.bloqueContenido.getElementById('contenido').innerHTML='';
    this.modalService.dismissAll();
  }

  actualizarPlantilla(){
    this.bloqueContenido.write(`<style>${this.plantillaSeleccionada.codigoCSS}</style>`)
    this.bloqueContenido.write(`<script>${this.plantillaSeleccionada.codigoJS}</script>`)
  }

  guardarPagina(){
    console.log(<HTMLDivElement>document.getElementById('content'));
    var data;
    if(this.bloques!=0){
      console.log(this.bloques);
      data={
        titulo:this.titulo,
        descripcion:this.descripcion,
        codigo:this.bloques,
        paginaPrincipal:this.paginaPrincipal,
        visible: this.visibilidad
      };
    } else{
      console.log(this.plantillaSeleccionada);
        data={
        titulo:this.titulo,
        descripcion:this.descripcion,
        codigo:{plantilla: this.plantillaSeleccionada},
        paginaPrincipal:this.paginaPrincipal,
        visible: this.visibilidad
      };
    }
    console.log(data);
    this.empresasService.updatePage(this.route.snapshot.paramMap.get('idCompany'),
    this.route.snapshot.paramMap.get('idPage'),
    data).subscribe(res=> {
      console.log(res);
      this.modalService.dismissAll();
      this.router.navigate(['/admin-companies/home']);
    }, error => console.log(error));
  }


  pruebaConBoton(){
    var test = this.bloqueContenido.document.getElementById('prueba');
    test.addEventListener('click', this.clickme())
    console.log(test);
  }

  clickme(){
    console.log("It work!");
  }

}
