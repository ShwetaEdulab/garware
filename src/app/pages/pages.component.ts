import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  show;
  constructor(
    protected api : ApiService,
   ) {
    
  }
  ngOnInit(){

  var checkapplications =  this.api.checkapplications();
  checkapplications.subscribe(
    (data: any) => {
      if(data['status']== 200){
        this.show = 'true';
      }else if(data['status']== 400){
        this.show = 'false';
      }else{
        this.show = 'false';
      }
      for (var a in MENU_ITEMS){
        if(MENU_ITEMS[a].title == 'My Application'){
          if(this.show == 'false'){
            MENU_ITEMS[a].hidden = true;
          }else{
            MENU_ITEMS[a].hidden = false;
          }
        }
        
      }
    },
    error => {
      console.error("Error", error);
    }
  )
}
}
