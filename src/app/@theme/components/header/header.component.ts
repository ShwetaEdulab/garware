import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../../shared/socket.service';
import { ApiService } from '../../../shared/api.service';
import * as io from 'socket.io-client';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';
  user = {
    id: "",
    email:"",
    role:""
  };
  notification=[];
  notification_no: any;
  deleteShow :any;

  private alive: boolean; // used to unsubscribe from the IntervalObservable
                          // when OnDestroy is called.
   adminsocket: any;

  userMenu = [
    { title: 'Profile', icon: 'fa fa-user', link: '/pages/profile' },
    { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
    { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

    instituteMenu = [
      { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
      { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              public http: HttpClient,
              private socket : SocketService,
              protected api: ApiService,) {
       

  }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      
    // this.api.notification(this.user.id)
    //   .subscribe(
    //     (data: any) => {
    //       if(data['data'].length == 0){
    //         this.deleteShow = false;
    //         this.notification_no = '';
    //       }else if(data['data'].length > 0){
    //         this.deleteShow = true;
    //         if(data['notification_no'] == 0){
    //           this.notification_no = '';
    //         }else{
    //           this.notification_no = data['notification_no'];
    //         }
    //         for(let notify of data['data']) {
    //           this.notification.push(notify);
    //         }
    //       }
    //     },
    //     error => {
    //       console.error("Error", error);
    //     });

  //   this.adminsocket = io.connect("ws://muadmin.admissiondesk.org:3/", {
  //       reconnection: true,transports: ['websocket']
  //   });
  //  // console.log("Between socket : "+this.adminsocket);
  //   this.adminsocket.on('connect', function () {
  //    // console.log('connected to muadmin.admissiondesk.org'); 
  //   });
  //   //console.log("user.email========>"+this.user.email);
  //   this.adminsocket.emit('confirmation');
  //   this.adminsocket.emit('join', {email: this.user.email});

  //   this.adminsocket.on('person', function(person){  
  //   //  console.log(person.name, 'is', person.age, 'years old.');
  //   });

  //   this.adminsocket.on('goodbye', function(){  
  //    // console.log('goodbye goodbye goodbye goodbye goodbye');
  //   });
    
  //   this.adminsocket.on('new_msg', (data) => {
  //    // console.log("data.msg NEW----->"+data);
  //     this.ReloadNotification();
  //   });

  }



  notify(){
    console.log("notify");
    if(this.notification_no > 0){
      //console.log("this.notification_no > 0 ");
      this.api.makeReadNotification(this.user.id)
      .subscribe(
        (data: any) => {
          //console.log("Upadted data==========>");
          this.notification_no = '';
        },
        error => {
          console.error("Error", error);
        });
    }
  }

  // deleteNotification(id){
  //  // console.log("id============>"+id);
  //   this.api.deleteNotification(this.user.id,id)
  //     .subscribe(
  //       (data: any) => {
  //        // console.log("Delete data==========>");
  //         this.ReloadNotification();
  //       },
  //       error => {
  //         console.error("Error", error);
  //       });
  // }

  // public ReloadNotification(){
  //   this.notification=[];
  //   this.api.notification(this.user.id)
  //     .subscribe(
  //       (data: any) => {
  //         if(data['data'].length == 0){
  //           this.deleteShow = false;
  //           this.notification_no = '';
  //         }else if(data['data'].length > 0){
  //           this.deleteShow = true;
  //           if(data['notification_no'] == 0){
  //             this.notification_no = '';
  //           }else{
  //             this.notification_no = data['notification_no'];
  //           }
  //           for(let notify of data['data']) {
  //             this.notification.push(notify);
  //           }
  //         }
  //       },
  //       error => {
  //         console.error("Error", error);
  //       });
  // }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    // //TODO connect to cartvalue
    // this.http.get('http://mu.admissiondesk.org:5000/cartvalue')
    // .subscribe(
    //   data => console.log(data),
    //   err => console.log(err)
    // );
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
