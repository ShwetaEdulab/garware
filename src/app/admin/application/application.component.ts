import {Component ,OnInit} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef,NbDialogService } from '@nebular/theme';
import { EligibilityComponent } from './Eligibility.Component';

@Component({
  selector: 'application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class AdminApplicationComponent {
  tab_type;
  application_data;
  p: number = 1;
  iccr_data: any;
  status;
  checked=false;
  color = 'accent';
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
	unticked_data: any;
  mu_data: any;

  constructor( 
  private dialogService: NbDialogService,
	protected adminApi : AdminApiService,
	private router : Router) { 
  }

  ngOnInit(){
	this.filterText = "";
    this.filterPlaceholder = "Search";
    this.adminApi.getApplication('new').subscribe(data=>{
      this.application_data = data['data'];
    })
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }
  
  getApplicationAccepted(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'new'
    }else if(index == 1){
      this.tab_type = 'accept'
    }else if(index == 2){
      this.tab_type = 'reject'
    }else if(index == 3){
		this.tab_type = 'unticked',
		this.status = 'reject';
	  }
    if(this.tab_type === 'new' ||   this.tab_type ==='accept' ||  this.tab_type === 'reject'){
      this.adminApi.getApplication(this.tab_type).subscribe(data=>{
        this.application_data = data['data'];
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });

    }else if(this.tab_type === 'iccr' || this.tab_type === 'iccr_accept' || this.tab_type === 'iccr_reject'){     
      this.adminApi.getIccrApplication(this.status).subscribe(data=>{
        this.iccr_data = data['data'];
      })
        this.filterInput
        .valueChanges
        .debounceTime(200)
        .subscribe(term => {
        this.filterText = term;
      });

    }else if(this.tab_type === 'unticked' ){     
		this.adminApi.getUntickedApplication(this.tab_type).subscribe(data=>{
		  this.unticked_data = data['data'];
		})
		  this.filterInput
		  .valueChanges
		  .debounceTime(200)
		  .subscribe(term => {
		  this.filterText = term;
		});
  
	  } 

  }

  viewMore(category,userId,courseId,tab,applicationId){
    this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
  }

  sendToEligibility(e,id,course_id,user_id,checkEligiblity){
    var data={
        id:id,
        user_id:user_id,
        course_id:course_id,
        value:e.checked
    }
    this.adminApi.checkeligiblity(data).subscribe(data=>{
      if(data['status'] === 200){
        alert(data['message']);    
      }
      
    })
  }

  Check_Eligibility(user_id,college_university,college_name,Subject_first_hsc,Subject_Second_hsc,Subject_Third_hsc,Subject_fourth_hsc,Subject_fifth_hsc,Subject_Six_hsc,specialization,course){
    
    this.adminApi.Check_Eligibility(user_id,college_university,college_name,Subject_first_hsc,Subject_Second_hsc,Subject_Third_hsc,Subject_fourth_hsc,Subject_fifth_hsc,Subject_Six_hsc,specialization,course).subscribe(response=> {
      
      if(response['status'] == 200){
        var data = response['data'];					
        var nrp = response['data'];					
        if(data.length == 0 || data.length == undefined || data.length == null){
          this.mu_data = response['data'];
          this.dialogService.open(EligibilityComponent, {
            context: {
              data: this.mu_data						
            },
          
          });

        }else{
          this.adminApi.Check_Eligibility_data(nrp,specialization,course).subscribe(response1=>{
            if(response1['status'] == 200){
              var muData = response1['data'];
              this.mu_data = response1['data'];
              this.dialogService.open(EligibilityComponent, {
                context: {
                  data: this.mu_data						
                },
              
              });
            }else if(response1['status'] == 400){
              this.mu_data =null;
              this.dialogService.open(EligibilityComponent, {
                context: {
                  data: ''						
                },
              
              });
            }
            
          });

        }
      }else if(response['status'] == 400){
        this.mu_data =null;
        this.dialogService.open(EligibilityComponent, {
          context: {
            data: ''						
          },
        
        });

      }

    })
  }
 
  showprovisionalLetterApp(user_id,course_id,application_id){
    this.adminApi.showprovisionalLetterApp(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, application_id+'_Confirmation_provisional_Letter.pdf');    
        });
       
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }

  preview(user_id,course_id,application_id){
    this.adminApi.preview(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, application_id+'_Preview.pdf');    
        });
        
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  
  }

  preview_data_with_Preferences(user_id,course_id,application_id){
    this.adminApi.preview_data_with_Preferences(user_id,course_id,application_id).subscribe(data => {
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, application_id+'_Preview_Pref.pdf');    
        });
        
      }else{
        alert("You Can't Download Preview Letter!!!!!!")
      }
  
    })
  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email}});
  }

}