import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  //Para la Grilla
   proveedores: Proveedor [] = [];
   filtro: string ="";
 
   //Para el ubigeo
   departamentos: string[] = [];;
   provincias: string[] = [];;
   distritos: Ubigeo[] = [];;

   
  //Json para registrar o actualizar
  proveedor: Proveedor = { 
    idProveedor:0,
    razonsocial:"",
    ruc:"",
    celular:"",
    contacto:"",
    estado:1,
    ubigeo:{
      idUbigeo: -1,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
    }
  };





//Declaracion de validaciones
formsRegistra = new FormGroup({
  validarazonsocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{7,100}')]),
  validaruc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validacelular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
  validacontacto: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{1,100}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),



});

formsActualiza = new FormGroup({
  
  validarazonsocial: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{7,100}')]),
  validaruc: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
  validacelular: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
  validacontacto: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{1,100}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
  validaestado: new FormControl('', [Validators.min(0)]),


});



//para verificar que e pulsó el boton
submitted = false;


  constructor(private proveedorService:ProveedorService, private ubigeoService:UbigeoService) {
      this.ubigeoService.listarDepartamento().subscribe(
          response => this.departamentos = response
      );            
  }

  cargaProvincia(){
      this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
        response =>  this.provincias= response
      );

      this.proveedor!.ubigeo!.provincia = "-1";
      this.distritos = [];
      this.proveedor!.ubigeo!.idUbigeo = -1;

  }

  cargaDistrito(){
    this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
      response =>  this.distritos= response
     );

     this.proveedor!.ubigeo!.idUbigeo = -1;
   }

  ngOnInit(): void {
  }

  consulta(){
      this.proveedorService.listaCrudProveedor(this.filtro==""?"todos":this.filtro).subscribe(
            (x) => this.proveedores = x
      );
  }

  actualizaEstado(aux : Proveedor){
        aux.estado = aux.estado == 0? 1 :0;
        this.proveedorService.actualizaCrudProveedor(aux).subscribe();
  }





registra(){
  this.submitted = true;

   //finaliza el método si hay un error
   if (this.formsRegistra.invalid){
    return;
   }   
   this.submitted = false;

   this.proveedorService.registraCrudProveedor(this.proveedor).subscribe(
         (x) => {
           document.getElementById("btn_reg_cerrar")?.click();
           Swal.fire('Mensaje', x.mensaje,'success');
           this.proveedorService.listaCrudProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                   (x) => this.proveedores = x
           );

         } 
   );





        //limpiar los comobobox
        this.distritos = [];
        this.provincias = [];

        //limpiar los componentes del formulario a través de los ngModel

        this.proveedor = { 
              idProveedor:0,
              razonsocial:"",
              ruc:"",        
              celular:"",
              contacto:"",
              estado:1,
              ubigeo:{
                idUbigeo: -1,
                departamento:"-1",
                provincia:"-1",
                distrito:"-1",
              }
        }
  }

  buscar(aux :Proveedor){
        this.proveedor  = aux;

        this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
          response =>  this.provincias= response
        );

      this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
        response =>  this.distritos= response
      );

  }


  


    actualiza(){
  this.submitted = true;

   //finaliza el método si hay un error
   if (this.formsActualiza.invalid){
    return;
   }   
   this.submitted = false;

   this.proveedorService.actualizaCrudProveedor(this.proveedor).subscribe(
         (x) => {
           document.getElementById("btn_reg_cerrar")?.click();
           Swal.fire('Mensaje', x.mensaje,'success');
     this.proveedorService.listaCrudProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                   (x) => this.proveedores = x
           );

         } 
   );





    //limpiar los comobobox
    this.distritos = [];
    this.provincias = [];

    //limpiar los componentes del formulario a través de los ngModel

    this.proveedor = { 
          idProveedor:0,
          razonsocial:"",
          ruc:"",
          celular:"",
          contacto:"",
          estado:1,
          ubigeo:{
            idUbigeo: -1,
            departamento:"-1",
            provincia:"-1",
            distrito:"-1",
          }
    }
}




elimina(aux :Proveedor){
  Swal.fire({
        title: '¿Estás Seguro?',
        text: "¡No se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Elimínalo'
  }).then((result) => {
      if (result.isConfirmed) {
            this.proveedorService.eliminaProveedor(aux.idProveedor).subscribe(
              (x) => {
                Swal.fire('Mensaje',x.mensaje, 'success');
                this.proveedorService.listaCrudProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                        (x) => this.proveedores = x
                );
       
              } 
            );
      }
  })
}





}