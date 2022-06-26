import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoReclamo } from '../models/tipo-reclamo.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = "http://localhost:8090/url/util/listaTipoReclamo";

@Injectable({
  providedIn: 'root'
})
export class TipoReclamoService {

  constructor(private htttp:HttpClient) {   }

  listaTipoReclamo():Observable<TipoReclamo[]>{
    return this.htttp.get<TipoReclamo[]>(baseUrlUtil);
  }
}
