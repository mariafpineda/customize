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
  }

  obtenerPlantilla(id){
    console.log("Id plantilla desde editor: ", id)
  }

}
