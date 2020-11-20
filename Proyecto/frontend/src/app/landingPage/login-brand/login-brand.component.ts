import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-login-brand',
  templateUrl: './login-brand.component.html',
  styleUrls: ['./login-brand.component.css']
})
export class LoginBrandComponent implements OnInit {

  errorBool:Boolean;
  errorMessage:String;

  formularioLoginBrands = new FormGroup({
    correo : new FormControl('', [Validators.required, Validators.email]),
    contrasenia : new FormControl('', [Validators.required])
  });

  constructor(private empresasService:EmpresasService,
    private router:Router) { }

  ngOnInit(): void {
  }

  guardarEmpresa(){
    if(!this.formularioLoginBrands.valid){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else {
      this.empresasService.signIn(this.formularioLoginBrands.value)
      .subscribe(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('idBrand', res.idBrand);
        this.router.navigate(['/companiesHome']);
      }, error => {
        this.errorMessage=error.error.message;
        this.errorBool=true;
      }
    )
    }
    setTimeout(() => {
      this.errorBool=false;
    }, 5000);
    
  }

}
