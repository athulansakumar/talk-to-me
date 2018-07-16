import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  errorMessage:string;
  username:string;
  password:string;

  constructor(
      private service:LoginService,
      private router:Router
  ){}

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
