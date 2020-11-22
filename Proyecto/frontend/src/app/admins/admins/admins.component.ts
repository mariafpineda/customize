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
  admin:any={
    nombreAdmin:'',
    apellidoAdmin:'',
    correoAdmin:'',
    confirmarCorreo:''
  }
  adminSeleccionado:String;
  errorMessage:String;
  errorBool:Boolean;
  successMessage:String;
  successBool:Boolean;

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
    if(!this.formularioRegistroAdmins.valid){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else if(this.formularioRegistroAdmins.value.correoAdmin != this.formularioRegistroAdmins.value.confirmarCorreo){
      this.errorMessage="Los correos electrónicos ingresados no coinciden."
      this.errorBool=true;
    } else if(this.formularioRegistroAdmins.value.contraseniaAdmin != this.formularioRegistroAdmins.value.confirmarContrasenia){
      this.errorMessage="Las contraseñas ingresadas no coinciden."
      this.errorBool=true;
    } else{
      this.adminsService.signUp(this.formularioRegistroAdmins.value)
      .subscribe(
        res=>{
          this.successMessage=res.message;
          this.successBool=true;
          this.ngOnInit();
        }, 
        error => {
          this.errorMessage=error.error.message;
          this.errorBool=true;
        }
      )
    }
    setTimeout(() => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }

  obtenerAdmin(id, content){
    this.open(content);
    this.adminsService.getAdmin(id)
    .subscribe(
      res => {
        this.admin.nombreAdmin=res[0].nombreAdmin;
        this.admin.apellidoAdmin=res[0].apellidoAdmin;
        this.admin.correoAdmin=res[0].correoAdmin;
        this.admin.confirmarCorreo=res[0].correoAdmin;
        this.adminSeleccionado=res[0]._id
      }, error => {
        console.log(error);
      }
    )
  }

  editarAdmin(id){
    if(this.admin.nombreAdmin=='' || this.admin.apellidoAdmin=='' || this.admin.correoAdmin=='' || this.admin.confirmarCorreo==''){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else if(this.admin.correoAdmin != this.admin.confirmarCorreo){
      this.errorMessage="Los correos electrónicos ingresados no coinciden."
      this.errorBool=true;
    } else{
      this.adminsService.updateData(id, this.admin)
      .subscribe(
        res=>{
          this.successMessage=res.message;
          this.successBool=true;
          this.ngOnInit();
        }, error=>{
          this.errorMessage=error.error.message;
          this.errorBool=true;
        }
      )
    }
    setTimeout(() => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }

  eliminarAdmin(id){
    console.log(id);
  }

}
