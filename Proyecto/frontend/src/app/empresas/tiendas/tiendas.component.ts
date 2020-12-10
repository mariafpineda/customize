import { Component, OnInit } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { EmpresasService } from 'src/app/services/empresas.service';
import { PlantillasService } from 'src/app/services/plantillas.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {
  faEye=faEye;
  empresaLoggeada=localStorage.getItem('idBrand');
  paginas:any=[];
  plantillas:any=[];
  constructor(private empresasService:EmpresasService,
    private plantillasService:PlantillasService) { }

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

    
  }

}
