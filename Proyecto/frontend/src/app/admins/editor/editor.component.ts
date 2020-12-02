import { Component, OnInit, Input } from '@angular/core';
import { faBars, faEye, faPlay } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  faBars=faBars;
  faEye=faEye;
  faPlay=faPlay;
  editorOptions={theme: 'vs-dark', language:'html'};
  editorOptions1={theme: 'vs-dark', language:'css'};
  editorOptions2={theme: 'vs-dark', language:'javascript'};

  editorPreview:any;
  codeHTML: string= '';
  codeCSS: string= '';
  codeJS: string= '';
  idPlantilla:String='';
  public isMenuCollapsed=true;

  onInit(editor) {
    let line = editor.getPosition();
    console.log(line); 
  }

  constructor() { }

  ngOnInit(): void {
  }

  update(){
    this.editorPreview = (<HTMLIFrameElement>document.getElementById('editorPreview')).contentWindow.document;
    this.editorPreview.open();
    this.editorPreview.write(`<style>${this.codeCSS}</style>`);
    this.editorPreview.write(this.codeHTML);
    this.editorPreview.write(`<script>${this.codeJS}</script>`);
    this.editorPreview.close();
    console.log((<HTMLIFrameElement>document.getElementById('editorPreview')).contentWindow.document.getElementById('prueba'));
  }

  obtenerPlantilla(id){
    console.log("Id plantilla desde editor: ", id)
  }

}

/*`<style>
  h1{
      color: pink;
  }
  
  </style>
  <h1>Hola</h1>
  <div id="prueba">
    {{prueba}}
  </div>
  
  <script>
      document.getElementById("prueba")="Hola desde js"
  </script>`;*/