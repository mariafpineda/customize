import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  errorMessage:String;
  errorBool:Boolean;

  formularioRegistroUsers = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    apellidoUsuario: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    correoUsuario: new FormControl('', [Validators.required, Validators.email]),
    confirmarCorreo: new FormControl('', [Validators.required, Validators.email]),
    contraseniaUsuario: new FormControl('', [Validators.required]),
    confirmarContrasenia: new FormControl('', [Validators.required]),
    genero : new FormControl('', [Validators.required])
  });

  constructor(private usuariosService : UsuariosService,
    private router : Router) { }

  ngOnInit(): void {
  }

  
  registrarUsuario(){
    if(!this.formularioRegistroUsers.valid){
      this.errorMessage="Todos los campos son obligatorios";
      this.errorBool=true;
    } else if (this.formularioRegistroUsers.value.correoUsuario !=this.formularioRegistroUsers.value.confirmarCorreo){
      this.errorMessage="Los correos electrónicos ingresados no coinciden";
      this.errorBool=true;
    } else if(this.formularioRegistroUsers.value.contraseniaUsuario !=this.formularioRegistroUsers.value.confirmarContrasenia){
      this.errorMessage="Las contraseñas ingresadas no coinciden";
      this.errorBool=true;
    }
    else{
      this.usuariosService.signUp(this.formularioRegistroUsers.value)
      .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('idUser', res.idUser);
        this.router.navigate(['/user/home']);
      },
      error => {
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
