import { Component, OnInit, ReflectiveKey } from '@angular/core';
import { Reclamo } from 'src/app/models/reclamo.model';
import { Cliente } from 'src/app/models/cliente.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {

  filtro: String="";
  reclamos: Reclamo [] = [];
  tiporeclamo:TipoReclamo[]=[];
  clientes:Cliente[]=[];

  reclamo: Reclamo = {
    idReclamo:0,
    descripcion:"",
    estado:1,
    fechaCompra:new Date(),
      cliente:{
        idCliente:-1,
      },
      tipoReclamo:{
        idTipoReclamo:-1,
      }

  };    

  formsRegistra = new FormGroup({
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    validaTipoReclamo: new FormControl('', [Validators.min(1)]),
    validaCliente: new FormControl('', [Validators.min(1)]),
});

  formsActualiza = new FormGroup({
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    validaTipoReclamo: new FormControl('', [Validators.min(1)]),
    validaCliente: new FormControl('', [Validators.min(1)]),
});

  submitted = false;

  constructor(private tipoReclamoService : TipoReclamoService, private reclamoService : ReclamoService, private  clienteService : ClienteService) { 
    
    this.cargaCliente();
    this.cargaTipoReclamo();
    
  }

  cargaCliente(){
    this.clienteService.listaCliente().subscribe(response=>{
      this.clientes=response;
    })};

  cargaTipoReclamo(){
    this.tipoReclamoService.listaTipoReclamo().subscribe(response=>{
      this.tiporeclamo=response;
    })
  }


  ngOnInit(): void {
  }


  consulta(){
    
    this.reclamoService.consultaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.reclamos = x

    );
}

  actualizaEstado(aux : Reclamo){
    aux.estado = aux.estado == 0? 1 :0;
    this.reclamoService.actualizaReclamo(aux).subscribe();
}

  registra(){
    this.submitted = true;
        if (this.formsRegistra.invalid){
         return;
          }

    this.submitted = false;
    this.reclamoService.registraReclamo(this.reclamo).subscribe(
        (x) => {
        alert(x.mensaje);
        this.consulta();
        });

  }

  buscar(aux : Reclamo){
    this.reclamo = aux;
    this.clienteService.listaCliente().subscribe(
      response =>  this.clientes = response);
    this.tipoReclamoService.listaTipoReclamo().subscribe(
      response =>  this.tiporeclamo = response);
    
  }

  actualiza(){
    this.submitted = true;
        if (this.formsRegistra.invalid){
         return;
          }

    this.submitted = false;     
    this.reclamoService.actualizaReclamo(this.reclamo).subscribe(
        (x) => {
        alert(x.mensaje);
        this.consulta();
        });

  }

  elimina(aux :Reclamo){
    this.reclamoService.eliminaReclamo(aux.idReclamo).subscribe(
      (x) => {
        alert(x.mensaje);
        this.reclamoService.consultaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.reclamos = x
        );
    });
    
  }

 

}
