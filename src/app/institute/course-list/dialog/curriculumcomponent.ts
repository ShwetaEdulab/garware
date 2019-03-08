import { Component, Input, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef,} from '@angular/core';
import { NbDialogRef, NbThemeService, NbToastrService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { config } from '../../../../../config';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup,Validators, FormArray, FormControl } from '@angular/forms';
import { InstituteApiService } from '../../../shared/instituteapi.service';

@Component({
selector: 'nb-dialog',
template: `
<nb-card [style.height.px]="700">
  <nb-card-header>
    <div class="modal-header">               
      <div class="popupTitle"><h4>Add Academics</h4></div>
      <button nbButton shape="semi-round" size="small" outline (click)="dismiss()">Close</button>
    </div>
  </nb-card-header>
  <nb-card-body>
  </nb-card-body>
  <nb-card-footer>
  </nb-card-footer>
</nb-card>
`,
providers:[ConfirmationService],
})

export class curriculumComponent {

  myForm: FormGroup;
  @Input() title: string;
  @Input()  courseID :string;
  @Input()  currId :string;
  
  semesterValues = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
  "Semester 9",
  "Semester 10",
  "Semester 11",
  "Semester 12",
  "Semester 13",
  "Semester 14",
  "Semester 15",
];
subjecterror = false;
user = { name : "", id:"",collegeId:""};
collegeId;
multiple_subjects=[];
singleSubject;
semesterName;

  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<curriculumComponent>,
    protected instituteApi : InstituteApiService,
    protected api : ApiService,
    private userService: UserService,
    public themeService : NbThemeService,
    
  ) {}

  ngOnInit() {
    this.api.getTheme().subscribe((data: any) => {
      if(data['data']){
        this.themeService.changeTheme(data['data']);
      }else{
        this.themeService.changeTheme('default');
      }
    });

    // build the form model
    this.myForm = this.fb.group({
      selectedsemesterCtrl : ['', [Validators.required,]],
      items: this.fb.array(
        [ ], // this.buildItem('')ItemsValidator.minQuantitySum(300)
      )
    })

    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.collegeId = user['collegeId'];
    });

    if(this.currId!=null){
      console.log("this.currId=====>"+this.currId);
      this.instituteApi.getCurriculum(this.currId,this.courseID,this.collegeId).subscribe(
        (data: any) => {
          if(data['status']== 200){
           // console.log("Course Details save successfully");
            console.log("this.data============>"+JSON.stringify(data['data']));
            //console.log("JSON.parse(this.subjects)============>"+JSON.parse(data['data']['subjects'])); 
            this.semesterName = data['data']['name'];
            var subjects = JSON.parse(data['data']['subjects']);
            var subjects_length = JSON.parse(data['data']['subjects']).length;
            //console.log("subjects_length========>"+subjects_length);
            this.multiple_subjects = subjects;
            subjects.forEach(subject =>{
              //console.log("subject=======>"+subject);
              this.singleSubject = subject;
              //console.log("this.singleSubject========>"+this.singleSubject)
              let element : HTMLElement = document.getElementById('subAdd') as HTMLElement;
              element.click();
            })
          }
          err => console.error(err)
      });
    }
  }

  submit() {
    console.log("this.myForm.value: ", this.myForm.value);
    console.log("this.myForm.value.items ", this.myForm.value.items.length);
    console.log("this.myForm.valid: ", this.myForm.valid);
    if(this.myForm.valid && this.myForm.value.items.length > 0){
      var semester = this.myForm.value.selectedsemesterCtrl;
      var subjects_values = this.myForm.value.items;
      var subjects_length = this.myForm.value.items.length;
      var all_subject_array = [];
      subjects_values.forEach(function(element) {
        all_subject_array.push(element.name);
      });
      this.instituteApi.addUpdateCurriculum(this.collegeId,this.courseID,semester,all_subject_array,this.currId).subscribe(
        (data: any) => {
          if(data['status']== 200){
            console.log("Course Details save successfully");
            this.ref.close();
          }
          err => console.error(err)
      });
    }else if(!this.myForm.valid){
      this.subjecterror = true;
    }else if(this.myForm.value.items.length == 0){
      this.subjecterror = true;
    }
  }

  buildItem(val: string) {
    console.log("11111111111111");
    return new FormGroup({
      name: new FormControl(val, Validators.required),
      //quantity: new FormControl(100)
    })
  }

  buildItemNew(val) {
    console.log("val=========?"+val);
    var subjects = this.multiple_subjects;
    return new FormGroup({
      name: new FormControl(''+val, Validators.required),
    })
  }

  dismiss() {
    this.ref.close();
  }

}