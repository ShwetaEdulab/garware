import { Component, Input } from '@angular/core';
import { NbDialogRef,NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { find_College_Degree } from './find_college_degree';
import { CountriesService } from '../../../@core/data/countries.service';
@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="700"> 
<nb-card-header>
<div class="row">
  <div class="col-md-9">Degree Marks Details</div>
</div>
</nb-card-header>
  <nb-card-body>
  <form [formGroup]="degree_form"  class="step-container">
    <div class="row">
      <div class="col-md-3">Name of Degree : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_name}}" name="name_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeNameCtrl.invalid && (degree_form.controls.degreeNameCtrl.dirty || degree_form.controls.degreeNameCtrl.touched)}" placeholder="" formControlName="degreeNameCtrl" id="" class="form-control" > </div><br>
      <div class="col-md-3">Name of University/Board : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_university}}" name="univ_name_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeUniversityCtrl.invalid && (degree_form.controls.degreeUniversityCtrl.dirty || degree_form.controls.degreeUniversityCtrl.touched)}" placeholder="" formControlName="degreeUniversityCtrl" id="" class="form-control" > </div><br>
      <div class="col-md-3">School/College Name : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_coll_name}}" name="college_name_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeCollegeCtrl.invalid && (degree_form.controls.degreeCollegeCtrl.dirty || degree_form.controls.degreeCollegeCtrl.touched)}" formControlName="degreeCollegeCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-12"> <button type='button' nbButton hero status="primary" (click)="open()">Find College</button></div>
      <div class="col-md-3">Address of School/College : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_add}}" name="address_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeAddCtrl.invalid && (degree_form.controls.degreeAddCtrl.dirty || degree_form.controls.degreeAddCtrl.touched)}" formControlName="degreeAddCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">School/College Country : </div>
      <div class="col-md-9">
      <mat-form-field>
        <mat-select [(ngModel)]="degree_country" name="selectedCountry" formControlName="degreeCountryCtrl">
          <mat-option *ngFor="let country of Countries" [value]="country.name">
          {{country.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <span *ngIf="degreeCountryValidation===false" style="color:red;">Please select country</span> 
      </div><br>
      <div class="col-md-3">Email address : </div>
      <div class="col-md-9"> <input nbInput ngModel="{{degree_marks?.degree_email}}" name="email_deg" type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeEmailCtrl.invalid && (degree_form.controls.degreeEmailCtrl.dirty || degree_form.controls.degreeEmailCtrl.touched)}" formControlName="degreeEmailCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">URL : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_url}}" name="url_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeUrlCtrl.invalid && (degree_form.controls.degreeUrlCtrl.dirty || degree_form.controls.degreeUrlCtrl.touched)}" formControlName="degreeUrlCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Date Of Result : </div>
      <div class="col-md-9"> <input readonly ngModel="{{degree_marks?.degree_result_date}}" name="date_of_result_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeResultDateCtrl.invalid && (degree_form.controls.degreeResultDateCtrl.dirty || degree_form.controls.degreeResultDateCtrl.touched)}" formControlName="degreeResultDateCtrl" placeholder="DD/MM/YY" id="" class="form-control"[nbDatepicker]="picker"> <nb-datepicker #picker [(date)]="date" [max]="max"></nb-datepicker></div><br>
      <div class="col-md-3">Roll No / Seat No : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_rollNo}}" name="seat_no_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeRollNoCtrl.invalid && (degree_form.controls.degreeRollNoCtrl.dirty || degree_form.controls.degreeRollNoCtrl.touched)}" formControlName="degreeRollNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Medium of Instruction at school(English/Others) : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_medium}}" name="medium_exam_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeMediumCtrl.invalid && (degree_form.controls.degreeMediumCtrl.dirty || degree_form.controls.degreeMediumCtrl.touched)}" formControlName="degreeMediumCtrl" placeholder="" id="" class="form-control"> </div><br>

      <div class="col-md-3">Subject :</div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.Subject_first_deg}}" name="Subject_firsth_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.subjectFirstDegCtrl.invalid && (degree_form.controls.subjectFirstDegCtrl.dirty || degree_form.controls.subjectFirstDegCtrl.touched)}" formControlName="subjectFirstDegCtrl" placeholder="Subject1" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.mark_first_deg}}" name="mark_firsth_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.markFirstDegCtrl.invalid && (degree_form.controls.markFirstDegCtrl.dirty || degree_form.controls.markFirstDegCtrl.touched)}" formControlName="markFirstDegCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.OutOf_first_deg}}" name="OutOf_firsth_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.outOfFirstDegCtrl.invalid && (degree_form.controls.outOfFirstDegCtrl.dirty || degree_form.controls.outOfFirstDegCtrl.touched)}" formControlName="outOfFirstDegCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{degree_marks?.grade_first_deg}}" name="grade_firsth_deg" nbInput type="text" formControlName="gradeFirstDegCtrl"  placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.Subject_Second_deg}}" name="Subject_two_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.subjectSecondDegCtrl.invalid && (degree_form.controls.subjectSecondDegCtrl.dirty || degree_form.controls.subjectSecondDegCtrl.touched)}" formControlName="subjectSecondDegCtrl" placeholder="Subject2" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.mark_Second_deg}}" name="mark_two_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.markSecondDegCtrl.invalid && (degree_form.controls.markSecondDegCtrl.dirty || degree_form.controls.markSecondDegCtrl.touched)}" formControlName="markSecondDegCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.OutOf_Second_deg}}" name="OutOf_two_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.outOfSecondDegCtrl.invalid && (degree_form.controls.outOfSecondDegCtrl.dirty || degree_form.controls.outOfSecondDegCtrl.touched)}" formControlName="outOfSecondDegCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{degree_marks?.grade_Second_deg}}" name="grade_two_deg" nbInput type="text"  formControlName="gradeSecondDegCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.Subject_Third_deg}}" name="Subject_third_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.subjectThirdDegCtrl.invalid && (degree_form.controls.subjectThirdDegCtrl.dirty || degree_form.controls.subjectThirdDegCtrl.touched)}" formControlName="subjectThirdDegCtrl" placeholder="Subject3" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.mark_Third_deg}}" name="mark_third_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.markThirdDegCtrl.invalid && (degree_form.controls.markThirdDegCtrl.dirty || degree_form.controls.markThirdDegCtrl.touched)}" formControlName="markThirdDegCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.OutOf_Third_deg}}" name="OutOf_third_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.outOfThirdDegCtrl.invalid && (degree_form.controls.outOfThirdDegCtrl.dirty || degree_form.controls.outOfThirdDegCtrl.touched)}" formControlName="outOfThirdDegCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{degree_marks?.grade_Third_deg}}" name="grade_third_deg" nbInput type="text" formControlName="gradeThirdDegCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{degree_marks?.Subject_fourth_deg}}" name="Subject_fourth_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.subjectFourthDegCtrl.invalid && (degree_form.controls.subjectFourthDegCtrl.dirty || degree_form.controls.subjectFourthDegCtrl.touched)}" formControlName="subjectFourthDegCtrl" placeholder="Subject4" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.mark_fourth_deg}}" name="mark_fourth_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.markFourthDegCtrl.invalid && (degree_form.controls.markFourthDegCtrl.dirty || degree_form.controls.markFourthDegCtrl.touched)}" formControlName="markFourthDegCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.OutOf_fourth_deg}}" name="OutOf_fourth_deg" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.outOfFourthDegCtrl.invalid && (degree_form.controls.outOfFourthDegCtrl.dirty || degree_form.controls.outOfFourthDegCtrl.touched)}" formControlName="outOfFourthDegCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{degree_marks?.grade_fourth_deg}}" name="grade_fourth_deg" nbInput type="text" formControlName="gradeFourthDegCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.Subject_fifth_deg}}" name="Subject_fifth_deg" nbInput type="text" formControlName="subjectFifthDegCtrl" placeholder="Subject5" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.mark_fifth_deg}}" name="mark_fifth_deg" nbInput type="text" formControlName="markFifthDegCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.OutOf_fifth_deg}}" name="OutOf_fifth_deg" nbInput type="text" formControlName="outOfFifthDegCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{degree_marks?.grade_fifth_deg}}" name="grade_fifth_deg" nbInput type="text" formControlName="gradeFifthDegCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.Subject_Six_deg}}" name="Subject_Six_deg" nbInput type="text" formControlName="subjectSixthDegCtrl" placeholder="Subject6" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.mark_Six_deg}}" name="mark_Six_deg" nbInput type="text" formControlName="markSixthDegCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{degree_marks?.OutOf_Six_deg}}" name="OutOf_Six_deg" nbInput type="text" formControlName="outOfSixthDegCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{degree_marks?.grade_Six_deg}}" name="grade_Six_deg" nbInput type="text" formControlName="gradeSixthDegCtrl" placeholder="Grade" id="" class="form-control"> </div><br>

      <div class="col-md-3">CGPA or Marks in % : </div>
      <div class="col-md-9"> <input ngModel="{{degree_marks?.degree_marks}}" name="degree_marks" nbInput type="text" [ngClass]="{'form-control-danger': degree_form.controls.degreeMarksCtrl.invalid && (degree_form.controls.degreeMarksCtrl.dirty || degree_form.controls.degreeMarksCtrl.touched)}" formControlName="degreeMarksCtrl" placeholder="" id="" class="form-control"> </div><br>
    </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button>
    <button nbButton hero status="primary" style="margin-left:15px" (click)="savedegree()">Update</button>
  </nb-card-footer>
