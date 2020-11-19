import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
    private planesService:PlanesService) { }

  ngOnInit(): void {
    this.planesService.getPlans()
    .subscribe(res =>{
      this.planes=res;
    }, error=>console.log(error));
  }

  registrarEmpresa(){
    console.log(this.formularioRegistroBrands.value)
    this.empresasService.signUp(this.formularioRegistroBrands.value)
    .subscribe(
      res=> {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/companiesHome']);
      },
      error => console.log(error)
    )
  }

}
