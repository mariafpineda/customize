import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-config-generales',
  templateUrl: './config-generales.component.html',
  styleUrls: ['./config-generales.component.css']
})
export class ConfigGeneralesComponent implements OnInit {

  encabezado:String="";
  encabezadoBool:Boolean=true;
  piePagina:String="";
  piePaginaBool:Boolean=false;
  nombreSitio:String="";
  descripcion:String="";
  favicon:File;
  logotipo:File;
  urlLogo:String="";
  urlFavicon:String="";
  messageInfo:String="";
  errorBool:Boolean=false;
  successBool:Boolean=false;
  config:any=[];
   
  constructor(private imagenesService:ImagenesService,
    private empresasService:EmpresasService) { }

  onLogoSelected(event: HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.logotipo=<File>event.target.files[0];
    }
  }

  onFaviconSelected(event: HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.favicon=<File>event.target.files[0];
    }
  }

  subirLogo(){
    this.imagenesService.addImage(this.logotipo)
    .subscribe(result => {
      this.urlLogo = result.urlImagen;
      console.log(result);
    }, error => console.log(error))
  }

  subirFavicon(){
    this.imagenesService.addImage(this.favicon)
    .subscribe(result => {
      this.urlFavicon = result.urlImagen;
      console.log(result);
    }, error => console.log(error))
  }

  ngOnInit(): void {
    this.obtenerConfiguracion();
    console.log(this.config.length)
    
  }

  guardarConfiguraciones(){
    var data={
      encabezado:this.encabezado,
      encabezadoBool:this.encabezadoBool,
      footer:this.piePagina,
      footerBool:this.piePaginaBool,
      titulo:this.nombreSitio,
      descripcion:this.descripcion,
      favicon:this.urlLogo,
      logotipo:this.urlFavicon
    }

    this.empresasService.addConfig(localStorage.getItem('idBrand'), data)
    .subscribe(res => {
      if(res.ok){
        this.messageInfo="Datos actualizados correctamente.";
        this.successBool=true;
      }
    }, () => {
      this.messageInfo="Ocurrió un error, inténtelo nuevamente.";
      this.errorBool=true;
    })

    setTimeout(() => {
      this.errorBool= false;
      this.successBool=false
    }, 5000);
  }

  actualizarConfiguraciones(){
    var data={
      encabezado:this.encabezado,
      encabezadoBool:this.encabezadoBool,
      footer:this.piePagina,
      footerBool:this.piePaginaBool,
      titulo:this.nombreSitio,
      descripcion:this.descripcion,
      favicon:this.urlLogo,
      logotipo:this.urlFavicon
    }

    this.empresasService.updateConfig(localStorage.getItem('idBrand'), data)
    .subscribe(res => {
      if(res.ok){
        this.messageInfo="Datos actualizados correctamente.";
        this.successBool=true;
      }
    }, () => {
      this.messageInfo="Ocurrió un error, inténtelo nuevamente.";
      this.errorBool=true;
    })
    
    setTimeout(() => {
      this.errorBool= false;
      this.successBool=false
    }, 5000);
  }

  obtenerConfiguracion(){
    this.empresasService.getConfig(localStorage.getItem('idBrand'))
    .subscribe(res => {
      this.config = res[0].configuraciones;
      if(this.config.length!=0){
        this.encabezado=this.config[0].encabezadoGenerico;
        this.encabezadoBool=this.config[0].encabezadoVisible;
        this.piePagina=this.config[0].piePaginaGenerico;
        this.piePaginaBool=this.config[0].piePagineVisible;
        this.nombreSitio=this.config[0].tituloSitio;
        this.descripcion=this.config[0].descripcion;
        this.urlLogo=this.config[0].favicon;
        this.urlFavicon=this.config[0].logotipo;
      }
    }, error => {
      console.log(error);
    })
  }


}
