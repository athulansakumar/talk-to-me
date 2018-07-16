import { Component, OnInit } from '@angular/core';
import {ChatService} from './../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    messageText:string;
    to:string;
    messages:any;
    users:string[] = [];
    constructor(private service:ChatService) { }

    ngOnInit() {
        this.messages = [];
        let msg = this.service.init();
        msg.subscribe((data) => {
            this.messages.push(data);
        });
        this.service.getUsers().subscribe((userList) => {
            this.users = userList;
            if(!this.to) this.to = userList[0];
        });
    }

    sendMessage(){
        this.service.send(this.messageText,this.to);
        this.messages.push({text:this.messageText});
    }
}
