import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const NAME_KEY = 'AuthName';
const USER_ID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  public setUserId(name: any): void {
    window.localStorage.removeItem(USER_ID_KEY);
    window.localStorage.setItem(USER_ID_KEY, name);
  }

  public getUserId(): any {
    return localStorage.getItem(USER_ID_KEY);
  }


  public setUserNameComplete(name: string): void {
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.setItem(NAME_KEY, name);
  }

  public getUserNameComplete(): any {
    return localStorage.getItem(NAME_KEY);
  }

  public setUserName(userName: string): void {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): any {
    return localStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.localStorage.removeItem(AUTHORITIES_KEY);
    window.localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(localStorage.getItem(AUTHORITIES_KEY) || '{}').forEach(
        (authority: any) => {
          this.roles.push(authority.authority);
        }
      );
    }
    return this.roles;
  }

  public logOut(): void {
    window.localStorage.clear();
  }

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (token) return true;
    return false;
  }
}
