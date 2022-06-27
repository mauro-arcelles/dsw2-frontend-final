import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUsuario } from '../interfaces/login-usuario';
import { TokenService } from '../token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  loginUsuario: LoginUsuario = {};
  roles: string[] = [];

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loading = true;
    this.authService.login(this.loginUsuario).subscribe(
      (data: any) => {
        this.loading = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.login);
        this.tokenService.setUserNameComplete(data.nombreCompleto);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setUserId(data.idUsuario);
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      (err: any) => {
        this.loading = false;
        console.log(err);
        if (err.status == 401) {
          Swal.fire({
            icon: 'error',
            text: 'Usuario y/o contraseña incorrectos',
          })
        }
      }
    );
  }

}
