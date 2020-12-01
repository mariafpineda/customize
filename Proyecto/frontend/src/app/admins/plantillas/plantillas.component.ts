import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { PlantillasService } from "../../services/plantillas.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";


@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent  {
  @Output() onEditarPlantilla = new EventEmitter();
  
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;
  plantillas:any;
  plantillaSeleccionada:any;
  
  constructor( private plantillasService:PlantillasService,
    private modalService:NgbModal,
    private route:Router) { }

  ngOnInit(): void { 
    this.plantillasService.getTemplates()
    .subscribe(res => {
      this.plantillas = res;
    },
    error => console.log(error));
  }

  open(content, id){
    this.plantillaSeleccionada=id;
    this.modalService.open(content, { centered:true })

  }

  editarPlantilla(id){
    this.onEditarPlantilla.emit(id);
    this.route.navigate(['/admin/editor']);
  }

  
  eliminarPlantilla(){
    this.plantillasService.deleteTemplate(this.plantillaSeleccionada)
    .subscribe(() => {
      this.ngOnInit();
      this.modalService.dismissAll()
    }, error => console.log(error));
  }
}
