import { Component, OnInit } from '@angular/core';
import {ChatService} from './../service/chat.service';
import { Message } from './../model/message';

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
            /*for(var user of userList){
                if(!this.users.contains(user)){
                    this.users.push(user);
                }
            }*/
            this.users = userList;
            if(!this.to) this.to = userList[0];
            if(!this.messages[this.to]) this.messages[this.to] = [];
        });
    }

    sendMessage(){
        let message= new Message(this.messageText,this.to);
        this.service.send(message).subscribe((ack:any) => {
            message.id=ack.id;
            console.log(ack);
            if(ack.sent){
                console.log('single tick');
            }
            if(ack.recieved){
                console.log('double tick');
            }
        });
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
