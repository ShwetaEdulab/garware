import { Component } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { UserService } from '../../../@core/data/users.service';
import { NbToastrService } from '@nebular/theme';
import {Location} from '@angular/common';
import { SupportapiService } from '../../../shared/supportapi.service';
//import { CommentComponent } from '../comment/comment.component';

@Component({
    selector: 'viewTicket',
    styleUrls: ['./viewTicket.component.scss'],
    templateUrl: './viewTicket.component.html',
})

export class ViewTicketComponent{
    ticketData;
    comments;
    today;
    comment="";
    user = { email: '' };

    constructor(private toastrService: NbToastrService,
        private router: Router,
        private route : ActivatedRoute,
        private userService: UserService,
        private supportapi : SupportapiService,
        private _location: Location,){

        }
    
    ngOnInit(){
        this.comment="";
        var uid = this.route.snapshot.queryParamMap.get('ticket_uid');
        this.today = new Date().toUTCString();
        this.userService.onUserChange().subscribe((user: any) => this.user = user);
        var response =  this.supportapi.getSingleTicket(uid);
        response.subscribe(
            data => {
                this.ticketData = data['ticket'];
                this.ticketData.issue = this.ticketData.issue.replace(/<[^>]*>/g, '');
                this.comments = this.ticketData['comments'];
                this.comments.forEach(element => {
                    element.comment = element.comment.replace(/<[^>]*>/g, '');
                    element.date = new Date(element.date).toUTCString();
                });
              
            },
            error => {
                console.error("ngOnInit get user : ", error);
            }
        );
    }

    backClicked(){
        this._location.back();
    }

    writeComment(){
        var response =  this.supportapi.commentOnTicket(this.ticketData._id,this.ticketData.owner._id,this.comment);
        response.subscribe(
        data => {
          this.toastrService.show(
            status || 'Success',       
            `Comment added successfully ! ! `, 
          );
        this.ngOnInit();
        
        },
        error => {
          console.error("commentOnTicket : ", error);
        }
      ); 
    }

}