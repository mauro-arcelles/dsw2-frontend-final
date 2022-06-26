import { Pais } from './../../models/pais.model';
import { PaisService } from './../../services/pais.service';
import { Sede } from './../../models/sede.model';
import { SedeService } from './../../services/sede.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  sedePorActulizar: Sede = new Sede();

  sedes: Sede[] = [];

  paises: Pais[] = [];

  submitted: boolean = false;

  formRegistraActualiza = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10)]),
    codigoPostal: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
    pais: new FormControl(-1, [Validators.min(1)])
  });

  constructor(private sedeService: SedeService, private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.listaPais().subscribe(data => {
      this.paises = data;
    })
  }


  registrar(){
    this.submitted = true;
    if(this.formRegistraActualiza.invalid) return;
    const nuevaSede: Sede = new Sede();
    nuevaSede.nombre = this.formRegistraActualiza.controls['nombre'].value;
    nuevaSede.direccion = this.formRegistraActualiza.controls['direccion'].value;
    nuevaSede.codigoPostal = this.formRegistraActualiza.controls['codigoPostal'].value;
    const pais = this.paises.filter((pais) => {
      if(pais.idPais == this.formRegistraActualiza.controls['pais'].value){
        return true;
      }else{
        return false;
      }
    });
    nuevaSede.pais = pais[0];
    this.sedeService.registraSedeCrud(nuevaSede).subscribe((data: any) => {
      Swal.fire({
        title: 'Hecho',
        text: data.mensaje,
        icon: 'success'
      });
      this.listarSedes();
      document.getElementById('cerrarModal')?.click();
      this.limpiarForm();
    },
    (err) => {
      Swal.fire({
        title: 'Error',
        text: err,
        icon: 'error'
      });
    }
    );
  }

  listarSedes(){
    this.sedeService.listarSedes().subscribe((data: any) => {
      this.sedes = data;
    });
  }

  buscar(e: any){
    let valor: string = e.target.value;
    if(valor == ''){
      this.sedeService.listarSedes().subscribe((data: any) => {
        this.sedes = data;
      })
    }else{
      if(valor != null){
        this.sedeService.listaSedePorNombreLike(valor).subscribe((data: any) => {
          this.sedes = data;
        });
      }
    }
  }

  actualizarModal(sede: Sede){
    this.formRegistraActualiza.controls['nombre'].setValue(sede.nombre);
    this.formRegistraActualiza.controls['direccion'].setValue(sede.direccion);
    this.formRegistraActualiza.controls['codigoPostal'].setValue(sede.codigoPostal);
    this.formRegistraActualiza.controls['pais'].setValue(sede.pais?.idPais);
    this.sedePorActulizar = sede;
  }

  actualizar(){
    this.submitted = true;
    if(this.formRegistraActualiza.invalid) return;
    
    let sedeTemporal: Sede = this.sedePorActulizar;
    sedeTemporal.nombre = this.formRegistraActualiza.controls['nombre'].value;
    sedeTemporal.direccion = this.formRegistraActualiza.controls['direccion'].value;
    sedeTemporal.codigoPostal = this.formRegistraActualiza.controls['codigoPostal'].value;
    const pais = this.paises.filter((pais) => {
      if(pais.idPais == this.formRegistraActualiza.controls['pais'].value){
        return true;
      }else{
        return false;
      }
    });
    sedeTemporal.pais = pais[0];
    this.sedeService.actualizarSede(sedeTemporal).subscribe((data: any) => {
      Swal.fire({
        title: 'Hecho',
        text: data.mensaje,
        icon: 'success'
      });
      this.listarSedes();
      document.getElementById('cerrarModal2')?.click();
      this.limpiarForm();
    },
    (err) => {
      Swal.fire({
        title: 'Error',
        text: err,
        icon: 'error'
      });
    }
    );
  }

  eliminar(id: any){
    Swal.fire({
      title: '¿Está seguro de eliminar esta sede?',
      text: "Una vez hecho no se podrá volver hacia atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sedeService.eliminarSede(id).subscribe((resp: any) => {{
          this.listarSedes();
          Swal.fire({
            title: 'Información',
            text: resp.mensaje,
            icon: 'info'
          });
        }});
      }
    })
  }

  limpiarForm(){
    this.formRegistraActualiza.controls['nombre'].setValue('');
    this.formRegistraActualiza.controls['direccion'].setValue('');
    this.formRegistraActualiza.controls['codigoPostal'].setValue('');
    this.formRegistraActualiza.controls['pais'].setValue(-1);
    this.submitted = false;
  }

}
