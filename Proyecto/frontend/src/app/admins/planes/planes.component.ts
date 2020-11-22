import { Component, OnInit } from '@angular/core';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  faPlus=faPlus;

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  open(content, id){
    this.modalService.open(content, {centered: true});
  }
  
}
