import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  cambioContrasenia = new FormGroup({
    contrasenia: new FormControl('', [Validators.required]),
    confirmarContrasenia : new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }

}
