import { Component, Input} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import {FileUploadModule} from 'primeng/fileupload';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [nbSpinner]="loading" nbSpinnerStatus="danger" nbSpinnerSize="xlarge">
  <nb-card-header>Add transcription</nb-card-header>
  <nb-card-body>
    <div class="row">
      <div class="col-xl-12" style='center;'>
        <b>Transcript Name :</b>
        <input type="text" class="form-control" (input)="onSearchChange($event.target.value)" [(ngModel)]="transcript_name" name='inputTranscriptName' id="inputTranscriptName" placeholder="Transcript Name">
      </div><br><br><br>
      <div class="col-xl-12" *ngIf="showUpload == true">
        <p-fileUpload class="form-control" [accept]= "'.pdf,.jpg,.jpeg,.png'" mode="basic" auto="true" chooseLabel="Browse"
          name="file" url="http://mu.admissiondesk.org:5000/api/uploadtranscript?userid={{user?.id}}&transcript_name={{transcript_name}}&more=true" 
          maxFileSize="5000000" (onBeforeSend)="onBeforeSend($event)"
          (onUpload)="onUpload($event)" 
          (onSelect)="onSelect($event);">
        </p-fileUpload>
      </div>
    </div>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button>
  </nb-card-footer>
</nb-card>
`,
})
export class TranscriptDialogComponent {
@Input() title: string;
cbse_marks;
currenttoken;
showUpload;
loading = false;
user = { name : "", id:""};
transcript_name;

constructor(
  protected ref: NbDialogRef<TranscriptDialogComponent>,
  protected api : ApiService,
  private authService: NbAuthService,
  private userService: UserService,
  ) 
  {}

  dismiss() {
  this.ref.close();
  }

  onBeforeSend(event) {
    this.loading = true;
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
       this.currenttoken = token;
        event.xhr.setRequestHeader("Authorization", `Bearer ` +this.currenttoken);
        event.formData.append('token',''+this.currenttoken);
        }
    });
  }
  
  onUpload(event) {
      const reader = new FileReader();
      if(event.files && event.files.length) {
        const [file] = event.files;
        reader.readAsDataURL(file);
        this.loading = false;
        this.ref.close(file);
      }
  
  }
  
  selectedFile: File;

  onSelect(event: any) {
    const file = event.files[0];
    this.selectedFile = event.files[0]
  }
  ngOnInit() {
    this.api.getTheme();
    this.userService.onUserChange()
      .subscribe((user: any) => {
        this.user = user;
        this.showUpload = false;
      });
   }

   onSearchChange(searchValue : string ) {
    if(searchValue.length > 3){
      this.showUpload = true;
    }else{
      this.showUpload = false;
    }
    
  }
  
}
