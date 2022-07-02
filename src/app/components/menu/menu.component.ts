import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nombreUsuario: string = "";

  constructor(private tokenService: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUserNameComplete();
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['/auth/login']);
  }

}
