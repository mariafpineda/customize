import { Component, OnInit, Input } from '@angular/core';
import { faBars, faEye} from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public isMenuCollapsed=true;
  faBars=faBars;
  faEye=faEye;
  editorOptions={theme: 'vs-dark', language:'html'};
  editorOptions1={theme: 'vs-dark', language:'css'};
  editorOptions2={theme: 'vs-dark', language:'javascript'};
  errorMessage:String='';
  errorBool:Boolean;
  successMessage:String='';
  successBool:Boolean;

  editorPreview:any;
  codeHTML: string= '';
  codeCSS: string= '';
  codeJS: string= '';
  idPlantilla:String='';
  plantillas:any=[];
  plantilla:any={
    tituloTema:'',
    descripcion:'',
    codigoHTML:'',
    codigoCSS:'',
    codigoJS:'',
    confirmarCorreo:''
  }

  constructor(private modalService:NgbModal) { }

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
    console.log("Guardar plantilla");
  }

}
