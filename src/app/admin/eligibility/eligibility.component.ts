import {Component ,OnInit,ElementRef, ViewChild} from '@angular/core';
import { AdminApiService } from '../../shared/adminapi.service';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';

@Component({
  selector: 'eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
  providers:[ConfirmationService],
})

export class AdminEligibilityComponent {
  @ViewChild('myDiv') myDiv: ElementRef;
  tab_type;
  application_data;
  p: number = 1;
  status;
  msgs : Message[]= [];
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  constructor(protected adminApi : AdminApiService,
    private router : Router,
    private confirmationService: ConfirmationService) { 
    
  }

  ngOnInit(){
    this.adminApi.getApplicationinEligibility('new').subscribe(data=>{
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
  getApplication(e) {
    var index = e.index;
    if(index == 0){
      this.tab_type = 'new'
    }else if(index == 1){
      this.tab_type = 'requested_unlocked_transcript'
    }
    if(this.tab_type == 'new'){
      this.adminApi.getApplicationinEligibility(this.tab_type).subscribe(data=>{
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
    }else if(this.tab_type == 'iccr'){
      this.status='new';
      this.adminApi.getICCRApplicationinEligibility(this.status).subscribe(data=>{
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
    }else if(this.tab_type == 'iccr_allocated_college_data'){
      this.adminApi.geticcr_allocated_college_data().subscribe(data=>{
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
    }else if(this.tab_type == 'requested_unlocked_transcript'){
      this.adminApi.getrequested_unlocked_transcript().subscribe(data=>{
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
    }else if(this.tab_type == 'iccr_requested_unlocked_transcript'){
      this.adminApi.geticcr_requested_unlocked_transcript().subscribe(data=>{
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

  DownloadProvisionalLetter(user_id,id){
    this.adminApi.DownloadProvisionalLetter(user_id,id).subscribe(data => {
      if(data['status'] == 200){
        var pdf = '/srv/www/uiserver/public/upload/transcript/'+user_id+'/'+id+'_Confirmation_provisional_Letter.pdf'
        this.adminApi.downloadFiles(pdf)
        .subscribe(data => {
        saveAs(data, id+'_Confirmation_provisional_Letter.pdf');    
        });
      }else if(data['status'] == 400){
        alert('Confirmation Provisional Letter Not generated !!')
      }
    })
    
  }

  viewMore(category,userId,courseId,tab,applicationId){
    this.router.navigate(['pages/adminView'],{queryParams:{category:category,userId : userId, courseId:courseId,tab:tab,applicationId:applicationId }});
  }

  downloadForewordLetter(pdf,file_name){
    this.adminApi.downloadFiles(pdf)
    .subscribe(data => {
     saveAs(data, file_name);    
    });
  }

  errata(userId,category){
    this.router.navigate(['pages/adminErrata'],{queryParams:{userId : userId ,category:category}});
  }

  acceptApplication(userId,courseId,id){
    var eligib_number = ((document.getElementById("eligib_number"+id) as HTMLInputElement).value);
    if(eligib_number==null || eligib_number==undefined || eligib_number==""||eligib_number==" "){
      document.getElementById("elignumbererror"+id).innerHTML ="Eligblity number is required";
			document.getElementById("elignumbererror"+id).style.color = "red";
    }else{
      document.getElementById("elignumbererror"+id).innerHTML ="";
      this.adminApi.acceptApplication(userId,courseId,eligib_number).subscribe(data=>{
        if(data['status'] == 200){
          document.getElementById('view_eligibility'+id).style.visibility = "hidden";
          document.getElementById('documentverify'+id).style.visibility = "hidden";
          document.getElementById('acceptbutton'+id).style.visibility = "hidden";
          document.getElementById('rejectbutton'+id).style.visibility = "hidden";
          this.confirmationService.confirm({
            message: 'Application Accepted!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
        
      })
    }
  }

  rejectApplication(userId,courseId,id){
    this.adminApi.rejectApplication(userId,courseId).subscribe(data=>{
      if(data['status'] == 200){
        document.getElementById('view_eligibility'+id).style.visibility = "hidden";
        document.getElementById('documentverify'+id).style.visibility = "hidden";
        document.getElementById('acceptbutton'+id).style.visibility = "hidden";
        document.getElementById('rejectbutton'+id).style.visibility = "hidden";
        
        this.confirmationService.confirm({
          message: 'Application Rejected!!!',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            
          }
        });
      }
      
    })
  }

  acceptApplicationICCR(userId,courseId,id){
    var eligib_numbericcr = ((document.getElementById("eligib_numbericcr"+id) as HTMLInputElement).value);
    if(eligib_numbericcr==null || eligib_numbericcr==undefined || eligib_numbericcr==""||eligib_numbericcr==" "){
      document.getElementById("elignumber_iccrerror"+id).innerHTML ="Eligblity number is required";
			document.getElementById("elignumber_iccrerror"+id).style.color = "red";
    }else{
      document.getElementById("elignumber_iccrerror"+id).innerHTML ="";
      this.adminApi.acceptApplicationICCR(id,userId,courseId,eligib_numbericcr).subscribe(data=>{
        if(data['status'] == 200){
          document.getElementById('view_eligibilityiccr'+id).style.visibility = "hidden";
          document.getElementById('documentverifyiccr'+id).style.visibility = "hidden";
          document.getElementById('acceptbuttoniccr'+id).style.visibility = "hidden";
          document.getElementById('rejectbuttoniccr'+id).style.visibility = "hidden";
          this.confirmationService.confirm({
            message: 'Application Accepted!!!',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              
            }
          });
        }
        
      })
    }
  }

  rejectApplicationICCR(userId,courseId,id){
    this.adminApi.rejectApplicationICCR(userId,courseId).subscribe(data=>{
      if(data['status'] == 200){
        document.getElementById('view_eligibilityiccr'+id).style.visibility = "hidden";
        document.getElementById('documentverifyiccr'+id).style.visibility = "hidden";
        document.getElementById('acceptbuttoniccr'+id).style.visibility = "hidden";
        document.getElementById('rejectbuttoniccr'+id).style.visibility = "hidden";
        this.confirmationService.confirm({
          message: 'Application Rejected!!!',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            
          }
        });
      }
      
    })
  }

  view_reupload_transcript(userId,category){
    this.router.navigate(['pages/AdminReuploadedTranscript'],{queryParams:{userId : userId,category:category}});
  }

  DownloadFirmPDFICCR(applicationId,userId){
    this.adminApi.DownloadFirmPDFICCR(applicationId,userId).subscribe(data=>{
      if(data[`status`] == 200){
        this.adminApi.downloadFiles(data[`data`])
        .subscribe(data => {
          saveAs(data, applicationId+'_Final_Letter.pdf');    
        });
      }else{
        alert("You can't download firm letter until you allocate any college.")
      }
    })

  }

  Ticket(email){
    this.router.navigate(['pages/help'],{queryParams:{userEmail : email}});
  }

}
