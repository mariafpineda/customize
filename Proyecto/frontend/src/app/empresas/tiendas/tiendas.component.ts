import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlantillasService } from 'src/app/services/plantillas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  faEye=faEye;
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;
  empresaLoggeada=localStorage.getItem('idBrand');
  paginas:any=[];
  plantillas:any=[];
  plan:any=[];
  constructor(private empresasService:EmpresasService,
    private plantillasService:PlantillasService,
    private modalService:NgbModal,
    private router:Router) { }

  ngOnInit(): void {
    this.empresasService.getPages(this.empresaLoggeada)
    .subscribe(res =>{
      this.paginas=res[0].paginas;
      console.log(this.paginas);
    }
    , error=>console.log(error));

    this.plantillasService.getTemplates()
    .subscribe(res=>{
      this.plantillas=res;
      console.log(this.plantillas);
    });

    this.empresasService.getPlan(this.empresaLoggeada)
    .subscribe(res => {
      this.plan=res[0].plan;
    }, error => console.log(error));
    
  }

  crearPagina(alerta){
    if(this.paginas.length>=this.plan[0].cantidadPaginas){
      this.modalService.open(alerta, {centered:true});
    } else{
      var data={
        encabezado: "",
        footer: "",
        favicon: "",
        logotipo: "",
        titulo: "",
        descripcion: "",
        palabrasClave: "",
        codigo: "",
        css: "",
        js: "",
        paginaPrincipal: ""
      }
      this.empresasService.addPage(this.empresaLoggeada, data)
      .subscribe(() => {
        this.ngOnInit();
        var pagina = this.paginas[this.paginas.length-1];
        this.router.navigate([`/admin-companies/${this.empresaLoggeada}/pages/${pagina._id}`]);

      }, error => console.log(error));
    }
  }

  editarPagina(id){
    this.router.navigate([`/admin-companies/${this.empresaLoggeada}/pages/${id}`]);
  }

  eliminarPagina(id){
   this.empresasService.deletePage(this.empresaLoggeada, id)
   .subscribe(res => {
      this.ngOnInit();
   }, error => console.log(error));
  }

}
