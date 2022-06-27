import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { environment } from '../../environments/environment';
import { TokenService } from '../auth/token.service';


const baseUrl = environment.API_ENDPOINT + 'proveedor';

@Injectable({
  providedIn: 'root'
}
)
export class ProveedorService {

  constructor(private http: HttpClient,
    private _tokenService: TokenService) { }


  registraProveedor(obj: Proveedor): Observable<any> {
    return this.http.post(baseUrl + "/registraProveedor", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  listaProveedor(razonsocial: string, ruc: string, direccion: string, estado: number): Observable<any> {
    const params = new HttpParams().set("razonsocial", razonsocial).set("ruc", ruc).set("direccion", direccion).set("estado", estado);
    return this.http.get<any>(baseUrl + "/listaProveedorConParametros", { params, headers: this._tokenService.agregarAuthorizationHeader() });
  }

  listaCrudProveedor(filtro: string): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(baseUrl + "/listaProveedorPorRazonLike/" + filtro, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  registraCrudProveedor(obj: Proveedor): Observable<any> {
    return this.http.post(baseUrl + "/registraProveedor", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }


  actualizaCrudProveedor(obj: Proveedor): Observable<any> {
    return this.http.put(baseUrl + "/actualizaProveedor", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  eliminaProveedor(id: any): Observable<any> {
    return this.http.delete(baseUrl + "/eliminaProveedor/" + id, { headers: this._tokenService.agregarAuthorizationHeader() });
  }


}