import { Component, OnInit } from '@angular/core';
import { faUserTimes, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AdminsService } from "../../services/admins.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router'

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

  errorMessage:String;
  errorBool:Boolean;

  formularioRegistroAdmins = new FormGroup({
    nombreAdmin: new FormControl('', [Validators.required]),
    apellidoAdmin: new FormControl('', [Validators.required]),
    correoAdmin : new FormControl('', [Validators.required, Validators.email]),
    confirmarCorreo : new FormControl('', [Validators.required, Validators.email]),
    contraseniaAdmin : new FormControl('', [Validators.required]),
    confirmarContrasenia : new FormControl('', [Validators.required])
  })

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
