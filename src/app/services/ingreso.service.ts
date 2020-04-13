import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ingreso}from '../models/ingreso.model'


const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

//----------------------------------------------------------------
@Injectable({
  providedIn: 'root'
})
//----------------------------------------------------------------

export class IngresoService {
  ingresoURL = 'http://localhost:8080/ingreso';
  constructor(private httpClient: HttpClient) { }


//----------------------------------------------------------------
  public lista(): Observable<Ingreso[]> {
    return this.httpClient.get<Ingreso[]>(this.ingresoURL, cabecera);
  }

//----------------------------------------------------------------
public detalle(id: number): Observable<Ingreso> {
  console.log("id que se envia al servicio de ingreso es "+this.ingresoURL+`/${id}`);
  return this.httpClient.get<Ingreso>(this.ingresoURL+`/${id}`, cabecera);
}
//----------------------------------------------------------------

public crear(ingreso: Ingreso): Observable<any> {
  return this.httpClient.post<any>(this.ingresoURL, ingreso, cabecera);
}
//----------------------------------------------------------------
public editar(ingreso: Ingreso, id: number): Observable<any> {
  return this.httpClient.put<any>(this.ingresoURL+`/${id}`, ingreso, cabecera);
}

//----------------------------------------------------------------
public borrar(id: number): Observable<any> {
  return this.httpClient.delete<any>(this.ingresoURL + `/${id}`, cabecera);
}


}

//----------------------------------------------------------------




