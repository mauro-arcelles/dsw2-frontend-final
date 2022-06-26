import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanLoad {

  constructor(private _router: Router,
    private _tokenService: TokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._tokenService.isAuthenticated()) {
      this._router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._tokenService.isAuthenticated()) {
      this._router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
