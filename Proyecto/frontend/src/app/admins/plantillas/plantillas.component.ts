import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent  {
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;
  
  constructor() { }

  ngOnInit(): void { 
  }

}
