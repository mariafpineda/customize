import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { PlantillasService } from "../../services/plantillas.service"

@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent  {
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;
  plantillas:any;
  
  constructor( private plantillasService:PlantillasService) { }

  ngOnInit(): void { 
    this.plantillasService.getTemplates()
    .subscribe(res => {
      this.plantillas = res;
    },
    error => console.log(error));
  }

}
