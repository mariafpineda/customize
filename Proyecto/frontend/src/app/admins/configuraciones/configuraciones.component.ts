import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminsService } from 'src/app/services/admins.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  cambioContrasenia = new FormGroup({
    contraseniaAnterior: new FormControl('', [Validators.required]),
    contraseniaAdmin: new FormControl('', [Validators.required]),
    confirmarContrasenia : new FormControl('', [Validators.required])
  });

  errorMessage:String;
  errorBool:Boolean;
  successMessage:String;
  successBool:Boolean;

  constructor( private adminsService:AdminsService) { }

  ngOnInit(): void {
  }

  actualizarContrasenia(){
    const idAdmin = localStorage.getItem('idAdmin');
    if(!this.cambioContrasenia.valid){
      this.errorMessage="Todos los campos son obligatorios.";
      this.errorBool=true;
    } else if(this.cambioContrasenia.value.contraseniaAdmin != this.cambioContrasenia.value.confirmarContrasenia){
      this.errorMessage="La contraseña nueva no coincide con su confirmación.";
      this.errorBool=true;
    } else(
      this.adminsService.updatePassword(idAdmin, this.cambioContrasenia.value)
      .subscribe( res => {
        this.successBool=true;
        this.successMessage= res.message;
      }, error => {
        this.errorBool=true;
        this.errorMessage=error.error.message;
      })
    )

    setTimeout( () => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }



}
