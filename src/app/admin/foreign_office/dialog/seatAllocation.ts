import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../../app/shared/api.service';
import { AdminApiService } from '../../../../app/shared/adminapi.service';
import { FormBuilder } from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import { NbAuthJWTToken,NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
selector: 'nb-dialog',
providers:[ConfirmationService],
template: `
<nb-card style="font-size: 19px" class="col-md-6 offset-md-3" status="success" [style.overflow]="'auto'" [style.height.px]="500" [style.width.px]="1500">
    <nb-card-header><h2>Seat Allocation</h2></nb-card-header>
    <nb-card-body>
        <div class="row" style="margin-bottom:7px">
            <h5>Student Name : {{listdata?.user.name}}</h5>
        </div>
        <div class="row" style="margin-bottom:7px">
            <h5>Student Category : {{listdata?.user.student_category}}</h5>
        </div>
        <div class="row" style="margin-bottom:7px">
            <h5>Apply Course Name : {{listdata?.course_name}}</h5>
        </div>
        <div class="row" style="margin-bottom:7px">
            <h5>Remaining Seats : {{listdata?.seats}}</h5>
        </div>
        <br>
        <div class="row">
            <table class="table-bordered" style="width: 100%;border: 2px solid black;">
                <tbody>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>Category</h5></th>
                        <th style="padding: 8px;text-align: left;"><h5>Seats</h5></th>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>1. S.C. Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.SC_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="1" (click)="checkradio('S.C')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>2. S.T. Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.ST_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="2" (click)="checkradio('S.T')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>3. D.T.(A) Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.DTA_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="3" (click)="checkradio('D.T.(A)')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>4. N.T.(B) Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.NTB_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="4" (click)="checkradio('N.T.(B)')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>5. N.T.(C) Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.NTC_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="5" (click)="checkradio('N.T.(C)')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>6. N.T.(D) Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.NTD_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="6" (click)="checkradio('N.T.(D)')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>7. O.B.C. Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.OBC_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="7" (click)="checkradio('O.B.C.')" />
                        </td>
                    </tr>
                    <tr style="border: 2px solid black;">
                        <th style="padding: 8px;text-align: left;"><h5>8. GENERAL Seats</h5></th>
                        <td style="padding: 8px;text-align: left;">
                            <h5>{{listdata?.intake.GENERAL_seats}}</h5><input id="rdb1" type="radio" name="address_Radio" value="8" (click)="checkradio('GENERAL')" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </nb-card-body>
    <nb-card-footer>
        <div class="row">
            <div class="col-xl-6">
                <button nbButton status="info" (click)="allocateSeat( userid, appid, courseid)" >Allocate</button>
                <span *ngIf="errorshow == true" style="color:red;">Please Select One Category</span>
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
selectedCategory;
errorshow = false;

constructor(protected ref: NbDialogRef<SeatAllocationDialogComponent>,
  protected api : ApiService,
  protected adminApi : AdminApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  public themeService : NbThemeService,
  private confirmationService: ConfirmationService,
  private authService : NbAuthService,
  private router : Router,
) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      console.log("token.getPayload()['role']"+token.getPayload()['role']);
      if(token.getPayload()['role'] !="admin"){
        this.router.navigate(['auth/logout'])
      }
    });
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
        if(this.selectedCategory==undefined){
            this.errorshow = true;
        }else{
            this.adminApi.allocateSeat(userid, courseid, appid,this.selectedCategory).subscribe(
            (data: any) => {
                if(data[status]=='200'){
                    alert(data['message']);
                    this.ref.close();
                }else{
                    alert(data['message']);
                    this.ref.close();
                }
            });
        } 
    }

    checkradio(value){
        this.selectedCategory = value;
    }

}
