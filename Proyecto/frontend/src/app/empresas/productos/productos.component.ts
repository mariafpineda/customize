import { Component, OnInit } from '@angular/core';
import { faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  faPlus=faPlus;
  faEdit=faEdit;
  faTrashAlt=faTrashAlt;
  empresaLoggeada=localStorage.getItem('idBrand');
  productos:any=[];
  imagenes:any=[];
  categorias:any=[];
  nombre:String='';
  precio:String='';
  categoriaSeleccionada:String='';
  imagenSeleccionada:String='';
  productoSeleccionado:String;
  previewImg:String='/assets/img/no_photo.png';

  constructor(private empresasService:EmpresasService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.empresasService.getProducts(this.empresaLoggeada)
    .subscribe( res => {
      this.productos=res[0].productos;
    }, error => console.log(error));

    this.empresasService.getCategories(this.empresaLoggeada)
    .subscribe(res => {
      this.categorias=res.categorias;
    }, error=>console.log(error));

    this.empresasService.getImages(this.empresaLoggeada)
    .subscribe(res => {
      this.imagenes=res[0].imagenes;
    }, error => console.log(error))
  }

  open(content, id){
    this.modalService.open(content, {centered:true});
    if(id!=''){
      this.productoSeleccionado=id;
    }
  }

  visualizarIcono(){
    this.previewImg='http://localhost:8888/'+this.imagenSeleccionada;
  }

  agregarProducto(){
    var data={
      nombreProducto: this.nombre,
      precio: Number(this.precio),
      categoria:this.categoriaSeleccionada,
      imagen:this.imagenSeleccionada
    }
    this.empresasService.addProduct(this.empresaLoggeada,data)
    .subscribe( () => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error=> console.log(error));
  }

  editarProducto(){
    var data={
      nombreProducto: this.nombre,
      precio: Number(this.precio),
      categoria:this.categoriaSeleccionada,
      imagen:this.imagenSeleccionada
    }
    this.empresasService.updateProduct(this.empresaLoggeada, this.productoSeleccionado, data)
    .subscribe(() => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error => console.log(error))
  }

  eliminarProducto(){
    this.empresasService.deleteProduct(this.empresaLoggeada, this.productoSeleccionado)
    .subscribe( () => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error => console.log(error));
  }

}
