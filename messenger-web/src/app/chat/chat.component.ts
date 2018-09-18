import { Component, OnInit, HostBinding, ElementRef, HostListener } from '@angular/core';
import {  trigger,  state,  style,  animate,  transition } from '@angular/animations';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie';

import { ChatService } from './../service/chat.service';
import { Message } from './../model/message';
import { User } from './../model/user';

import {Emojis} from './emoji-list';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
      trigger('myMessage', [
          transition('void => *', [
              style({
                //   position: 'absolute',
                //   top: '420px',
                  // width:'100%',
                  transform: 'scaleX(0.1)'//'translateX(-100px)'
              }),
              animate('200ms')
          ]),
      ])
  ]
})
export class ChatComponent implements OnInit {

    to:string;
    messages:any = {};
    users:User[] = [];
    emojiList = [];
    showEmojiPopOver:boolean = false;
    loggedInUser:string;


    constructor(private service:ChatService, private cookieService:CookieService) { }

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
            // if(!this.to) this.to = userList[0];
            // if(!this.messages[this.to]) this.messages[this.to] = [];
        });
        this.emojiList = Emojis.getEmojiList();
        this.loggedInUser = this.cookieService.get('userName');
        this.welcomeMessage();
    }

    @HostListener('document:visibilitychange', ['$event'])
    onViewSwitch(ev:any) {
        console.log(document.hidden, document.visibilityState);
        this.service.sendOnlinePing();
    }

    welcomeMessage(){
        let message= new Message(`Hi ${this.loggedInUser},
        <br> Welcome to my messenger.
        <br> You can start chatting by clicking on chat bubbles on top.
        <br> also here are some links for you
        <br>
        <br> <a href="/logout" >Logout</a>
        <br>
        <br> Enjoy ((--1))`,'');
        message.from = '$$ADMIN$$';
        this.to = '$$ADMIN$$';
        this.messages[this.to] =[message];
        this.users.push({_id:'$$ADMIN$$',firstName:'Home', lastName:'', email:''});
    }

    sendMessage(messageText:any,$event:any){
        if(!messageText || !messageText.textContent) return;
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
        if(id === '$$ADMIN$$') return 'Talk To Me :)';
        return '<UnKnown>';
    }

    resolveDateFromId(id:string):string{
        return '';
        /*if(id){
            let date = new Date(parseInt(id.substring(0, 8), 16) * 1000);
            return (date.getHours()%12)+":"+("0"+date.getMinutes()).slice(-2)+((date.getHours()/12 < 1)?'am':'pm');
        }*/
    }

    emojiPipe(text: string):string{
        text = text.replace(':)','<i class="em em-smile"></i>');
        text = text.replace(':*','<i class="em em-kiss"></i>');
        text = text.replace(/\(\((.*)\)\)/i,'<i class="em em-$1"></i>');
        text = text.replace(':D','<i class="material-icons">tag_faces</i>');
        return text;
    }

    addEmoji(e:string,input:any){
        input.textContent = input.textContent+"(("+e+"))";
        this.showEmojiPopOver =false;
    }

    playNotifySound(){
        let audio = new Audio();
        audio.src = "../../assets/notification_sound.mp3";
        audio.load();
        audio.play();
    }
}
