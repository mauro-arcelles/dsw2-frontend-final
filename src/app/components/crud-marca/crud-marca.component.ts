import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-marca',
  templateUrl: './crud-marca.component.html',
  styleUrls: ['./crud-marca.component.css']
})
export class CrudMarcaComponent implements OnInit {

  //Para la Grilla
  marcas: Marca[] = [];
  filtro: string ="";

  //para el ubigeo
  pais: Pais[] = [];
 

  //Json para registrar o actualizar

  marcaInicial: Marca ={
		idMarca:0,
		nombre:"",
		descripcion:"",
		certificado:"",
		estado:-1,
		pais: {
			idPais:1,
			iso:"",
			nombre:"",
		}
  };

  marca : Marca = {...this.marcaInicial};

  

  //Declaracion de validaciones
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,15}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaCertificado: new FormControl('', [Validators.required,Validators.pattern('[A-Z0-9]{9}')]),
    validaEstado: new FormControl('', [Validators.min(1)]),
    validaPais: new FormControl('', [Validators.min(1)]),

  });

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,15}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,60}')]),
    validaCertificado: new FormControl('', [Validators.required,Validators.pattern('[A-Z0-9]{9}')]),
    validaEstado: new FormControl('', [Validators.min(0)]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });


   //para verificar que e pulsó el boton
   submitted = false;


  constructor(private paisService: PaisService, private marcaService:MarcaService) {

  
    paisService.listaPais().subscribe(
      (x) => this.pais = x
    );
    this.pais = [];
    

  }



  ngOnInit(): void {
  }

  consultaCrudMarca(){
    this.marcaService.listaMarcaPorNombreLike(this.filtro==""?"todos":this.filtro).subscribe(
                (x) => this.marcas = x
    );
  }

  actualizaEstado(aux : Marca){
    aux.estado = aux.estado == 0? 1:0;
    this.marcaService.actualizarMarca(aux).subscribe();
}  
  

  registraCrudMarca(): void{

        this.submitted = true;

        //finaliza el método si hay un error
        if (this.formsRegistra.invalid){
          return;
        }

        this.marcaService.registrarMarca(this.marca).subscribe(
          (x) => {
            this.submitted = false;
            document.getElementById("btn_reg_cerrar")?.click();
            alert(x.mensaje);
            this.marcaService.listaMarcaPorNombreLike(this.filtro==""?"todos":this.filtro).subscribe(
                    (x) => this.marcas = x
            );
            
          }
        );

        this.marca = this.marcaInicial;

        
  }

  buscarMarca(aux :Marca){
    this.marca = {...aux};
  }
  cambiarEstadoMarca(obj :Marca){
    this.marca = obj;

    if (obj.estado ==0){
      obj.estado =1;
    } else{
      obj.estado=0
    }
    
  }


  

  actualizarCrudMarca(){

    this.submitted = true;

        //finaliza el método si hay un error
        if (this.formsActualiza.invalid){
          return;
        }

    this.marcaService.actualizarMarca(this.marca).subscribe(
        //(x) => alert(x.mensaje));

      (x) => {
        this.submitted = false;
        document.getElementById("btn_act_cerrar")?.click();
        alert(x.mensaje);
        this.marcaService.listaMarcaPorNombreLike(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.marcas = x
        );
      }
    );

    this.marca = this.marcaInicial;
    
       

  }


  eliminarMarcaPorIdMarca(aux :Marca){
    this.marca = aux;

    this.marcaService.eliminarMarca(aux.idMarca).subscribe(
      (x) => {
        alert(x.mensaje);
        this.marcaService.listaMarcaPorNombreLike(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.marcas = x
        );
      }
    );
  }

}