</nb-card>
`,
})
export class FourthDialogComponent {
@Input() title: string;
degree_marks;
degree_form: FormGroup;
degree_country;
max;
date;
degreeCountryValidation = true;
Countries: any [];
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
degree_result_date: any;

constructor(protected ref: NbDialogRef<FourthDialogComponent>,
  protected api : ApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  protected countries :CountriesService,
  public themeService : NbThemeService
) {
  this.Countries = this.countries.getData();
  }

  dismiss() {
    this.ref.close();
  }

  ngOnInit() {
     this.api.getTheme().subscribe((data: any) => {
        if(data['data']){
          this.themeService.changeTheme(data['data']);
        }else{
          this.themeService.changeTheme('default');
        }
      });
    this.buildDegreeForm();
  }

  savedegree() {
    
    if (this.degree_form.valid==false){
      
      this.degree_form.controls.degreeNameCtrl.markAsDirty();
      this.degree_form.controls.degreeUniversityCtrl.markAsDirty();
      this.degree_form.controls.degreeCollegeCtrl.markAsDirty();
      this.degree_form.controls.degreeAddCtrl.markAsDirty();
      // this.degree_form.controls.degreeCountryCtrl.markAsDirty();
      this.degree_form.controls.degreeEmailCtrl.markAsDirty();
      this.degree_form.controls.degreeUrlCtrl.markAsDirty();
      this.degree_form.controls.degreeResultDateCtrl.markAsDirty();
      this.degree_form.controls.degreeRollNoCtrl.markAsDirty();
      this.degree_form.controls.degreeMediumCtrl.markAsDirty();
      this.degree_form.controls.subjectFirstDegCtrl.markAsDirty();
      this.degree_form.controls.markFirstDegCtrl.markAsDirty();
      this.degree_form.controls.outOfFirstDegCtrl.markAsDirty();
      
      this.degree_form.controls.subjectSecondDegCtrl.markAsDirty();
      this.degree_form.controls.markSecondDegCtrl.markAsDirty();
      this.degree_form.controls.outOfSecondDegCtrl.markAsDirty();
      
      this.degree_form.controls.subjectThirdDegCtrl.markAsDirty();
      this.degree_form.controls.markThirdDegCtrl.markAsDirty();
      this.degree_form.controls.outOfThirdDegCtrl.markAsDirty();
      
      this.degree_form.controls.subjectFourthDegCtrl.markAsDirty();
      this.degree_form.controls.markFourthDegCtrl.markAsDirty();
      this.degree_form.controls.outOfFourthDegCtrl.markAsDirty();
      
      this.degree_form.controls.degreeMarksCtrl.markAsDirty();

      if(this.degree_form.controls.degreeCountryCtrl.value === null || this.degree_form.controls.degreeCountryCtrl.value ==='' || this.degree_form.controls.degreeCountryCtrl.value ===undefined){
    
        this.degreeCountryValidation = false;
        
      }else {
        
        this.degreeCountryValidation = true;
        
      }
      
    }else{
      
      var degreee_data ={
        degreeName : this.degree_form.controls.degreeNameCtrl.value,
        degreeUniversity : this.degree_form.controls.degreeUniversityCtrl.value,
        degreeCollege : this.degree_form.controls.degreeCollegeCtrl.value,
        degreeCountry : this.degree_form.controls.degreeCountryCtrl.value,
        degreeAdd : this.degree_form.controls.degreeAddCtrl.value,
        degreeEmail : this.degree_form.controls.degreeEmailCtrl.value,
        degreeUrl : this.degree_form.controls.degreeUrlCtrl.value,
        degreeResultDate: this.degree_form.controls.degreeResultDateCtrl.value,
        degreeRollNo: this.degree_form.controls.degreeRollNoCtrl.value,
        degreeMedium: this.degree_form.controls.degreeMediumCtrl.value,
        subjectFirstDeg: this.degree_form.controls.subjectFirstDegCtrl.value,
        markFirstDeg: this.degree_form.controls.markFirstDegCtrl.value,
        outOfFirstDeg: this.degree_form.controls.outOfFirstDegCtrl.value,
        gradeFirstDeg: this.degree_form.controls.gradeFirstDegCtrl.value,
        
        subjectSecondDeg: this.degree_form.controls.subjectSecondDegCtrl.value,
        markSecondDeg: this.degree_form.controls.markSecondDegCtrl.value,
        outOfSecondDeg: this.degree_form.controls.outOfSecondDegCtrl.value,
        gradeSecondDeg: this.degree_form.controls.gradeSecondDegCtrl.value,
        
        subjectThirdDeg: this.degree_form.controls.subjectThirdDegCtrl.value,
        markThirdDeg: this.degree_form.controls.markThirdDegCtrl.value,
        outOfThirdDeg: this.degree_form.controls.outOfThirdDegCtrl.value,
        gradeThirdDeg: this.degree_form.controls.gradeThirdDegCtrl.value,
        
        subjectFourthDeg: this.degree_form.controls.subjectFourthDegCtrl.value,
        markFourthDeg: this.degree_form.controls.markFourthDegCtrl.value,
        outOfFourthDeg: this.degree_form.controls.outOfFourthDegCtrl.value,
        gradeFourthDeg: this.degree_form.controls.gradeFourthDegCtrl.value,

        subjectFifthDeg: this.degree_form.controls.subjectFifthDegCtrl.value,
        markFifthDeg: this.degree_form.controls.markFifthDegCtrl.value,
        outOfFifthDeg: this.degree_form.controls.outOfFifthDegCtrl.value,
        gradeFifthDeg: this.degree_form.controls.gradeFifthDegCtrl.value,

        subjectSixthDeg: this.degree_form.controls.subjectSixthDegCtrl.value,
        markSixthDeg: this.degree_form.controls.markSixthDegCtrl.value,
        outOfSixthDeg: this.degree_form.controls.outOfSixthDegCtrl.value,
        gradeSixthDeg: this.degree_form.controls.gradeSixthDegCtrl.value,
        
        degreeMarks: this.degree_form.controls.degreeMarksCtrl.value,
      }
        this.api.setProfileValues(degreee_data,'Education_Degree')
        .subscribe(
          (data: any) => {  
            this.ref.close(degreee_data);
            err => console.error(err) 
        });
    }
    
  }


  private buildDegreeForm() : void{
         
    this.api.getProfileValue('Education_degree')
      .subscribe(
        (data: any) => {  
          this.degree_marks =  data['data']['degree_info'];
          if(this.degree_marks == null){
            this.degree_result_date = null;
          }else{
            this.degree_result_date = new Date(data['data']['degree_info']['degree_result_date']);
          }
          if(!( data['data']['degree_info'] == null || data['data']['degree_info'] == undefined || data['data']['degree_info'] == '' )){
            this.degree_country = data['data']['degree_info']['degree_country'];
          }
          err => console.error(err)
      });

        this.degree_form = this.fb.group({
          degreeNameCtrl: [ '' ,  Validators.required],
          degreeUniversityCtrl: [ '' ,  Validators.required],
          degreeCollegeCtrl: ['', Validators.required],
          degreeCountryCtrl:['',  Validators.required],
          degreeAddCtrl:['',  Validators.required],
          degreeEmailCtrl:  ['', [Validators.required,Validators.pattern(this.emailValidate)]],  
          degreeUrlCtrl:['',  Validators.required],
          degreeResultDateCtrl: [ '',  Validators.required],
          degreeRollNoCtrl:['',  Validators.required],
          degreeMediumCtrl:['',  Validators.required],
          subjectFirstDegCtrl:['', Validators.required],
          markFirstDegCtrl:['',  Validators.required],
          outOfFirstDegCtrl:['',  Validators.required],
          gradeFirstDegCtrl : [''],
          subjectSecondDegCtrl:['', Validators.required],
          markSecondDegCtrl:['', Validators.required],
          outOfSecondDegCtrl:['',Validators.required ],
          gradeSecondDegCtrl : [''],
          subjectThirdDegCtrl:['',  Validators.required],
          markThirdDegCtrl:['', Validators.required],
          outOfThirdDegCtrl:['', Validators.required],
          gradeThirdDegCtrl:[''],
          subjectFourthDegCtrl:['', Validators.required],
          markFourthDegCtrl:['', Validators.required],
          outOfFourthDegCtrl:['', Validators.required],
          gradeFourthDegCtrl : [''],
          subjectFifthDegCtrl:['',],
          markFifthDegCtrl:['', ],
          outOfFifthDegCtrl:['', ],
          gradeFifthDegCtrl : [''],
          subjectSixthDegCtrl:['',],
          markSixthDegCtrl:['', ],
          outOfSixthDegCtrl:['', ],
          gradeSixthDegCtrl : [''],
          degreeMarksCtrl:['',Validators.required ], 
        });
  }
  
  open() {
    this.dialogService.open(find_College_Degree).onClose
    .subscribe(
     (data: any) => {
      if(data!==undefined){
        this.degree_form.controls['degreeEmailCtrl'].setValue(data[0].school_email);
        this.degree_form.controls['degreeCollegeCtrl'].setValue(data[0].school_name);
        this.degree_form.controls['degreeCountryCtrl'].setValue(data[0].school_country);
        this.degree_form.controls['degreeAddCtrl'].setValue(data[0].school_add);
        this.degree_form.controls['degreeUrlCtrl'].setValue(data[0].school_url);
      }  
       err => console.error(err)
     }
    );
   }
    


}
