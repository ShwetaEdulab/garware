import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Router  } from '@angular/router';
import { UserService } from '../../@core/data/users.service';
import { ApiService } from '../../shared/api.service';
import { SupportapiService } from '../../shared/supportapi.service';
import { NewTicketComponent } from './newTicket/newTicket.component';
@Component({
    selector: 'help',
    styleUrls: ['./help.component.scss'],
    templateUrl: './help.component.html',
})

export class HelpComponent  {
  user = { email: '' }; 
  tickets;
  show = false;

  constructor(private dialogService: NbDialogService,
    private router: Router,
    private userService: UserService,
    protected api : ApiService,
    private supportapi : SupportapiService) { }
    
  ngOnInit(){
    this.api.getTheme();
    this.userService.onUserChange().subscribe((user: any) => this.user = user);
    var response =  this.supportapi.getUser(this.user.email);
    response.subscribe(
      data => {
        var response =  this.supportapi.getTickets(data['user']._id);
        response.subscribe(
          data => {
            if(data['data']){
              this.show = true;
              this.tickets = data['data']['recentTickets'];
              this.tickets.forEach(element => {
                element.date = new Date(element.date).toUTCString();
              });
            }else {
              this.show = false;
            }
          },
          error => {
            
            console.error("ngOnInit view all tickets : ", error);
          }
        );  
      },
      error => {
        console.error("ngOnInit get user : ", error);
      }
    );  
  }

  viewTicket(uid){
    this.router.navigate(['pages/viewTicket'],{queryParams:{ticket_uid:uid}});
  }

  createTicket(){
    this.dialogService.open(NewTicketComponent, {
      context: {
        title: 'Raise Ticket',
        userEmail : this.user.email
      },
    });
  }
}