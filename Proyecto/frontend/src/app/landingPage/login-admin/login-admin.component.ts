import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  formularioLoginAdmin = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required])
  });

  constructor(private adminsService:AdminsService,
    private router:Router) { }

  ngOnInit(): void {
  }

  guardarAdmin(){
    this.adminsService.signIn(this.formularioLoginAdmin.value)
    .subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/adminsHome']);
    }, error => console.log(error)
    )
  }


}
