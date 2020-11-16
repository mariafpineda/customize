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

  formularioRegistroUsers = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    apellidoUsuario: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    correoUsuario: new FormControl('', [Validators.required, Validators.email]),
    contraseniaUsuario: new FormControl('', [Validators.required]),
    genero : new FormControl('', [Validators.required])
  });

  constructor(private usuariosService : UsuariosService,
    private router : Router) { }

  ngOnInit(): void {
  }

  
  registrarUsuario(){
    this.usuariosService.signUp(this.formularioRegistroUsers.value)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/usersHome']);
      },
      error => console.log(error)
    )
  }

}
