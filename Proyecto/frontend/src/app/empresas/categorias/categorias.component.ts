import { Component, OnInit } from '@angular/core';
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  faPlus=faPlus;
  faTimes=faTimes;
  categorias:any=[];
  empresaLoggeada=localStorage.getItem('idBrand');
  nombre:String='';

  constructor(private empresasService:EmpresasService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.empresasService.getCategories(this.empresaLoggeada)
    .subscribe( res => {
      this.categorias=res.categorias;
    }, error => {
      console.log(error);
    });
  }

  open(content){
    this.ngOnInit();
    this.modalService.open(content, {centered:true});
  }

  agregarCategoria(){
    this.empresasService.addCategory(this.empresaLoggeada, this.nombre)
    .subscribe( () => {
      this.modalService.dismissAll();
      this.ngOnInit();
    }, error => console.log(error))
  }

  borrarCategoria(id){
    this.empresasService.deleteCategory(this.empresaLoggeada, id)
    .subscribe( () =>{
      this.ngOnInit()
    }, error => console.log(error));
  }

}
