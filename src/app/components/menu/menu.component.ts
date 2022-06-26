import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
