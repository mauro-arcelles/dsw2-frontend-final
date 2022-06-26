import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-consulta-marca',
  templateUrl: './consulta-marca.component.html',
  styleUrls: ['./consulta-marca.component.css']
})
export class ConsultaMarcaComponent implements OnInit {

  //Ng model
  nombre:string="";
  descripcion:string="";
  selPais:number = -1;
  estado:boolean = true;
  fecInicio:string = ""; 
  fecFin:string = "";

  //Ubigeo
  pais: Pais[] = [];

  //Grila
  marcas: Marca[] = [];


  constructor(private paisService: PaisService, private marcaService:MarcaService) {

    paisService.listaPais().subscribe(
      (x) => this.pais = x
    );
    this.selPais = -1;

   }

   consultaMarca(){
    console.log("fecInicio >>>" + this.fecInicio);
    console.log("fecFin >>>" + this.fecFin);

    this.marcaService.listaMarcaPorParametros(this.nombre, this.descripcion,this.selPais, this.estado?1:0, this.fecInicio, this.fecFin ).subscribe(
        (x) => {
          this.marcas = x.data;
          alert(x.mensaje);
        }
    );

  }



  ngOnInit(): void {
  }

  


}