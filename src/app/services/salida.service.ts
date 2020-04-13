import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salida } from '../models/salida.model';



const cabecera = { headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }) };
@Injectable({
  providedIn: 'root'
})
//--




export class SalidaService {


  salidaURL = 'http://localhost:8080/salidas';

  constructor(private httpClient: HttpClient) { }

  
//----------------------------------------------------------------
  public lista(): Observable<Salida[]> {
    return this.httpClient.get<Salida[]>(this.salidaURL, cabecera);
  }

//----------------------------------------------------------------
public detalle(id: number): Observable<Salida> {
  console.log("id que se envia al servicio de ingreso es "+this.salidaURL+`/${id}`);
  return this.httpClient.get<Salida>(this.salidaURL+`/${id}`, cabecera);
}
//----------------------------------------------------------------

public crear(salida: Salida): Observable<any> {
  console.log("lo que se envia a guardar es id producto " +salida.idProductIdSalida+" y cantidad :"+salida.cantidadSalida);
  return this.httpClient.post<any>(this.salidaURL, salida, cabecera);
}
//----------------------------------------------------------------
public editar(salida: Salida, id: number): Observable<any> {
  return this.httpClient.put<any>(this.salidaURL+`/${id}`, salida, cabecera);
}

//----------------------------------------------------------------
public borrar(id: number): Observable<any> {
  return this.httpClient.delete<any>(this.salidaURL + `/${id}`, cabecera);
}

}
