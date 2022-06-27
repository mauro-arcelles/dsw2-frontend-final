import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';
import { TokenService } from '../auth/token.service';

const baseUrlUtil = environment.API_ENDPOINT + 'util/listaCliente';
const baseUrlCliente = environment.API_ENDPOINT + 'cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  constructor(private http: HttpClient,
    private _tokenService: TokenService) { }

  listaCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrlUtil, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  agregarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(baseUrlCliente, cliente, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  listaClienteParametros(nombre: string, dni: string, idUbigeo: number, estado: number): Observable<any> {
    const params = new HttpParams()
      .set("nombre", nombre)
      .set("dni", dni)
      .set("idUbigeo", idUbigeo)
      .set("estado", estado.toString());

    return this.http.get<any>(baseUrlCliente + "/listaPorParametros", { params, headers: this._tokenService.agregarAuthorizationHeader() });

  }

  listaClienteCrud(filtro: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrlCliente + "/listaClientePorNombreLike/" + filtro, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  registraCliente(obj: Cliente): Observable<any> {
    return this.http.post(baseUrlCliente + "/registraCliente", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  actualizaCliente(obj: Cliente): Observable<any> {
    return this.http.put(baseUrlCliente + "/actualizaCliente", obj, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

  eliminaCliente(id: any): Observable<any> {
    return this.http.delete(baseUrlCliente + "/eliminaCliente/" + id, { headers: this._tokenService.agregarAuthorizationHeader() });
  }

}
