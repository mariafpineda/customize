import { Component, OnInit } from '@angular/core';
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;

  plan:any={
    nombrePlan : '',
    cantidadPaginas: '',
    cantidadProductos : '',
    precioPlan : ''
  }

  planes:any;
  planSeleccionado:String;
  errorMessage:String;
  errorBool:Boolean;
  successMessage:String;
  successBool:Boolean;

  constructor(private modalService:NgbModal,
    private planesService:PlanesService) { }

  ngOnInit(): void {
    this.planesService.getPlans()
    .subscribe(res => {
      this.planes= res;
    }, error => console.log(error)
    )
  }

  open(content, id){
    this.modalService.open(content, {centered: true});
    this.planSeleccionado=id;
    if(id!=''){  
      this.planesService.getPlan(id)
      .subscribe(res => {
        this.plan.nombrePlan=res[0].nombrePlan;
        this.plan.precioPlan=res[0].precioPlan;
        this.plan.cantidadPaginas=res[0].cantidadPaginas;
        this.plan.cantidadProductos=res[0].cantidadProductos;
      }, error => console.log(error));
    } else{
      this.plan.nombrePlan='';
      this.plan.cantidadPaginas= '';
      this.plan.cantidadProductos = '';
      this.plan.precioPlan = '';
    }

  }

  agregarPlan(){
    if(this.plan.nombrePlan == '' || this.plan.precioPlan=='' || this.plan.cantidadProductos== '' || this.plan.cantidadPaginas == ''){
      this.errorMessage='Todos los campos son obligatorios.'
      this.errorBool=true;
    } else{
      this.planesService.addPlan(this.plan)
      .subscribe(res => {
        this.successMessage=res.message;
        this.successBool=true;
        this.ngOnInit();
      }, error => console.log(error));
    }
    setTimeout( () => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }

  actualizarPlan(){
    if(this.plan.nombrePlan == '' || this.plan.precioPlan=='' || this.plan.cantidadProductos== '' || this.plan.cantidadPaginas == ''){
      this.errorMessage='Todos los campos son obligatorios.'
      this.errorBool=true;
    } else{
      this.planesService.updatePlan(this.planSeleccionado, this.plan)
      .subscribe(res => {
        this.successMessage=res.message;
        this.successBool=true;
        this.ngOnInit();
      }, error => console.log(error));
    }
    setTimeout( () => {
      this.errorBool=false;
      this.successBool=false;
    }, 5000);
  }

  eliminarPlan(){
    this.planesService.deletePlan(this.planSeleccionado)
    .subscribe( () => {
      this.ngOnInit();
      this.modalService.dismissAll();
    }, error => console.log(error)
    )
  }
  
}
