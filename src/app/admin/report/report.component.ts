import { Component } from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class AdminReportComponent {
  
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  application_data: any;
  p: number = 1;
  tab_type: any;
  activity_data: any;
  firstPaymentChallanData: any;
  secondPaymentChallanData: any;
  collegeAttendedStudents: any;
  tableData: any;
  options: any = {};
  themeSubscription: any;
  selectedYear: any ='2019';
  emailActivityData : any;
  loadingbutton;
  constructor(
    protected adminApi : AdminApiService,
    private router : Router,
    private theme: NbThemeService,
    private authService : NbAuthService,
    ) {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        console.log("token.getPayload()['role']"+token.getPayload()['role']);
        if(token.getPayload()['role'] !="admin"){
          this.router.navigate(['auth/logout'])
        }
      });
    
  }

  ngOnInit(){
    this.filterText = "";
    this.adminApi.getApplicationsByStatus(2019).subscribe(data=> {
      this.application_data = data['data'];
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    })
  }

  filterYearWise(year){
    this.adminApi.getApplicationsByStatus(year).subscribe(data=>{
      this.application_data = data['data'];
    })
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

  DownloadFistChallan(value){
    var name = value.split("/").pop();
    this.adminApi.downloadFiles(value)
    .subscribe(data => {
     saveAs(data, name);    
    });
  }

  DownloadSecondChallan(value){
    var name = value.split("/").pop();
    this.adminApi.downloadFiles(value)
    .subscribe(data => {
     saveAs(data, name);    
    });
  }
  
  getReportData(e){
    var index = e.index;
    if(index == 0){
      this.adminApi.getApplicationsByStatus(this.selectedYear).subscribe(data=> {
        this.application_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 1){
      this.adminApi.getApplicationAcceptance(this.selectedYear).subscribe(data=> {
        this.application_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }
    // else if(index == 2){
    //   this.adminApi.studentStatisticsPiechart().subscribe(data=> {
    //     this.tableData = data['data']['tableData'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }
    else if(index == 2){
      this.adminApi.activitytracker().subscribe(data=> {
        this.activity_data = data['data'];
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      })
    }else if(index == 3){
      this.tab_type = 'email_activity';
      this.loadingbutton = true;
      this.adminApi.getEmailTracker().subscribe(data =>{
        this.emailActivityData = data['data']['messages'];
        console.log("this.emailActivityData========>"+JSON.stringify(this.emailActivityData));
        this.loadingbutton = false;
        this.filterText = "";
        this.filterPlaceholder = "Search";
        this.filterInput
          .valueChanges
          .debounceTime(200)
          .subscribe(term => {
          this.filterText = term;
        });
      });
    }
    // else if(index == 3){
    //   this.adminApi.firstPaymentChallanData().subscribe(data=> {
    //     this.firstPaymentChallanData = data['data'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }else if(index == 4){
    //   this.adminApi.secondPaymentChallanData().subscribe(data=> {
    //     this.secondPaymentChallanData = data['data'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }else if(index == 5){
    //   this.adminApi.collegeAttendedStudents().subscribe(data=> {
    //     this.collegeAttendedStudents = data['data'];
    //     this.filterText = "";
    //     this.filterPlaceholder = "Search";
    //     this.filterInput
    //       .valueChanges
    //       .debounceTime(200)
    //       .subscribe(term => {
    //       this.filterText = term;
    //     });
    //   })
    // }else if(index == 6){
    //   this.adminApi.getApplication('new',this.selectedYear).subscribe(data=>{
    //    this.application_data = data['data'];
    //  })
    //    this.filterInput
    //    .valueChanges
    //    .debounceTime(200)
    //    .subscribe(term => {
    //    this.filterText = term;
    //  });
    // }else if(index == 7){
    //  this.adminApi.getApplicationinEligibility('new',this.selectedYear).subscribe(data=>{
    //    this.application_data = data['data'];
    //  })
    //  this.filterText = "";
    //  this.filterPlaceholder = "Search";
    //  this.filterInput
    //    .valueChanges
    //    .debounceTime(200)
    //    .subscribe(term => {
    //    this.filterText = term;
    //  });
    // }
  }

  filterYear(tab,tab_type,year){
    if(tab === 'app'){
      this.adminApi.getApplication(tab_type,year).subscribe(data=>{
        this.application_data = data['data'];
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }else if(tab === 'eligib'){
      this.adminApi.getApplicationinEligibility(tab_type,year).subscribe(data=>{
        this.application_data = data['data'];
      })
      this.filterText = "";
      this.filterPlaceholder = "Search";
      this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });
    }   
  }

}