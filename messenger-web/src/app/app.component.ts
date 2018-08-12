import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    loggedInUser:string;
  constructor(private cookieService:CookieService){}

  onLoginEvent(isLoggedIn:boolean){
      if(isLoggedIn){
          this.loggedInUser = this.cookieService.get('userName');
      }else{
          this.loggedInUser = '';
      }
  }
}
