import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';

@Component({
  selector: 'app-inicio-tiendas',
  templateUrl: './inicio-tiendas.component.html',
  styleUrls: ['./inicio-tiendas.component.css']
})
export class InicioTiendasComponent implements OnInit {
  @Output() onSeccionSeleccionada = new EventEmitter()
  plan:any=[];

  constructor(private empresasService:EmpresasService) { }

  ngOnInit(): void {
    this.empresasService.getPlan(localStorage.getItem('idBrand'))
    .subscribe(res => {
      this.plan=res[0].plan[0];
    },error => {
      console.log(error);
    })
  }

  seccionSeleccionada(region){
    this.onSeccionSeleccionada.emit(region);
  }


}
