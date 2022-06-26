import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';
import { environment } from '../../environments/environment';



const baseUrl = "http://localhost:8090/rest/proveedor";
const baseUrlUtil = environment.API_ENDPOINT+ '/util';
const baseUrlProveedor = environment.API_ENDPOINT+ '/proveedor';


@Injectable({

  providedIn: 'root'}




)


export class ProveedorService {



  constructor(private http:HttpClient) { }
  registraProveedor(obj: Proveedor): Observable<any>{

      return this.http.post(baseUrl+ "/registraProveedor", obj);
}


listaProveedor(razonsocial:string, ruc:string, direccion:string, estado:number):Observable<any> {
  const params = new HttpParams().set("razonsocial", razonsocial).set("ruc", ruc).set("direccion", direccion).set("estado", estado);
  return this.http.get<any>(baseUrl + "/listaProveedorConParametros", {params});
}



listaCrudProveedor(filtro:string):Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(baseUrl + "/listaProveedorPorRazonLike/"+ filtro);
}

registraCrudProveedor(obj: Proveedor): Observable<any>{
    return this.http.post(baseUrl+ "/registraProveedor", obj);
}


actualizaCrudProveedor(obj: Proveedor): Observable<any>{
  return this.http.put(baseUrl + "/actualizaProveedor", obj);
}

eliminaProveedor(id: any): Observable<any>{
  return this.http.delete(baseUrl + "/eliminaProveedor/" + id);
}












}