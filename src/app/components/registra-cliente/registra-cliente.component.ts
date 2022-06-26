import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-registra-cliente',
  templateUrl: './registra-cliente.component.html',
  styleUrls: ['./registra-cliente.component.css']
})
export class RegistraClienteComponent implements OnInit {

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  departamento: any = -1;
  provincia: any = -1;

  cliente: Cliente = {
    ubigeo: {
      idUbigeo: -1,
    }
  };

  constructor(private _ubigeoService: UbigeoService,
    private _clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listarDepartamento();
  }

  listarDepartamento() {
    this._ubigeoService.listarDepartamento().subscribe(data => {
      this.departamentos = data;
    }, err => {
      alert(JSON.stringify(err));
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

  agregarCliente() {
    this._clienteService.agregarCliente(this.cliente).subscribe(data => {
      alert(data.mensaje);
    }, err => {
      alert(err);
    });
  }


}
