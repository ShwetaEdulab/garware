import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class SupportapiService {
  // private baseUrl = 'http://mu.admissiondesk.org:5000';
  private baseUrl = 'http://93.104.211.51:5000';
  private supportBaseUrl = 'http://mu.admissiondesk.org:90';
  constructor(private httpClient : HttpClient) { }

  async checkSupportUser(email,name){
    try{
      return await this.httpClient.post(`${this.baseUrl}/api/support/checkSupportUser`,{"email":email,"name" : name });
      
    }catch(error) {
      this.handleError("checkSupportUser : "+error);
    }

  }

  getUser(userEmail){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/users/` + userEmail,{headers : headers});

    }catch(error) {
      this.handleError("getUser : "+error);
    }
  }
  getTypes(){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/tickets/types`,{headers : headers});

    }catch(error) {
      this.handleError("getTypes : "+error);
    }
  }

  getPriority(){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/tickets/priorities`,{headers : headers});

    }catch(error) {
      this.handleError("getPriority : "+error);
    }
  }

  getTickets(user_id){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets/user/`+user_id,{headers : headers});
      return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/tickets/user/`+user_id,{headers : headers});
    }catch(error) {
      this.handleError("getTickets : "+error);
    }

    
  }

  getSingleTicket(uid){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/tickets/`+uid,{headers : headers});
    }catch(error) {
      this.handleError("getSingleTicket : "+error);
    }   
  }


  commentOnTicket(uid,user_id,comment){
    try{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/tickets/addcomment`,{"comment":comment,"ownerId":user_id,"_id":uid},{headers : headers});
    }catch(error) {
      this.handleError("commentOnTicket : "+error);
    }
  }

  //create new ticket
  createTicket(subject,issue,user,group,type,priority){
    try{

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
      //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
      return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/tickets/create`,{"subject":subject,"owner":user,"group":group,"type":type,"issue":issue,"priority":priority},{headers : headers});

    }catch(error) {
      this.handleError("getPriority : "+error);
    }
  }

    //chat
    getChats(){
      try{
  
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
        return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/messages`,{headers : headers});
      }catch(error) {
        this.handleError("getChats : "+error);
      }   
    }
  
    //send message
    sendMessage(chat_id, owner, message){
      try{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
        return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/messages/send`,{'cId':chat_id,'owner':owner,'body':message},{headers : headers});
      }catch(error) {
        this.handleError("sendMessage : "+error);
      }  
    }

    registerUser(username, password, confirmPasswd, fullname, email){
      try{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
        //return  this.httpClient.get(`http://localhost:8118/api/v1/users/create`,{"aUsername":username,"aPass":password,"aPassConfirm":confirmPasswd,"aFullname":fullname,"aEmail":email,"aRole":"user"},{headers : headers});
        return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/users/create`,{"aUsername":username,"aPass":password,"aPassConfirm":confirmPasswd,"aFullname":fullname,"aEmail":email,"aRole":"user","aGrps":[]},{headers : headers});
      }catch(error) {
        this.handleError("registerUser : "+error);
      }
    }
  
    getUsers(){
      try{
  
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
        //return  this.httpClient.get(`http://localhost:8118/api/v1/tickets`,{headers : headers});
        return  this.httpClient.get(`${this.supportBaseUrl}/api/v1/users`,{headers : headers});
  
      }catch(error) {
        this.handleError("getUsers : "+error);
      }
    }

        //start new conversation
        startConversation(requester, participants){
          try{
            let headers = new HttpHeaders();
            headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('accesstoken', config.trudesk_key);
            return  this.httpClient.post(`${this.supportBaseUrl}/api/v1/messages/conversation/start`,{'requester':requester,'participants':participants},{headers : headers});
          }catch(error) {
            this.handleError("startConversation : "+error);
          }
        }

  private handleError(error){
    console.error(error);
   }



}
