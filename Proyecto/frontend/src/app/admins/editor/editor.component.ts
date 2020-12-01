import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editorOptions2={theme: 'vs-dark', language:'html'};
  editorPreview:any;
  htmlEditor = (<HTMLInputElement>document.getElementById('html-part'));
  codeHTML: string= '';
  idPlantilla:String='';
  prueba:String="Hola desde ts";

  onInit(editor) {
    let line = editor.getPosition();
    console.log(line);
    monaco.editor.colorize(this.codeHTML, 'html', {})
  }

  constructor() { }

  ngOnInit(): void {
  }

  update(){
    this.editorPreview = (<HTMLIFrameElement>document.getElementById('editorPreview')).contentWindow.document;
    this.editorPreview.open();
    this.editorPreview.write(this.codeHTML);
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