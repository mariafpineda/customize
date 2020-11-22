import { Component, OnInit } from '@angular/core';
import { faUserTimes, faUserSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from 'src/app/services/empresas.service';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  faUserTimes = faUserTimes;
  faUserSlash = faUserSlash;
  faUser = faUser;
  empresas:any;
  empresaSeleccionada:String;
  estadoActualEmpresa:String='';

  constructor(
    private empresasService:EmpresasService,
    private modalService:NgbModal) { }

  ngOnInit(): void {
    this.empresasService.getBrands()
    .subscribe(res => {
      this.empresas=res;
    }, error => console.log(error)
    )
  }

  open(content, id){
    this.modalService.open(content, { centered: true });
    this.empresaSeleccionada=id;
  }

  bloquearEmpresa(){
    this.empresasService.blockUser(this.empresaSeleccionada, 'bloqueado')
    .subscribe(res => {
      console.log(res);
      this.ngOnInit()
      this.modalService.dismissAll();
    }, error => console.log(error))
  }

  desbloquearEmpresa(){
    console.log((<HTMLInputElement>document.getElementById('block')).value);
  }

  eliminarEmpresa(){
    console.log("Eliminar empresa");
  }

}
