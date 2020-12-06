import { Component, OnInit } from '@angular/core';
import { faUserTimes, faUserSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from 'src/app/services/empresas.service';
import { isThisTypeNode } from 'typescript';


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
    this.empresasService.getCompanies()
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
    this.empresasService.stateCompany(this.empresaSeleccionada, 'bloqueado')
    .subscribe(res => {
      this.ngOnInit()
      this.modalService.dismissAll();
    }, error => console.log(error))
  }

  desbloquearEmpresa(){
    this.empresasService.stateCompany(this.empresaSeleccionada, 'activo')
    .subscribe(() => {
      this.ngOnInit()
      this.modalService.dismissAll();
    }, error => console.log(error))
  }

  eliminarEmpresa(){
    this.empresasService.deleteCompany(this.empresaSeleccionada)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll();
    }, error => console.log(error))
  }

}
