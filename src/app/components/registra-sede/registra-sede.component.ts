import { SedeService } from './../../services/sede.service';
import { Pais } from './../../models/pais.model';
import { PaisService } from './../../services/pais.service';
import { Sede } from './../../models/sede.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registra-sede',
  templateUrl: './registra-sede.component.html',
  styleUrls: ['./registra-sede.component.css']
})
export class RegistraSedeComponent implements OnInit {

  nuevaSede: Sede = new Sede();

  paises: Pais[] = [];

  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor(private paisService: PaisService, private sedeService: SedeService) { }

  ngOnInit(): void {
    this.cargarPaises();
  }


  agregarSede() {
    const paisRegistro = this.paises.find(pais => pais.idPais == this.nuevaSede.pais);
    this.nuevaSede.pais = paisRegistro;
    this.nuevaSede.estado = 1;
    console.log(this.nuevaSede); 
    this.sedeService.registraSede(this.nuevaSede).subscribe(resp => {
      console.log("Registro exitoso");
      alert('Se registró la sede correctamente');
      this.nuevaSede = new Sede();
    },
    err => {
      console.warn(err);
      alert('Falta rellenar algún campo del formulario: ' + err);
    });
  }

  cargarPaises() {
    this.paisService.listaPais().subscribe(
      (resp => {
        this.paises = resp;
      }),
      (err => {
        console.warn(err);
      })
    )
  }

}