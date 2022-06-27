import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(
                catchError(e => {
                    if (e.status === 401 || e.status === 403) {
                        this._tokenService.logOut();
                        window.location.href = '/login';
                    }
                    return throwError(e);
                })
            );
    }
}
