import { Component, OnInit, Input } from '@angular/core';
import { faBars, faEye} from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantillasService } from 'src/app/services/plantillas.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public isMenuCollapsed=true;
  faBars=faBars;
  faEye=faEye;
  editorOptions=[
    {theme: 'vs-dark', language:'html'},
    {theme: 'vs-dark', language:'css'},
    {theme: 'vs-dark', language:'javascript'}];
  errorMessage:String='';
  errorBool:Boolean;
  successMessage:String='';
  successBool:Boolean;

  editorPreview:any;
  codeHTML: string= '';
  codeCSS: string= '';
  codeJS: string= '';
  idPlantilla:String='';
  plantilla:any={
    tituloTema:'',
    descripcion:'',
    codigoHTML:'',
    codigoCSS:'',
    codigoJS:'',
    imagenes:[]
  }

  constructor(private modalService:NgbModal,
    private plantillasService:PlantillasService) { }

  ngOnInit(): void {
  }

  preview(){
    this.editorPreview = (<HTMLIFrameElement>document.getElementById('editorPreview')).contentWindow.document;
    this.editorPreview.open();
    this.editorPreview.write(`<style>${this.codeCSS}</style>`);
    this.editorPreview.write(this.codeHTML);
    this.editorPreview.write(`<script>${this.codeJS}</script>`);
    this.editorPreview.close();
    console.log((<HTMLIFrameElement>document.getElementById('editorPreview')).contentWindow.document.getElementById('prueba'));
  }

  open(content, id) {
    this.modalService.open(content, { centered:true })
  }

  obtenerPlantilla(id){
    console.log("Id plantilla desde editor: ", id)
  }

  agregarPlantilla(){
    console.log("Guardar plantilla", this.plantilla);
    if(this.plantilla.tituloTema == '' || this.plantilla.descripcion == ''){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else{
      this.plantillasService.addTemplate(this.plantilla)
      .subscribe(
        res=>{
          this.successMessage=res.message;
          this.successBool=true;
        }, error => {
          this.errorBool=error.error.message;
          this.errorBool=true;
        }
      )
    }
    setTimeout(() => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }

}
