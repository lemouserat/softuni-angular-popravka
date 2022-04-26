import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    //console.log(route, state);
    return this.authService.isLoggedIn$.pipe(take(1), map(isLoggedIn => {
      //s take v momenta v koito se razbere segashnata stoinost shte se mapne requesta i syotvetno ako e lognat moje ako ne - kym logina
      if (isLoggedIn) {
        return true;
      }

      return this.router.createUrlTree(['/user/login'], {
        //navigirai kym login
        queryParams: {
          'redirect-to': '/' + route.url.map(f => f.path).join('/')
        } // taka shte ni redeirektne kym stranicata, koqto sme iskali da otvorim predi da se lognem
      });
    }))
  }

}
