import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  //Ng model
  nombre: string = "";
  dni: string = "";
  selDepartamento: string = "-1";
  selProvincia: string = "-1";
  selDistrito: number = -1;

  departamento: any = -1;
  provincia: any = -1;
  estado: number = 1;

  //Ubigeo
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  //Grila
  clientes: Cliente[] = [];

  constructor(private _ubigeoService: UbigeoService,
    private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarDepartamento();
  }

  listarDepartamento() {
    this._ubigeoService.listarDepartamento().subscribe(data => {
      this.departamentos = data;
    }, err => {
      alert(err);
    });
  }

  listarProvincias(paramDep: any) {
    this._ubigeoService.listaProvincias(paramDep).subscribe(data => {
      this.provincias = data;
    }, err => {
      alert(err);
    });
  }

  listarDistritos(paramDep: any, paramProv: any) {
    this._ubigeoService.listaDistritos(paramDep, paramProv).subscribe(data => {
      this.distritos = data;
    }, err => {
      alert(err);
    });
  }

  listaClienteParametros() {
    this._clienteService.listaClienteParametros(this.nombre, this.dni, this.selDistrito, this.estado ? 1 : 0).subscribe(data => {
      if (!data.data) {
        return alert(data.mensaje);
      }
      // console.log(data)
      this.clientes = data.data;
    }, err => {
      alert(err);
    });
  }

}
