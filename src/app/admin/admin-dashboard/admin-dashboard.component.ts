import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
	p: number = 1;
	data: any;
	profile_completeness: any;
	Twenty: number;
	Ten: number;
	Fourty: number;
	Sixty: number;
	Eighty: number;
	Hundred: number;
	public filterText: string;
	public filterPlaceholder: string;
	public filterInput = new FormControl();
	tab_type: string;
	Total_data: any;
	dashboardData: any;
	pie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
	Eligibility_pending: any;
	Application_Accepted: any;
	College_Allotment: any;
	ticketsData: any;
	show = true;
	length ;
	Count: any;
	selectedYear ='2019';
    constructor(	
	  protected adminApi : AdminApiService,
		private router : Router,
		private authService : NbAuthService,
      ) {
				this.authService.onTokenChange()
				.subscribe((token: NbAuthJWTToken) => {
					if(token.getPayload()['role'] !="admin"){
						this.router.navigate(['auth/logout'])
					}
				});
        
    }

  	ngOnInit() {
    	this.filterText = "";
			this.filterPlaceholder = "Search";
			this.adminApi.getTotal('admission').subscribe(data=>{
				this.Total_data = data['data'];
			})
			this.filterInput
			.valueChanges
			.debounceTime(200)
			.subscribe(term => {
				this.filterText = term;
			});
    	this.adminApi.profile_completeness(this.selectedYear).subscribe(data=>{
				if(data['data']['data'].length > 0){
					this.Ten = parseInt(data['data']['data'][0]['Ten']);
					this.Twenty = parseInt(data['data']['data'][0]['Twenty']);
					this.Fourty = parseInt(data['data']['data'][0]['Fourty']);
					this.Sixty = parseInt(data['data']['data'][0]['Sixty']);
					this.Eighty = parseInt(data['data']['data'][0]['Eighty']);
					this.Hundred = parseInt(data['data']['data'][0]['Hundred']);
					this.Count = data['data']['count']
					this.data = {
						
						labels: ['10%','20%', '40%', '60%', '80%', '100%'],
						datasets: [
							{
								label: 'Profile Completeness',
								backgroundColor: " #2e9e73",
								hoverBackgroundColor:"#3a5b3c",                      
								data: [ this.Ten, this.Twenty,this.Fourty,  this.Sixty,  this.Eighty,  this.Hundred]
							},
						]
					}
				}
			
		})
		
	}

  	tab(e) {
		var index = e.index;
		if(index == 0){
			this.tab_type = 'new'
		}else if(index == 1){
			this.tab_type = 'admission';
			this.adminApi.getTotal(this.tab_type).subscribe(data=>{
				this.Total_data = data['data'];
			  })
				this.filterInput
				.valueChanges
				.debounceTime(200)
				.subscribe(term => {
					this.filterText = term;
				});
				this.adminApi.getStudenttracking().subscribe(data=>{
					this.Eligibility_pending = data['data'][0]['Eligibility'];
					this.Application_Accepted = data['data'][0]['Secondpayement'];
					this.College_Allotment = data['data'][0]['Thirdpayement'];
					this.pie = {
						labels: ['Eligibility Pending','Application Accepted','College Allotment'],
						datasets: [
								{
										data: [	this.Eligibility_pending, 	this.Application_Accepted, 	this.College_Allotment],
										backgroundColor: [
												"#F3354C",
												"#14BAEB",
												"#88C443"
										],
										hoverBackgroundColor: [
												"#FF6384",
												"#36A2EB",
												"#FFCE56"
										]
								}]    
						};
				})
		}else if(index == 2){
			this.tab_type = "open_tickets";
			this.adminApi.getTickets(this.tab_type).subscribe(data =>{
				
				if(data['data']){
          this.show = true;
          this.ticketsData = data['data'];
          this.length = this.ticketsData.length;
        }else{
          this.show = false;
          this.length = 0;
        }
			})
		}else if(index == 3){
			this.tab_type = "new_tickets";
			this.adminApi.getTickets(this.tab_type).subscribe(data =>{
				if(data['data']){
          this.show = true;
          this.ticketsData = data['data'];
          this.length = this.ticketsData.length;
        }else{
          this.show = false;
          this.length = 0;
        }
			})
		}else if(index == 4){
			this.tab_type = "closed_tickets";
			this.adminApi.getTickets(this.tab_type).subscribe(data =>{
				if(data['data']){
          this.show = true;
          this.ticketsData = data['data'];
          this.length = this.ticketsData.length;
        }else{
          this.show = false;
          this.length = 0;
        }
			})
		}

		if(this.tab_type === 'admission' ||   this.tab_type ==='institute'){
			
		}else{
			this.adminApi.profile_completeness(this.selectedYear).subscribe(data=>{       
				this.Ten = parseInt(data['data']['data'][0]['Ten']);
				this.Twenty = parseInt(data['data']['data'][0]['Twenty']);
				this.Fourty = parseInt(data['data']['data'][0]['Fourty']);
				this.Sixty = parseInt(data['data']['data'][0]['Sixty']);
				this.Eighty = parseInt(data['data']['data'][0]['Eighty']);
				this.Hundred = parseInt(data['data']['data'][0]['Hundred']);
				this.Count = data['data']['count']
				this.data = {
					
					labels: ['10%','20%', '40%', '60%', '80%', '100%'],
					datasets: [
						{
							label: 'Profile Completeness',
							backgroundColor: " #2e9e73",
							hoverBackgroundColor:"#3a5b3c",                      
							data: [ this.Ten, this.Twenty,this.Fourty,  this.Sixty,  this.Eighty,  this.Hundred]
						},
					]
				}
			})

		}
		
   
  
	} 

	filterYear(tab_type,year){
		this.adminApi.profile_completeness(year).subscribe(data=>{    
			this.Ten = parseInt(data['data']['data'][0]['Ten']);
			this.Twenty = parseInt(data['data']['data'][0]['Twenty']);
			this.Fourty = parseInt(data['data']['data'][0]['Fourty']);
			this.Sixty = parseInt(data['data']['data'][0]['Sixty']);
			this.Eighty = parseInt(data['data']['data'][0]['Eighty']);
			this.Hundred = parseInt(data['data']['data'][0]['Hundred']);
			this.Count = data['data']['count']
			this.data = {
				
				labels: ['10%','20%', '40%', '60%', '80%', '100%'],
				datasets: [
					{
						label: 'Profile Completeness',
						backgroundColor: " #2e9e73",
						hoverBackgroundColor:"#3a5b3c",                      
						data: [ this.Ten, this.Twenty,this.Fourty,  this.Sixty,  this.Eighty,  this.Hundred]
					},
				]
			}
		
		})
    
      this.filterInput
      .valueChanges
      .debounceTime(200)
      .subscribe(term => {
      this.filterText = term;
    });
  }

	viewMore(category,userId,courseId,tab,applicationId){
		this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
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
		
		openTicket(ticket_id){
			this.router.navigate(['pages/viewTicket'],{queryParams:{ticket_uid:ticket_id}});
		}

  }



