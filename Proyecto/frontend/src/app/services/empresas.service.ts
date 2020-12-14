import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private url = 'http://localhost:8888/empresas'

  constructor(private httpClient:HttpClient) { }

  signIn(company):Observable<any>{
    return this.httpClient.post(this.url+'/signin', company);
  }

  signUp(company):Observable<any>{
    return this.httpClient.post(this.url+'/signup', company);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getCompany(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}`);
  }

  getCompanies():Observable<any>{
    return this.httpClient.get(this.url+'/');
  }

  updateCompany(id, data):Observable<any>{
    return this.httpClient.put(this.url+`/${id}`, data)
  }

  updatePassword(id, data):Observable<any>{
    return this.httpClient.put(this.url+`/${id}/password`, data);
  }

  updatePlan(idCompany, idPlan):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/plan/${idPlan}`, {});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  stateCompany(id, state):Observable<any> {
    return this.httpClient.post(this.url+`/${id}/estado/${state}`, {});
  }

  deleteCompany(id):Observable<any>{
    return this.httpClient.delete(this.url+`/${id}`);
  }

  getPlan(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}/plan`);
  }

  // Banco de imágenes, video y archivos.

  getImages(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}/imagenes`);
  }

  addImage(id, nombre, descripcion, imagen):Observable<any>{
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('imagen', imagen);
    return this.httpClient.post(this.url+`/${id}/nuevaImagen`, fd);
  }

  addVideo(id, nombre, descripcion, imagen):Observable<any>{
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('video', imagen);
    return this.httpClient.post(this.url+`/${id}/nuevoVideo`, fd);
  }

  addFile(id, nombre, descripcion, imagen):Observable<any>{
    const fd = new FormData();
    fd.append('nombre', nombre);
    fd.append('descripcion', descripcion);
    fd.append('archivo', imagen);
    return this.httpClient.post(this.url+`/${id}/nuevoArchivo`, fd);
  }

  updateImage(idCompany, idImage, data):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/imagenes/${idImage}`, data);
  }

  updateVideo(idCompany, idVideo, data):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/videos/${idVideo}`, data);
  }

  updateFile(idCompany, idFile, data):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/archivos/${idFile}`, data);
  }

  deleteImage(idCompany, idImage):Observable<any>{
    return this.httpClient.delete(this.url+`/${idCompany}/eliminarImagen/${idImage}`);
  }

  deleteVideo(idCompany, idVideo):Observable<any>{
    return this.httpClient.delete(this.url+`/${idCompany}/eliminarVideo/${idVideo}`);
  }

  deleteFile(idCompany, idFile):Observable<any>{
    return this.httpClient.delete(this.url+`/${idCompany}/eliminarArchivo/${idFile}`);
  }

  // Categorías

  getCategories(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}/categorias`)
  }

  addCategory(id, nombre):Observable<any>{
    return this.httpClient.post(this.url+`/${id}/nuevaCategoria`, {nombre});
  }
  
  deleteCategory(idCompany, idCategory):Observable<any>{
    return this.httpClient.delete(this.url+`/${idCompany}/eliminarCategoria/${idCategory}`);
  }

  // Productos

  addProduct(idCompany, data):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/nuevoProducto`, data);
  }

  getProducts(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}/productos`);
  }

  updateProduct(idCompany, idProduct, data):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/productos/${idProduct}`, data);
  }

  deleteProduct(idCompany, idProduct):Observable<any>{
    return this.httpClient.delete(this.url+`/${idCompany}/eliminarProducto/${idProduct}`);
  }

  //Paginas

  getPages(id):Observable<any>{
    return this.httpClient.get(this.url+`/${id}/paginas`);
  }

  getPage(idCompany, idPage):Observable<any>{
    return this.httpClient.get(this.url+`/${idCompany}/paginas/${idPage}`);
  }
  
  addPage(id, data):Observable<any>{
    return this.httpClient.post(this.url+`/${id}/nuevaPagina`, data);
  }

  deletePage(idCompany, idPage):Observable<any>{
    return this.httpClient.delete(this.url+`/${idCompany}/eliminarPagina/${idPage}`);
  }

  updatePage(idCompany, idPage, data):Observable<any>{
    return this.httpClient.post(this.url+`/${idCompany}/paginas/${idPage}`, data);
  }
}
