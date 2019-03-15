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
import { Socket } from 'ngx-socket-io';
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
  notification;
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

      adminMenu = [    
        { title: 'Settings', icon: 'nb-gear' , link: '/pages/settings'},
        { title: 'Logout', icon: 'ion-log-out' , link: '/auth/logout'  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              public http: HttpClient,
              private socket : Socket,
              protected api: ApiService,) {
                this.api.notification(this.user.id);
       

  }

  ngOnInit() {
    this.userService.onUserChange()
      .subscribe((user: any) => this.user = user);
      
      if(this.user.role == 'student'){

        this.api.socketNotificationNo.subscribe(nn =>{
          if(nn==""){
            //do nothing
          }else{
            this.notification_no = nn;
          }
        });

        this.api.socketmessage.subscribe(notification_data =>{
          if(notification_data==""){
            this.deleteShow = false;
            this.notification = notification_data;
          }else{
            this.deleteShow = true;
            this.notification = notification_data;
          }
        });

        this.socket.on('connect', function () {
        console.log('connected to garwareadmin.admissiondesk.org'); 
        });

        this.socket.emit('confirmation');
        this.socket.emit('join', {email: this.user.email});

        this.socket.on('person', function(person){  
        //  console.log(person.name, 'is', person.age, 'years old.');
        });
        
        this.socket.on('new_msg', (data) => {
        console.log("data.msg NEW----->"+data);
          this.ReloadNotification();
        });
      }

  }



  notify(){
    console.log("notify");
    if(this.notification_no > 0){
      this.api.makeReadNotification(this.user.id)
      .subscribe(
        (data: any) => {
          this.notification_no = '';
        },
        error => {
          console.error("Error", error);
        });
    }
  }

  deleteNotification(id){;
    this.api.deleteNotification(this.user.id,id)
      .subscribe(
        (data: any) => {
          this.ReloadNotification();
        },
        error => {
          console.error("Error", error);
        });
  }
  
  public ReloadNotification(){
    this.notification=[];
    this.api.reloadnotification(this.user.id)
      .subscribe(
        (data: any) => {
          if(data['data'].length == 0){
            this.deleteShow = false;
            this.notification_no = '';
          }else if(data['data'].length > 0){
            this.deleteShow = true;
            if(data['notification_no'] == 0){
              this.notification_no = '';
            }else{
              this.notification_no = data['notification_no'];
            }
            for(let notify of data['data']) {
              this.notification.push(notify);
            }
          }
        },
        error => {
          console.error("Error", error);
        });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
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
