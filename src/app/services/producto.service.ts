import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrlUtil = environment.API_ENDPOINT+ 'util';
const baseUrlProducto = environment.API_ENDPOINT+ 'producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }


}


