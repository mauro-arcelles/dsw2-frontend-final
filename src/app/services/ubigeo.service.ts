import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubigeo } from '../models/ubigeo.model';
import { AppSettings } from '../app.settings';
import { environment } from '../../environments/environment';
import { TokenService } from '../auth/token.service';

const baseUrlUtil = environment.API_ENDPOINT+ 'util';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http:HttpClient,
              private _tokenService: TokenService) { }


  listarDepartamento(): Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaDepartamentos", {headers: this._tokenService.agregarAuthorizationHeader()});
  }

  listaProvincias(paramDep:any): Observable<string[]>{
    return this.http.get<string[]>(baseUrlUtil+"/listaProvincias/"+paramDep, {headers: this._tokenService.agregarAuthorizationHeader()});
  }

  listaDistritos(paramDep:any,paramProv:any): Observable<Ubigeo[]>{
    return this.http.get<Ubigeo[]>(baseUrlUtil+"/listaDistritos/"+paramDep+"/"+paramProv, {headers: this._tokenService.agregarAuthorizationHeader()});
  }


}
