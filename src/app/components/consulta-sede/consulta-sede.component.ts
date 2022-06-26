import { SedeService } from './../../services/sede.service';
import { PaisService } from 'src/app/services/pais.service';
import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  nombre: string = '';

  codigoPostal: string = '';

  estado: boolean = true;

  idPais: number = 0;

  paises: Pais[] = [];

  sedes: Sede[] = [];

  constructor(private paisService: PaisService, private sedeService: SedeService) { }

  ngOnInit(): void {
    this.paisService.listaPais().subscribe(data => {
      this.paises = data;
    })
  }

  listaSedePorFiltro(){
    this.sedeService.listarSedePorFiltro(this.nombre, this.codigoPostal, (this.idPais == 0 ? -1 : this.idPais), (this.estado == true) ? 1 : 0)
    .subscribe((data: any) => {
      this.sedes = data.data;
    },
    err => {
      console.warn(err);
    }
    )
  }


}
