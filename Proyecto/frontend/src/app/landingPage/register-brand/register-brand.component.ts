import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-register-brand',
  templateUrl: './register-brand.component.html',
  styleUrls: ['./register-brand.component.css']
})
export class RegisterBrandComponent implements OnInit {

  formularioRegistroBrands = new FormGroup({
    company : new FormControl('', [Validators.required]),
    domain: new FormControl('', [Validators.required]),
    market: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }

}
