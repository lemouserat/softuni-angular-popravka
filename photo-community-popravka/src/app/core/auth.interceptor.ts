import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUser } from './interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.url.endsWith('login') || event.url.endsWith('register')) {
            const newlyLoggedUser: IUser = event.body;
            this.authService.handleLogin(newlyLoggedUser);
          } else if (event.url.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      },
      //tapa izobshto ne se izvikva ako ima error
     ));
  }
}
