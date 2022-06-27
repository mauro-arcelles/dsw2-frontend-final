import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { environment } from '../../environments/environment';

const baseUrlUtil = environment.API_ENDPOINT + 'reclamo';

@Injectable({
  providedIn: 'root'
})
export class ReclamoService {

  constructor(private http:HttpClient) {   }

  insertaReclamo(data:Reclamo): Observable<any> {
    return this.http.post(baseUrlUtil,data)

  }

  listaReclamoParametros(descripcion:string, estado:number, fecCom1:string, fecCom2:string, TipoReclamo:number,Cliente:number):Observable<any> {
    const params = new HttpParams().set("descripcion", descripcion).set("estado", estado).set("fecCom1", fecCom1).set("fecCom2", fecCom2).set("idTipoReclamo", TipoReclamo).set("idCliente", Cliente);
    return this.http.get<any>(baseUrlUtil + "/listaReclamoParametros", {params});

}

  consultaReclamo(filtro : String) : Observable<Reclamo[]>{
    return this.http.get<Reclamo[]>(baseUrlUtil + "/listaReclamoPorDescripcion/" + filtro);
  }

  registraReclamo(aux: Reclamo) : Observable<any>{
    return this.http.post(baseUrlUtil + "/crudRegistraReclamo", aux);
  }

  actualizaReclamo(aux: Reclamo) : Observable<any>{
    return this.http.put(baseUrlUtil + "/crudActualizaReclamo", aux);
  }

  eliminaReclamo(id: any) : Observable<any>{
    return this.http.delete(baseUrlUtil + "/crudEliminaReclamo/" + id)
  }
}
