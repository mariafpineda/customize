import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;

  planes:any;
  planSeleccionado:String;

  constructor(private modalService:NgbModal,
    private planesService:PlanesService) { }

  ngOnInit(): void {
    this.planesService.getPlans()
    .subscribe(res => {
      this.planes= res;
    }, error => console.log(error)
    )
  }

  open(content, id){
    this.modalService.open(content, {centered: true});
    this.planSeleccionado=id;
  }
  
}
