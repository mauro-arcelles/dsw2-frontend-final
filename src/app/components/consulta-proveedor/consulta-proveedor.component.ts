import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';




@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {

 

//Ng model
razonsocial:string="";
contacto:string="";
telefono:string="";
estado:boolean = true;

  //Ubigeo
  departamentos: string[]  = [];
  provincias: string[]  = [];
  distritos: Ubigeo[]  = [];

  
//Grila
proveedor: Proveedor[] = [];

constructor(private ubigeoService: UbigeoService, private proveedorService:ProveedorService) { 

  ubigeoService.listarDepartamento().subscribe(
      (x) => this.departamentos = x
  );

}

consultaProveedor(){
  this.proveedorService.listaProveedor(this.razonsocial, this.contacto, this.telefono, this.estado?1:0).subscribe(
        (x) => {
            this.proveedor = x.lista;
            alert(x.mensaje);
        }
  );
}





  ngOnInit(): void {
  }

}