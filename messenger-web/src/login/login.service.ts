import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient, private cookieService:CookieService){}

  login(user:any):Observable<any>{
      return this.http.post('/api/login',user,{observe: 'response'}).pipe(map((res:HttpResponse<any>) => {
          let cookie = res.headers.get('x-auth');
          console.log(cookie);
          this.cookieService.put('x-auth',cookie);
          this.cookieService.put('userName',user.username);
          return res.body;
      }));
  }
}
