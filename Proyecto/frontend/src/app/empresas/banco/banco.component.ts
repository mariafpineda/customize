import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { faEdit, faFile, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})

export class BancoComponent implements OnInit {
  faFile=faFile;
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;
  active=1;
  imagenes:any=[];
  videos:any=[];
  archivos:any=[];
  nombre:String='';
  descripcion:String='';
  archivo:File;
  archivoAgregado:Boolean;

  constructor(private empresaService:EmpresasService) { }

  ngOnInit(): void {
    this.empresaService.getCompany(localStorage.getItem('idBrand'))
    .subscribe(res => {
      this.imagenes=res[0].imagenes;
      this.videos=res[0].videos;
      this.archivos=res[0].archivos;
      console.log(this.archivos)
    },error=> {
      console.log(error);
    })
  }

  agregarArchivo(){
    var archivo=this.archivo.name.split('.');
    var formato=archivo[archivo.length-1];
    if(formato=='png' || formato=='jpg' || formato=='jpeg' || formato=='gif' || formato=='tiff' || formato=='tif'){
      this.empresaService.addImage(localStorage.getItem('idBrand'), this.nombre, this.descripcion, this.archivo)
      .subscribe(res => {
        this.archivoAgregado=true;
        this.imagenes.push(res);
      }, error=> {
        console.log(error);
      });
    } else if(formato =='mp4' || formato =='avi' || formato =='mkv' || formato =='flv' || formato =='mov'){
      this.empresaService.addVideo(localStorage.getItem('idBrand'), this.nombre, this.descripcion, this.archivo)
      .subscribe(res => {
        this.archivoAgregado=true;
        this.videos.push(res);
      }, error=> {
        console.log(error);
      });
    } else{
      this.empresaService.addFile(localStorage.getItem('idBrand'), this.nombre, this.descripcion, this.archivo)
      .subscribe(res => {
        this.archivoAgregado=true;
        this.archivos.push(res);
      }, error=> {
        console.log(error);
      });
    }

    setTimeout(() =>{ 
      this.archivoAgregado=false;
    }, 5000);
  }

  onFileSelected(event: HtmlInputEvent):void{
    if(event.target.files && event.target.files[0]){
      this.archivo=<File>event.target.files[0];
    }
  }

  borrarImagen(id){

  }

  actualizarImagen(id){

  }

  borrarVideo(id){

  }

  actualizarVideo(id){

  }

  borrarArchivo(id){

  }

  actualizarArchivo(id){
    
  }


}
