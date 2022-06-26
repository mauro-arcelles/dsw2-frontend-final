import { Component, OnInit } from '@angular/core';
import { Reclamo } from 'src/app/models/reclamo.model';
import { Cliente } from 'src/app/models/cliente.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {

  tiporeclamo: TipoReclamo[] = [];
  cliente: Cliente[] =[];
  reclamo: Reclamo = {
      cliente:{
        idCliente:-1
      },
      tipoReclamo:{
        idTipoReclamo:-1
      }

  };

  constructor(private tipoReclamoService : TipoReclamoService, private reclamoService : ReclamoService, private  clienteService : ClienteService) { 

    this.tipoReclamoService.listaTipoReclamo().subscribe(
      (x) => this.tiporeclamo = x)

    this.clienteService.listaCliente().subscribe(
      (x) => this.cliente = x)
  }
  

  insertaReclamo(){
    this.reclamoService.insertaReclamo(this.reclamo).subscribe(
      response => {
          alert(response.mensaje)
      },
      error =>{
          alert(error)
      }
    );
  }

  ngOnInit(): void {
  }

}
