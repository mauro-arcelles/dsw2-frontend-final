import { Component, OnInit } from '@angular/core';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  filtro: string = "";

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  clienteInicial: Cliente = {
    idCliente: 0,
    nombres: "",
    apellidos: "",
    correo: "",
    direccion: "",
    dni: "",
    estado: -1,
    ubigeo: {
      idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "-1",
    }
  };

  cliente: Cliente = { ...this.clienteInicial };

  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    validaCorreo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}')]),
    validaDireccion: new FormControl('', [Validators.required]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaFechaNacimiento: new FormControl('', [Validators.required]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaApellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaDni: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    validaCorreo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}')]),
    validaDireccion: new FormControl('', [Validators.required]),
    validaDepartamento: new FormControl('', [Validators.min(1)]),
    validaFechaNacimiento: new FormControl('', [Validators.required]),
    validaProvincia: new FormControl('', [Validators.min(1)]),
    validaDistrito: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  submitted = false;

  constructor(private clienteService: ClienteService, private ubigeoService: UbigeoService) {
    this.ubigeoService.listarDepartamento().subscribe(
      response => this.departamentos = response
    );
  }

  cargaProvincia() {
    this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );

    this.cliente!.ubigeo!.provincia = "-1";
    this.distritos = [];
    this.cliente!.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );

    this.cliente!.ubigeo!.idUbigeo = -1;
  }

  ngOnInit(): void {
  };

  consulta() {
    this.clienteService.listaClienteCrud(this.filtro == "" ? "todos" : this.filtro).subscribe(
      (x) => this.clientes = x
    );
  }

  registra() {
    this.submitted = true;

    if (this.formsRegistra.invalid) {
      return;
    }

    this.submitted = false;

    this.clienteService.registraCliente(this.cliente).subscribe(
      (x) => {
        alert(x.mensaje);
        this.clienteService.listaClienteCrud(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.clientes = x
        );
        (<HTMLElement>document.querySelector('#btn_reg_cerrar')).click();
      }
    );

    this.distritos = [];
    this.provincias = [];

    this.cliente = this.clienteInicial;

  }

  buscar(aux: Cliente) {
    this.cliente = {...aux};

    this.ubigeoService.listaProvincias(this.cliente.ubigeo?.departamento).subscribe(
      response => this.provincias = response
    );

    this.ubigeoService.listaDistritos(this.cliente.ubigeo?.departamento, this.cliente.ubigeo?.provincia).subscribe(
      response => this.distritos = response
    );

  }


  actualiza() {
    this.submitted = true;

    if (this.formsActualiza.invalid) {
      return;
    }

    this.submitted = false;

    this.clienteService.actualizaCliente(this.cliente).subscribe(
      (x) => {
        alert(x.mensaje);
        this.clienteService.listaClienteCrud(this.filtro == "" ? "todos" : this.filtro).subscribe(
          (x) => this.clientes = x
        );
        (<HTMLElement>document.querySelector('#btn_act_cerrar')).click();
      }
    );

    this.distritos = [];
    this.provincias = [];

    this.cliente = { ...this.clienteInicial };
  }

  elimina(aux: Cliente) {
    this.cliente = {...aux};

    this.clienteService.eliminaCliente(aux.idCliente).subscribe(x => {
      alert(x.mensaje);
      this.clienteService.listaClienteCrud(this.filtro == "" ? "todos" : this.filtro).subscribe(
        (x) => this.clientes = x
      );
    });

  }

  limpiarForm() {
    this.cliente = { ...this.clienteInicial };
  }


}



