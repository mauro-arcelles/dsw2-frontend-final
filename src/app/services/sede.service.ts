import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';
import { environment } from '../../environments/environment';

const baseUrlUtil = environment.API_ENDPOINT+ 'util';
const baseUrlSede = environment.API_ENDPOINT+ 'sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

  listarSedes(){
    return this.http.get("http://localhost:8090/url/sede");
  }

 registraSede(sede: Sede){
   return this.http.post("http://localhost:8090/url/sede", sede);
 }

 listarSedePorFiltro(nombre: string, codigoPostal: string, idPais: number, estado: number){
   const httpParams = new HttpParams().set('nombre', nombre).set('codigoPostal', codigoPostal).set('idPais', idPais).set('estado', estado);
   return this.http.get('http://localhost:8090/url/sede/listaPorFiltros', {params: httpParams});
 }

 listaSedePorNombreLike(nombre: string){
  return this.http.get(`http://localhost:8090/url/crudSede/listaSedePorNombreLike/${nombre}`);
 }

 eliminarSede(id: number){
  return this.http.delete(`http://localhost:8090/url/crudSede/eliminaSede/${id}`);
 }

 registraSedeCrud(sede: Sede){
  return this.http.post('http://localhost:8090/url/crudSede/registraSede', sede);
 }

 actualizarSede(sede: Sede){
  return this.http.put('http://localhost:8090/url/crudSede/actualizaSede', sede);
 }

}