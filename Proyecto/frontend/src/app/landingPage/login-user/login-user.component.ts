import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  errorMessage:String;
  errorBool:Boolean;

  formularioLoginUsers = new FormGroup({
    correo : new FormControl('', [Validators.required, Validators.email]),
    contrasenia : new FormControl('', [Validators.required])
  });

  constructor(private usuariosService:UsuariosService,
    private router:Router ) { }

  ngOnInit(): void {
  }

  guardarUsuario(){
    if(!this.formularioLoginUsers.valid){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else {
    this.usuariosService.signIn(this.formularioLoginUsers.value)
    .subscribe(res => {
      localStorage.setItem('tokenUser', res.token);
      this.router.navigate(['/usersHome']);
    }, error => {
        this.errorBool=true;
        this.errorMessage=error.error.message
    }
    )}
    setTimeout(() => {
      this.errorBool=false;
    }, 5000);
  }

}
