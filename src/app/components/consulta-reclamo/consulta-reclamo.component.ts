import { Component, OnInit } from '@angular/core';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { Cliente } from 'src/app/models/cliente.model';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';

@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {

  descripcion:string="";
  estado:boolean=true;
  fecCom1:string="";
  fecCom2:string="";
  selCliente:number= -1;
  selTipoReclamo:number= -1;

  reclamos: Reclamo[]=[];

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

  consultaReclamo(){
    console.log("fecCom1 >>>" + this.fecCom1);
    console.log("fecCom2 >>>" + this.fecCom2);
    this.reclamoService.listaReclamoParametros(this.descripcion, this.estado?1:0, this.fecCom1, this.fecCom2, this.selCliente, this.selTipoReclamo).subscribe(
      (x)=> {
        this.reclamos = x.lista;
        alert(x.mensaje);
      }
    );
  }

  cargarCliente(){
    this.clienteService.listaCliente().subscribe(
      (x) => this.cliente = x
    );
      this.selCliente = -1;

  }

  ngOnInit(): void {
  }

}
