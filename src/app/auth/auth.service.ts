import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtDTO } from './interfaces/jwt-dto';
import { LoginUsuario } from './interfaces/login-usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const authURL = environment.API_ENDPOINT + 'auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(authURL + 'login', loginUsuario);
  }
}
