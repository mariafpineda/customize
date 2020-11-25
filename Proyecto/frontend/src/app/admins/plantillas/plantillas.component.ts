import { Component, OnInit } from '@angular/core';
import { MonacoEditorModule } from "ngx-monaco-editor";

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent  {
  
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code= 'function x() {\nconsole.log("Hello world!");\n}';
  
  constructor() { }

  ngOnInit(): void {
  }

}
