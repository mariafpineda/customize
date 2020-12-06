import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { faEdit, faFile, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  empresaLoggeada=localStorage.getItem('idBrand');
  imagenes:any=[];
  videos:any=[];
  archivos:any=[];
  nombre:String='';
  descripcion:String='';
  archivo:File;
  archivoAgregado:Boolean;
  archivoSeleccionado:any;

  constructor(private empresaService:EmpresasService,
    private modalservice:NgbModal) { }

  ngOnInit(): void {
    this.empresaService.getCompany(localStorage.getItem('idBrand'))
    .subscribe(res => {
      this.imagenes=res[0].imagenes;
      this.videos=res[0].videos;
      this.archivos=res[0].archivos;
    },error=> {
      console.log(error);
    })
  }

  open(content, tipo, id){
    this.modalservice.open(content, {centered:true});
    this.archivoSeleccionado={
      tipo: tipo,
      id:id
    }
  }

  agregarArchivo(){
    var archivo=this.archivo.name.split('.');
    var formato=archivo[archivo.length-1];
    if(formato=='png' || formato=='jpg' || formato=='jpeg' || formato=='gif' || formato=='tiff' || formato=='tif'){
      this.empresaService.addImage(localStorage.getItem('idBrand'), this.nombre, this.descripcion, this.archivo)
      .subscribe(res => {
        this.archivoAgregado=true;
        this.ngOnInit();
      }, error=> {
        console.log(error);
      });
    } else if(formato =='mp4' || formato =='avi' || formato =='mkv' || formato =='flv' || formato =='mov'){
      this.empresaService.addVideo(localStorage.getItem('idBrand'), this.nombre, this.descripcion, this.archivo)
      .subscribe(res => {
        this.archivoAgregado=true;
        this.ngOnInit();
      }, error=> {
        console.log(error);
      });
    } else{
      this.empresaService.addFile(localStorage.getItem('idBrand'), this.nombre, this.descripcion, this.archivo)
      .subscribe(res => {
        this.archivoAgregado=true;
        this.ngOnInit();
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

  borrar(){
    if(this.archivoSeleccionado.tipo=="imagen"){
      this.borrarImagen(this.archivoSeleccionado.id)
    } else if(this.archivoSeleccionado.tipo=="video"){
      this.borrarVideo(this.archivoSeleccionado.id)
    } else {
      this.borrarArchivo(this.archivoSeleccionado.id);
    }
  }

  actualizar(){
    if(this.archivoSeleccionado.tipo=="imagen"){
      this.actualizarImagen(this.archivoSeleccionado.id)
    } else if(this.archivoSeleccionado.tipo=="video"){
      this.actualizarVideo(this.archivoSeleccionado.id)
    } else {
      this.actualizarArchivo(this.archivoSeleccionado.id);
    }

  }

  borrarImagen(id){
    this.empresaService.deleteImage(this.empresaLoggeada, id)
    .subscribe( () => {
      this.modalservice.dismissAll();
      this.ngOnInit();
    }, error => {
      console.log(error);
    })
  }

  actualizarImagen(id){
    var data={
      nombre:this.nombre,
      descripcion:this.descripcion
    }
    this.empresaService.updateImage(this.empresaLoggeada, id, data)
    .subscribe( () => {
      this.modalservice.dismissAll();
      this.ngOnInit();
      this.nombre='';
      this.descripcion='';
    }, error => {
      console.log(error);
    })
  }

  borrarVideo(id){
    this.empresaService.deleteVideo(this.empresaLoggeada, id)
    .subscribe( () => {
      this.modalservice.dismissAll();
      this.ngOnInit();
    }, error => {
      console.log(error);
    })
  }

  actualizarVideo(id){
    var data={
      nombre:this.nombre,
      descripcion:this.descripcion
    }
    this.empresaService.updateVideo(this.empresaLoggeada, id, data)
    .subscribe( () => {
      this.modalservice.dismissAll();
      this.ngOnInit();
      this.nombre='';
      this.descripcion='';
    }, error => {
      console.log(error);
    })
  }

  borrarArchivo(id){
    this.empresaService.deleteFile(this.empresaLoggeada, id)
    .subscribe( () => {
      this.modalservice.dismissAll();
      this.ngOnInit();
    }, error => {
      console.log(error);
    })
  }

  actualizarArchivo(id){
    var data={
      nombre:this.nombre,
      descripcion:this.descripcion
    }
    this.empresaService.updateFile(this.empresaLoggeada, id, data)
    .subscribe( () => {
      this.modalservice.dismissAll();
      this.ngOnInit();
      this.nombre='';
      this.descripcion='';
    }, error => {
      console.log(error);
    })
  }


}
