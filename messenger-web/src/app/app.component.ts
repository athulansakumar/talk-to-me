import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie';
import {SwPush, SwUpdate} from "@angular/service-worker";

import { ChatService } from './service/chat.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    loggedInUser:string;
  constructor(private cookieService:CookieService, private swPush: SwPush, private chatService:ChatService){}

  ngOnInit(){
      this.swPush.requestSubscription({
          serverPublicKey: environment.publicKey
      }).then(sub => {
          console.log("subscribtion",sub);
          this.chatService.savePushSubscription(sub);
      }).catch(err => console.error("Could not subscribe to notifications"));
  }

  onLoginEvent(isLoggedIn:boolean){
      if(isLoggedIn){
          this.loggedInUser = this.cookieService.get('userName');
      }else{
          this.loggedInUser = '';
      }
  }
}
