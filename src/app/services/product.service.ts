
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { TypeProducts } from '../models/typeProducts';


//----------------------------------------------------------------
const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
//----------------------------------------------------------------
export class ProductService {

  productURL = 'http://localhost:8080/products';
  typeProductURL = 'http://localhost:8080/typeProduct';


//----------------------------------------------------------------
  constructor(private httpClient: HttpClient) { }
  public lista(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productURL, cabecera);
  }
//----------------------------------------------------------------
  public detalle(id: number): Observable<Product> {
    console.log("id que se envia al servicio de producto es "+this.productURL+`/${id}`);
    return this.httpClient.get<Product>(this.productURL+`/${id}`, cabecera);
  }
  public getProductNombre(nombre: string): Observable<Product> {
    console.log("id que se envia al servicio de producto es "+this.productURL+"/nombre"+`/${nombre}`);
    return this.httpClient.get<Product>(this.productURL+"/nombre"+`/${nombre}`, cabecera);
  }
//----------------------------------------------------------------
  public crear(producto: Product): Observable<any> {
    return this.httpClient.post<any>(this.productURL, producto, cabecera);
  }
//----------------------------------------------------------------
  public editar(producto: Product, id: number): Observable<any> {
    console.log("los valores del produycto son "+producto.type_product);
  console.log("ingreso al mentodo del servicio directamente el valor del stock es "+producto.stock);
  console.log("ingreso al mentodo del servicio directamente el valor del tipo es "+producto.type_product);
    return this.httpClient.put<any>(this.productURL+`/${id}`, producto, cabecera);
  }
//----------------------------------------------------------------
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productURL + `/${id}`, cabecera);
  }
//----------------------------------------------------------------
  public listaTypeProducts(): Observable<TypeProducts[]> {
    return this.httpClient.get<TypeProducts[]>(this.typeProductURL,cabecera);
  }
//----------------------------------------------------------------



}
