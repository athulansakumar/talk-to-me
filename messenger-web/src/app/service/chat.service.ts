import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    socket :any;
    incomingData:any;
    userList:any;
    token:string;

    constructor(private cookieService:CookieService){}

    init(){
        this.token = this.cookieService.get('x-auth');
        this.socket = io(environment.baseUrl,{query:{token:this.token}});
        this.incomingData = Observable.create((observer) => {
            this.socket.on('msg',(data,ack) => {
                console.log(data);
                observer.next(data);
                ack({id:data.id,recieved:true});
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

    send(message:any):Observable<any>{
        let msgAck = Observable.create((observer) => {
            this.socket.emit('msg',message, (ack)=>{
                observer.next(ack);
                message.id=ack.id;
            });
            this.socket.on('ack', (ack)=>{
                if(message.id === ack.id){
                    observer.next(ack);
                }
            });
        });
        return msgAck;
    }
}
