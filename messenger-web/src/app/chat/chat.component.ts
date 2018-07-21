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
    messages:any = {};
    users:string[] = [];
    constructor(private service:ChatService) { }

    ngOnInit() {
        let msg = this.service.init();
        msg.subscribe((data) => {
            if(!this.messages[data.from])
                this.messages[data.from] = [];
            this.messages[data.from].push(data);
            this.playNotifySound();
        });
        this.service.getUsers().subscribe((userList) => {
            this.users = userList;
            if(!this.to) this.to = userList[0];
            this.messages[this.to] = [];
        });
    }

    sendMessage(){
        this.service.send(this.messageText,this.to);
        if(!this.messages[this.to])
            this.messages[this.to] = [];
        this.messages[this.to].push({text:this.messageText});
        this.messageText='';
    }

    playNotifySound(){
        let audio = new Audio();
        audio.src = "../../assets/notification_sound.mp3";
        audio.load();
        audio.play();
    }
}
