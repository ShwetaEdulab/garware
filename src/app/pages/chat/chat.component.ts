import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router  } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { SupportapiService } from '../../shared/supportapi.service';
import * as io from 'socket.io-client';
import {Location} from '@angular/common';

@Component({
    selector: 'chat',
    styleUrls: ['./chat.component.scss'],
    templateUrl: './chat.component.html',
})

export class ChatComponent  {
    chats = [];
    requester;
    participants = [];
    chat = {id:"",fullname:"",lastOnline:"",message:""}
    chat_id;
    localChat;
    user = {email:""};
    flag = 0;
    messages = [];
    owner;
    parter;
    socket;
    constructor(private toastrService: NbToastrService,
        private router: Router,
        private userService: UserService,
        protected api : ApiService,
        private supportapi : SupportapiService,
        private _location: Location,
    ) { 
        this.socket = io.connect("http://mu.admissiondesk.org:90/", {
            reconnection: true
        });
        this.socket.on('connect', function () {
           // console.log('connected to http://mu.admissiondesk.org:90/'); 
        });

        
        
        
    }
    
    ngOnInit(){
        this.api.getTheme();
        this.userService.onUserChange().subscribe((user: any) => this.user = user);
        var response = this.supportapi.getUsers();
        response.subscribe(
            data =>{
                data['users'].forEach(element => {
                    if(element.role == "admin"){
                        this.chat.fullname= element.fullname;
                        var email = element.email;
                        this.participants.push( element._id );
                        this.parter = element._id;
                        var chatResponse =  this.supportapi.getChats();
                        chatResponse.subscribe(
                            chatData => {
                                this.localChat = chatData['conversations'];
                                this.localChat.forEach(chatElement => {
                                    if(chatElement['p'][1] != null){
                                        if(chatElement['p'][1].email == this.user.email && chatElement['p'][0].email == email){   
                                            this.chat.id = chatElement.cId;
                                            this.chat.lastOnline =  new Date(chatElement['messages'][0]['owner'].lastOnline).toLocaleDateString() + " at " +new Date(chatElement['messages'][0]['owner'].lastOnline).toLocaleTimeString();
                                            if(chatElement['messages'][0]['owner'].email == this.user.email)
                                                this.chat.message = "You : ";
                                            else
                                            this.chat.message = chatElement['messages'][0]['owner'].fullname + " : ";
                                            this.chat.message += chatElement['messages'][0].body;
                                            this.chats.push(this.chat);
                                        }
                                    }
                                });
                                if(this.chats.length == 0){
                                    this.chats.push(this.chat);
                                }
                            },
                            error => {
                                console.error("ngOnInit view all tickets : ", error);
                            }
                        ); 
                    }
                    if(element.email == this.user.email)
                    {
                        this.requester = element._id;
                        this.owner = element._id;
                        this.participants.push( element._id );
                    }
                });
            }
        )
        this.socket.on('chatMessage', data => {
            if(data.type == 's'){
                this.messages.push({
                    text : data.message,
                    sender :data.fromUser.fullname,
                    reply : "false",
                    date : new Date()
                })
            }else if(data.type == 'r'){
                this.messages.push({
                    text : data.message,
                    sender :"You",
                    reply : "true",
                    date : new Date()
                })
            }
        });
    }

    backClicked(){
        this._location.back();
    }

    viewTicket(cId){
        this.chat_id = cId;
        this.flag = 1;
        if(this.chat_id){
            this.localChat.forEach(element =>{
                if(element.cId == this.chat_id){
                    element['messages'].forEach(msg =>{
                        if(msg.owner.email == this.user.email){
                            this.owner = msg.owner._id;
                            this.messages.push({
                                text : msg.body,
                                sender : "You",
                                reply : "true",
                                date : new Date(msg.createdAt)
                            })
                        }else{
                            this.parter = msg.owner._id;
                            this.messages.push({
                                text : msg.body,
                                sender : msg.owner.fullname,
                                reply : "false",
                                date : new Date(msg.createdAt)
                            })
                        }
                    })
                }
            })
            this.messages.reverse();
        }else{
            var response =  this.supportapi.startConversation(this.requester, this.participants);
            response.subscribe( data => {
               
                this.chat_id = data['conversation']._id;

            });
        }
    }

    sendMessage(event){
        var response =  this.supportapi.sendMessage(this.chat_id, this.owner, event.message);
        response.subscribe(
            data =>{
               
                var messageId = data['message']._id;
                this.socket.emit('chatMessage',{
                    conversation: this.chat_id,
                    to: this.parter,
                    from: this.owner,
                    type: 's',
                    messageId: messageId,
                    message: event.message
                });
                this.toastrService.show(
                    status || 'Success',       
                    `Comment added successfully ! ! `, 
                );
            }
        )
        
    }
}