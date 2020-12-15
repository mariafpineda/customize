import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCog, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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

  isMenuCollapsed=true;

  empresas:any=[];
  productos:any=[];
  compras:any=[];

  regionVisible="empresas";

  constructor(private empresasService:EmpresasService,
    private usuariosService:UsuariosService,
    private route:Router) { }

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

  logout(){
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

  agregarCarrito(producto){
    var carrito;
    console.log(producto);
    if(localStorage.getItem('carrito')==null){
      localStorage.setItem('carrito', producto);
    } else {
      carrito=localStorage.getItem('carrito');
      carrito.push(producto);
      localStorage.setItem('carrito', carrito);
    }
  }

}
