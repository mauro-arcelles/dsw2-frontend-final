import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registra-marca',
  templateUrl: './registra-marca.component.html',
  styleUrls: ['./registra-marca.component.css']
})
export class RegistraMarcaComponent implements OnInit {

  paises: Pais[] = [];

  marcas : Marca = {
    pais: {
      idPais:-1
    }
  }

  //Declaracion de validaciones
  formsRegistra = new FormGroup({
    validaNombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,15}')]),
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaCertificado: new FormControl('', [Validators.required,Validators.pattern('[A-Z0-9]{9}')]),
    validaEstado: new FormControl('', [Validators.min(1)]),
    validaPais: new FormControl('', [Validators.min(1)]),

  });

  //para verificar que e pulsó el boton
  submitted = false;

  constructor(private paisService: PaisService, private marcaService:MarcaService) { 
    this.paisService.listaPais().subscribe(
      (x) => {
        this.paises = x;
      },
      (error) => console.log(error,'error')
    );
  }

  validarData(data:Marca) {
    return true;
  }

  inserta(){

    this.submitted = true;

        //finaliza el método si hay un error
        if (this.formsRegistra.invalid){
          return;
        }

    
    this.marcaService.insertaMarca(this.marcas).subscribe(
      Response => {
        this.submitted = false;
        this.marcas = {
          pais: {
            idPais:-1
          }
        }
        
      },
      
    );
  }

  ngOnInit(): void {
  }

}
