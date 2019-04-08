import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../../app/shared/api.service';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder } from '@angular/forms';
import { MoreCollegesDialogComponent } from './addMorePreference';
import {ConfirmationService} from 'primeng/api';

@Component({
selector: 'nb-dialog',
providers:[ConfirmationService],
template: `
<nb-card style="font-size: 20px" class="col-md-6 offset-md-3" [style.overflow]="'auto'" [style.height.px]="400" [style.width.px]="1000">
    <nb-card-header><h2>Seat Allocation</h2></nb-card-header>
    <nb-card-body>
        <div class="row" style="margin-bottom:7px">
            Remaining Seats : {{listdata?.seats}}
        </div>
        <div class="row">
            Course Name : {{listdata?.course_name}}
        </div>
    </nb-card-body>
    <nb-card-footer>
        <div class="row">
            <div class="col-xl-6">
                <button nbButton status="info" (click)="allocateSeat( userid, appid, courseid)" >Allocate</button>
            </div>
            <div class="col-xl-6">
                <button nbButton hero status="primary" (click)="dismiss()">Close</button>
            </div>            
        </div> 
    </nb-card-footer>
</nb-card>
`,
})
export class SeatAllocationDialogComponent {
@Input() userid: string;
@Input() appid: string;
@Input() courseid: string;
display: boolean = false;
dialog_Message :string='';
loading = false;
max;
college_length;
date;
collegeListData;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;
message;
seats;
    listdata: any;

constructor(protected ref: NbDialogRef<SeatAllocationDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,) {
    
  }

  dismiss() {
    this.ref.close();
  }
  
    ngOnInit() {
        this.loading = true;
        this.api.getTheme().subscribe((data: any) => {
            if(data['data']){
            this.themeService.changeTheme(data['data']);
            }else{
            this.themeService.changeTheme('default');
            }
        });
        
        this.adminApi.totalseats(this.userid,this.courseid,this.appid).subscribe(
            (data: any) => {
                this.listdata =  data['data'];
        });
    
    }

    allocateSeat( userid, appid, courseid){
        this.adminApi.allocateSeat(userid, courseid, appid).subscribe(
            (data: any) => {
                if(data[status]=='200'){
                    console.log("200000000000000000");
                    alert(data['message']);
                    this.ref.close();
                }else{
                    console.log("Errorrrrrrrrrrrrr");
                    alert(data['message']);
                    this.ref.close();
                }
        }); 
    }

}
