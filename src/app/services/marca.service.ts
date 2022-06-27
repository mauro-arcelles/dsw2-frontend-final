import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';
import { environment } from '../../environments/environment';
import { TokenService } from '../auth/token.service';

const baseUrlUtil = environment.API_ENDPOINT + 'util';
const baseUrlMarca = environment.API_ENDPOINT + 'marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  constructor(private http: HttpClient,
    private _tokenService: TokenService) { }

  insertaMarca(data: Marca): Observable<any> {
    return this.http.post(baseUrlMarca, data); // consultar baseUrlMarca o baseUrlUtil o baseUrl
  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlUtil + "/listaMarca", { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  listaMarcaPorParametros(nombre: string, descripcion: string, idPais: number, estado: number, fechaInicio: string, fechaFin: string): Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("descripcion", descripcion).set("idPais", idPais).set("estado", estado).set("fechaInicio", fechaInicio).set("fechaFin", fechaFin);
    return this.http.get<any>(baseUrlMarca + "/listaMarcaPorParametros", { params, headers: this._tokenService.agregarAuthorizationHeader() });
  }

  listaMarcaPorNombreLike(filtro: string): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca + "/crudMarca/listaMarcaPorNombreLike/" + filtro, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  registrarMarca(obj: Marca): Observable<any> {
    return this.http.post(baseUrlMarca + "/crudMarca/registrarMarca", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  actualizarMarca(obj: Marca): Observable<any> {
    return this.http.put(baseUrlMarca + "/crudMarca/actualizaMarca", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  eliminarMarca(idMarca: any): Observable<any> {
    return this.http.delete(baseUrlMarca + "/crudMarca/eliminaMarca/" + idMarca, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

}