import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InstituteApiService } from '../../../shared/instituteapi.service';

@Component({
  selector: 'course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit {

  tab_type;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  unticked_data: any;
  status;
  application_data;

  constructor(
    protected adminApi : InstituteApiService,
  ) { }

  ngOnInit() {
  }

  getApplicationAccepted(e) {
    var index = e.index;
    console.log('@@@@@@@@@@@'+index)
    if(index == 0){
      this.tab_type = 'new'
    }else if(index == 1){
      this.tab_type = 'accept'
    }else if(index == 2){
      this.tab_type = 'reject'
    }else if(index == 3){
      this.tab_type = 'iccr',
      this.status = 'new';
    }else if(index == 4){
      this.tab_type = 'iccr_accept',
      this.status = 'accept';
    }else if(index == 5){
      this.tab_type = 'iccr_reject',
      this.status = 'reject';
    }else if(index == 6){
		this.tab_type = 'unticked',
		this.status = 'reject';
	  }
    if(this.tab_type === 'new' ||   this.tab_type ==='accept' ||  this.tab_type === 'reject'){
      // this.adminApi.getApplication(this.tab_type).subscribe(data=>{
      //   this.application_data = data['data'];
      // })
      //   this.filterInput
      //   .valueChanges
      //   .debounceTime(200)
      //   .subscribe(term => {
      //     console.log('term------'+term)
      //   this.filterText = term;
      // });

    }
    // else if(this.tab_type === 'iccr' || this.tab_type === 'iccr_accept' || this.tab_type === 'iccr_reject'){     
    //   this.adminApi.getIccrApplication(this.status).subscribe(data=>{
    //     // console.log("iccr_data====="+JSON.stringify(data))
    //     this.iccr_data = data['data'];
    //   })
    //     this.filterInput
    //     .valueChanges
    //     .debounceTime(200)
    //     .subscribe(term => {
    //       console.log('term------'+term)
    //     this.filterText = term;
    //   });

    // }
    else if(this.tab_type === 'unticked' ){     
		// this.adminApi.getUntickedApplication(this.tab_type).subscribe(data=>{
		//    console.log("iccr_data====="+JSON.stringify(data))
		//   this.unticked_data = data['data'];
		// })
		//   this.filterInput
		//   .valueChanges
		//   .debounceTime(200)
		//   .subscribe(term => {
		// 	console.log('term------'+term)
		//   this.filterText = term;
		// });
  
	  } 

  }

}
