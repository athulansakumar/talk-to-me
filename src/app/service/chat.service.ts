import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    socket :any;
    incomingData:any;
    userList:any;
    userName:string;

    constructor(private cookieService:CookieService){}

    init(){
        this.userName = this.cookieService.get('userName');
        this.socket = io('http://localhost:4200');
        this.socket.on('whoaru', (data) => {
            console.log(data);
        });
        this.socket.emit('identify',{userName:this.userName})
        this.incomingData = Observable.create((observer) => {
            this.socket.on('msg',(data) => {
                console.log(data);
                observer.next(data);
            });
        });
        return this.incomingData;
    }

    getUsers(){
        this.userList = Observable.create((observer) => {
            this.socket.on('users',(data) => {
                console.log(data);
                observer.next(data);
            });
        });
        return this.userList;
    }

    send(messageText:string,to:string){
        var message={text:messageText,to:to,from:this.userName};
        this.socket.emit('msg',message);
    }
}
