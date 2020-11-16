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

  formularioLoginBrands = new FormGroup({
    correo : new FormControl('', [Validators.required, Validators.email]),
    contrasenia : new FormControl('', [Validators.required])
  });

  constructor(private empresasService:EmpresasService,
    private router:Router) { }

  ngOnInit(): void {
  }

  guardarEmpresa(){
    this.empresasService.signIn(this.formularioLoginBrands.value)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/companiesHome']);
    }, error => console.log(error)
    )
  }

}
