import { Component, OnInit } from '@angular/core';
import { RegisterUsuario } from '../interfaces/register-usuario';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  registerUsuario: RegisterUsuario = {};
  confirmPassword: string = "";

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    if (this.confirmPassword != this.registerUsuario.password){
      Swal.fire({
        icon: 'error',
        text: 'Las contraseñas no coinciden',
      })
      return;
    }
    this.loading = true;
    this.authService.register(this.registerUsuario).subscribe(
      (data: any) => {
        this.loading = false;
        if (data.estado == "0"){
          Swal.fire({
            icon: 'error',
            text: data.mensaje,
          })
        } else {
          Swal.fire({
            icon: 'success',
            text: data.mensaje,
          })
          this.router.navigate(['/auth/login']);
        }
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
        Swal.fire({
          icon: 'error',
          text: 'Hubo un problema al registrar el usuario',
        })

      }
    );
  }

}
