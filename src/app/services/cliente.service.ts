import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';
import { environment } from '../../environments/environment';

const baseUrlUtil = "http://localhost:8090/url/util/listaCliente";
const baseUrlCliente = environment.API_ENDPOINT + 'cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  constructor(private http: HttpClient) { }

  listaCliente(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrlUtil);
  }

  agregarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(baseUrlCliente, cliente);
  }

  listaClienteParametros(nombre: string, dni: string, idUbigeo: number, estado: number): Observable<any> {
    const params = new HttpParams()
      .set("nombre", nombre)
      .set("dni", dni)
      .set("idUbigeo", idUbigeo)
      .set("estado", estado.toString());

    return this.http.get<any>(baseUrlCliente + "/listaPorParametros", { params });

  }

  listaClienteCrud(filtro: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(baseUrlCliente + "/listaClientePorNombreLike/" + filtro);
  }

  registraCliente(obj: Cliente): Observable<any> {
    return this.http.post(baseUrlCliente + "/registraCliente", obj);
  }

  actualizaCliente(obj: Cliente): Observable<any> {
    return this.http.put(baseUrlCliente + "/actualizaCliente", obj);
  }

  eliminaCliente(id: any): Observable<any> {
    return this.http.delete(baseUrlCliente + "/eliminaCliente/" + id);
  }

}
