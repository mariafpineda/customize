import { Component, OnInit } from '@angular/core';
import { faUserTimes, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AdminsService } from "../../services/admins.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})

export class AdminsComponent implements OnInit {
  faUserTimes=faUserTimes;
  faUserEdit=faUserEdit;
  faUserPlus=faUserPlus;
  admins:any=[];

  constructor(
    private adminsService:AdminsService
    ,private modalService: NgbModal) { }

    ngOnInit(): void {
      this.adminsService.getAdmins()
      .subscribe(res=>{
        this.admins=res;
      }, error => console.log(error))
    }
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  agregarAdmin(){
    console.log('agregar admin');
  }

  editarAdmin(id){
    console.log(id);
  }

  eliminarAdmin(id){
    console.log(id);
  }

}
