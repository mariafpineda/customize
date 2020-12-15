import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css']
})
export class UsersHomeComponent implements OnInit {
  faShoppingCart=faShoppingCart;
  faSignOutAlt=faSignOutAlt;
  faTimes=faTimes;

  isMenuCollapsed=true;

  empresas:any=[];
  productos:any=[];
  compras:any=[];
  carrito:any=[];
  totalCompra:number=0;

  regionVisible="empresas";

  constructor(private empresasService:EmpresasService,
    private usuariosService:UsuariosService,
    private route:Router,
    private modalService:NgbModal) { }

  ngOnInit(): void {

    this.empresasService.getCompanies()
    .subscribe(res => {
      this.empresas=res;
      console.log(this.empresas)
    }, error => console.log(error));

  }

  verProductos(id){
    this.regionVisible="productos";
    console.log(id);
    this.obtenerProductos(id);
  }

  obtenerLS(){
    this.compras=[];
    if(localStorage.getItem('carrito')!= null){
      this.carrito=[JSON.parse(localStorage.getItem('carrito'))];
    }
    for(let i=0; i<this.carrito[0].length;i++){
      console.log(typeof(this.carrito[0][i]))
      this.compras.push(this.carrito[0][i]);
    }
  }

  obtenerProductos(id){
    this.empresasService.getProducts(id)
    .subscribe(res => {
      console.log(res[0].productos);
      this.productos=res[0].productos;
    },
    error => {
      console.log(error);
    })
  }

  open(content){
    this.obtenerLS();
    this.modalService.open(content, {centered:true});
    
  }

  logout(){
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

  agregarCarrito(producto){
    var carrito=[producto]
    var nuevoCarrito=producto;
    if(localStorage.getItem('carrito')==null){
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else{
      carrito = JSON.parse(localStorage.getItem('carrito'));
      carrito.push(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }

  borrar(i){
    var carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(i, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    this.obtenerLS()

  }

}
