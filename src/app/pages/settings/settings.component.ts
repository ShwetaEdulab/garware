import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(private api : ApiService,private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.api.getTheme();
  }

  changePassword(){
    this.router.navigateByUrl('/auth/changePassword');
  }

}
