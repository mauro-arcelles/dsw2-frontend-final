import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginUsuario } from '../interfaces/login-usuario';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario = {};
  roles: string[] = [];
  errMsj!: string;

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
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.login);
        this.tokenService.setUserNameComplete(data.nombreCompleto);
        this.tokenService.setAuthorities(data.authorities);
        this.tokenService.setUserId(data.idUsuario);
        this.roles = data.authorities;
        this.router.navigate(['/']);

        console.log("onLogin() >> token >>> " + this.tokenService.getToken());
        console.log("onLogin() >> setUserName >>> " + this.tokenService.getUserName());
        console.log("onLogin() >> setUserNameComplete >>> " + this.tokenService.getUserNameComplete());
        console.log("onLogin() >> idUsuario >>> " + this.tokenService.getUserId());

      },
      (err: any) => {
        this.loading = false;
        this.isLogged = false;
        this.errMsj = err.message;
        console.log(err);
        if (err.status == 401) {
          alert("Usuario no Autorizado");
        }
      }
    );
  }

}
