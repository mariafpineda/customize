import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlanesService } from '../../services/planes.service'

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent implements OnInit {

  planes:any = [];
  errorBool:Boolean;
  errorMessage:String;

  formularioRegistroBrands = new FormGroup({
    nombreEmpresa : new FormControl('', [Validators.required]),
    nombreDominio: new FormControl('', [Validators.required]),
    rubro: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    correoEmpresa: new FormControl('', [Validators.required, Validators.email]),
    confirmarCorreo: new FormControl('', [Validators.required, Validators.email]),
    contraseniaEmpresa: new FormControl('', [Validators.required]),
    confirmarContrasenia: new FormControl('', [Validators.required]),
    planActual: new FormControl('', [Validators.required])
  })

  constructor( private empresasService:EmpresasService,
    private router:Router,
    private planesService:PlanesService,
    private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Regístrate');
    this.planesService.getPlans()
    .subscribe(res =>{
      this.planes=res;
    }, error=>console.log(error));
  }

  registrarEmpresa(){
    if(!this.formularioRegistroBrands.valid){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else if(this.formularioRegistroBrands.value.correoEmpresa != this.formularioRegistroBrands.value.confirmarCorreo){
      this.errorMessage="Los correos electrónicos ingresados no coinciden";
      this.errorBool=true;
    } else if(this.formularioRegistroBrands.value.contraseniaEmpresa != this.formularioRegistroBrands.value.confirmarContrasenia){
      this.errorMessage="Las contraseñas ingresadas no coinciden";
      this.errorBool=true;
    } else {
      this.empresasService.signUp(this.formularioRegistroBrands.value)
      .subscribe(
        res=> {
          localStorage.setItem('token', res.token);
          localStorage.setItem('idBrand', res.idBrand);
          this.router.navigate(['/admin-companies/home']);
        },
        error => {
          this.errorMessage=error.error.message;
          this.errorBool = true;
        }
      )
    }
    setTimeout(() => {
      this.errorBool = false;
    }, 5000);
    
  }

}
