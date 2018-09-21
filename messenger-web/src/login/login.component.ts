import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit{
  errorMessage:string;
  username:string;
  password:string;

  constructor(
      private service:LoginService,
      private router:Router,
      private cookieService:CookieService
  ){}

  ngOnInit(){
      if(this.cookieService.get('x-auth')){
          //validate first
          this.router.navigateByUrl('/chat');
      }
  }

  login(e:Event){
      if(e){
          e.preventDefault();
      }
      this.errorMessage = '';
      this.service.login({username:this.username,password:this.password}).subscribe((res:any) => {
         if(res.status==='OK'){
             //do smthng
             this.router.navigateByUrl('/chat');
         }else{
             this.errorMessage = res.errorMessage;
         }
      });
      return false;
  }
}
