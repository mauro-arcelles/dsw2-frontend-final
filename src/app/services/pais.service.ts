import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';
import { environment } from '../../environments/environment';
import { TokenService } from '../auth/token.service';

const baseUrlUtil = environment.API_ENDPOINT+ 'util';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http:HttpClient,
    private _tokenService: TokenService) { }


  listaPais():Observable<Pais[]>{
    return this.http.get<Pais[]>(baseUrlUtil + '/listaPais', {headers: this._tokenService.agregarAuthorizationHeader()});
  }
}

