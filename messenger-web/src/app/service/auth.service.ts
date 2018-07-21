import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private cookieService: CookieService,
            private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      if(state.url.includes('/logout')){
          console.log('--logged out --');
          this.cookieService.removeAll();
      }else if(this.cookieService.get('x-auth')){
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
