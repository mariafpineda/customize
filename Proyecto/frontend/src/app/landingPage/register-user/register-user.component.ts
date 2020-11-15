import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UsuariosService } from '../../services/usuarios.service';

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

  genero = '';
  onItemChange(value){
    this.genero = value;
  }

  constructor(private usuariosService : UsuariosService) { }

  ngOnInit(): void {
  }

  
  registrarUsuario(){
    this.usuariosService.signUp(this.formularioRegistroUsers.value)
    .subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error);
      }
    )
  }

}
