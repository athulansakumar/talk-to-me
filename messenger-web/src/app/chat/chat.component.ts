import { Component, OnInit, HostBinding } from '@angular/core';
import { ChatService } from './../service/chat.service';
import { Message } from './../model/message';
import { User } from './../model/user';
import * as _ from 'lodash';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    to:string;
    messages:any = {};
    users:User[] = [];
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
                if(!_.find(this.users, ['_id', user])){
                    this.service.getUserDetails(user).subscribe((u) => {
                        this.users.push(u);
                    });
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

    resolveUser(id:string):string{
        let user:User = _.find(this.users, ['_id', id]);
        if(user) return user.firstName;
        return '<UnKnown>';
    }

    resolveDateFromId(id:string):string{
	       let date = new Date(parseInt(id.substring(0, 8), 16) * 1000);
           return (date.getHours()%12)+":"+date.getMinutes()+((date.getHours()/12 < 1)?'am':'pm');
    }

    playNotifySound(){
        let audio = new Audio();
        audio.src = "../../assets/notification_sound.mp3";
        audio.load();
        audio.play();
    }
}
