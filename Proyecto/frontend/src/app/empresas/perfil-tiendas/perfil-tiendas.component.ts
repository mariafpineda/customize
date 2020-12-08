import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-perfil-tiendas',
  templateUrl: './perfil-tiendas.component.html',
  styleUrls: ['./perfil-tiendas.component.css']
})
export class PerfilTiendasComponent implements OnInit {
  empresaLoggeada=localStorage.getItem('idBrand');
  nombreEmpresa:String='';
  nombreDominio:String='';
  rubro:String='';
  pais:String='';
  correoEmpresa:String='';
  planActual:String='';
  planSeleccionado:String='';
  contraseniaAnterior:String='';
  contraseniaEmpresa:String='';
  confirmarContrasenia:String='';
  planes:any=[];
  errorBool:Boolean = false;
  successBool:Boolean = false;
  message:String=''; 
  messageInfo:String='';

  constructor(private empresasService:EmpresasService,
    private planesService:PlanesService,
    private router:Router) { }

  ngOnInit(): void {
    this.empresasService.getCompany(localStorage.getItem('idBrand'))
    .subscribe( res => {
      this.nombreEmpresa=res[0].nombreEmpresa;
      this.nombreDominio=res[0].nombreDominio;
      this.rubro=res[0].rubro;
      this.pais=res[0].pais;
      this.correoEmpresa=res[0].correoEmpresa;
      this.planActual=res[0].planActual;
    }, error => console.log(error));

    this.planesService.getPlans()
    .subscribe(res => {
      this.planes=res;
      this.planes.forEach(element => {
        if(element._id == this.planActual){
          this.planActual=element.nombrePlan;
        }
      });
    }, error => console.log(error));
  }

  actualizarInformacion(){
    if(this.nombreEmpresa=='' || this.nombreDominio=='' || this.rubro=='' || this.pais=='' || this.correoEmpresa==''){
      this.messageInfo="Todos los campos deben ser llenados."
      this.errorBool=true;
    } else{
      var data={
        nombre: this.nombreEmpresa,
        dominio: this.nombreDominio,
        rubro: this.rubro,
        pais: this.pais,
        correo: this.correoEmpresa
      }
      this.empresasService.updateCompany(this.empresaLoggeada, data)
      .subscribe(() => {
        this.messageInfo="Datos actualizados correctamente."
        this.successBool=true;
        this.ngOnInit();
      }, error => {
        this.messageInfo=error.error.message;
        this.errorBool=true;
      });
    }
    setTimeout( () => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }

  actualizarPlan(){
    this.empresasService.updatePlan(this.empresaLoggeada, this.planSeleccionado)
    .subscribe( () => {
      this.ngOnInit();
    }, error => console.log(error));
  }

  borrarCuenta(){
    this.empresasService.deleteCompany(this.empresaLoggeada)
    .subscribe(() => {
      this.router.navigate(['/'])
    }, error => {
      console.log(error);
    })

  }

  cambiarContrasenia(){
    var data={
      contraseniaAnterior: this.contraseniaAnterior,
      contraseniaEmpresa: this.contraseniaEmpresa
    }
    if(this.contraseniaEmpresa!=this.confirmarContrasenia){
      this.message="La contraseña nueva y la confirmación de contraseña no coinciden."
      this.errorBool=true;
    } else{
      this.empresasService.updatePassword(this.empresaLoggeada, data)
      .subscribe( res => {
        this.message=res.message;
        this.successBool=true;
      }, error => {
        this.message= error.error.message;
        this.errorBool=true;
      })
    }

    setTimeout( () => {
      this.successBool=false;
      this.errorBool=false;
    }, 5000);
  }

}
