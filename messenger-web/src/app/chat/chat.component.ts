import { Component, OnInit, HostBinding } from '@angular/core';
import { ChatService } from './../service/chat.service';
import { Message } from './../model/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

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
            for(var user of userList){
                if(!this.users.includes(user)){
                    this.users.push(user);
                }
            }
            // this.users = userList;
            if(!this.to) this.to = userList[0];
            if(!this.messages[this.to]) this.messages[this.to] = [];
        });
    }

    sendMessage(messageText:any,$event:any){
        let message= new Message(messageText.textContent,this.to);
        this.service.send(message).subscribe((ack:any) => {
            message.id=ack.id;
            console.log(ack);
            if(ack.sent){
                console.log('single tick');
                message.sent = true;
            }
            if(ack.recieved){
                console.log('double tick');
                message.seen = true;
            }
        });
        if(!this.messages[this.to])
            this.messages[this.to] = [];
        this.messages[this.to].push(message);
        console.log(messageText.innerHTML);
        messageText.innerHTML='';
        $event.preventDefault();
    }

    playNotifySound(){
        let audio = new Audio();
        audio.src = "../../assets/notification_sound.mp3";
        audio.load();
        audio.play();
    }
}
