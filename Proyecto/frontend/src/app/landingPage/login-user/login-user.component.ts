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

  formularioLoginUsers = new FormGroup({
    correo : new FormControl('', [Validators.required, Validators.email]),
    contrasenia : new FormControl('', [Validators.required])
  });

  constructor(private usuariosService:UsuariosService,
    private router:Router ) { }

  ngOnInit(): void {
  }

  guardarUsuario(){
    this.usuariosService.signIn(this.formularioLoginUsers.value)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/usersHome']);
    }, error => console.log(error)
    )
  }

}
