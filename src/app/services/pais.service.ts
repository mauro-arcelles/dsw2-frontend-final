import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';
import { AppSettings } from '../app.settings';
import { environment } from '../../environments/environment';

const baseUrlUtil = environment.API_ENDPOINT+ '/util';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http:HttpClient) { }


  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>("http://localhost:8090/url/util/listaPais");
  }
}

