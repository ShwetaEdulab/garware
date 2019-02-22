import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbToastrService} from '@nebular/theme';
import { ApiService } from '../../../shared/api.service'
import { Router  } from '@angular/router';
import { SupportapiService } from '../../../shared/supportapi.service'

@Component({
    selector: 'nb-dialog',
    templateUrl: './newTicket.component.html',
    styleUrls: ['./newTicket.component.scss']
})

export class NewTicketComponent implements OnInit {
    @Input() title : string;
    @Input() userEmail :string;
    @Input() button :string;
    subject;
    content = "";
    user;
    type;
    priority;
  
    constructor(protected ref: NbDialogRef<NewTicketComponent>,
      private api : ApiService,
      private supportapi : SupportapiService,
      private toastrService: NbToastrService,
      private router: Router,) { }
  
    ngOnInit() {
      this.api.getTheme();

      var response =  this.supportapi.getUser(this.userEmail);
      response.subscribe(
        data => {
  
          this.user = data;
        },
        error => {
            console.error("ngOnInit get user : ", error);
        }
      );  
      var response1 =  this.supportapi.getTypes();
      response1.subscribe(
        data => {
          this.type = data[0]._id;
        },
        error => {
            console.error("ngOnInit get type: ", error);
        }
      );  
      var response2 =  this.supportapi.getPriority();
      response2.subscribe(
        data => {
          this.priority= data['priorities'][0]._id;
        },
        error => {
            console.error("ngOnInit get priority : ", error);
        }
      );  
    }
    
    dismiss() {
      this.ref.close();
      }
  
    send(){
      var response =  this.supportapi.createTicket(this.subject,this.content,this.user['user']._id,this.user['groups'][0],this.type,this.priority);
      response.subscribe(
        data => {
          this.toastrService.show(
            status || 'Success',       
            `Ticket Created susccessfully ! ! `, 
          );
         
          this.dismiss();
        },
        error => {
          console.error("createTicket : ", error);
        }
      ); 
    }
  
  }