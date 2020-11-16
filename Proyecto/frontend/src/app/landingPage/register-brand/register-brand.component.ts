import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent implements OnInit {

  formularioRegistroBrands = new FormGroup({
    nombreEmpresa : new FormControl('', [Validators.required]),
    nombreDominio: new FormControl('', [Validators.required]),
    rubro: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    correoEmpresa: new FormControl('', [Validators.required, Validators.email]),
    contraseniaEmpresa: new FormControl('', [Validators.required]),
    planActual: new FormControl('', [Validators.required])
  })

  constructor( private empresasService:EmpresasService,
    private router:Router) { }

  ngOnInit(): void {
  }

  registrarEmpresa(){
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
