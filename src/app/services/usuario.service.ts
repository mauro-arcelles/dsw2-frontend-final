import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrlUtil = environment.API_ENDPOINT+ 'util';
const baseUrlUsuario= environment.API_ENDPOINT+ 'usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }
}
