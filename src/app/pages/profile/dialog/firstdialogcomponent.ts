import { Component, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService } from '@nebular/theme';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { find_College_SSC } from './find_college_ssc';
import { CountriesService } from '../../../@core/data/countries.service';
@Component({
selector: 'nb-dialog',
template: `
<nb-card class="col-xl-6 offset-xl-3" [style.height.px]="700"> 
<nb-card-header>
<div class="row">
  <div class="col-md-9">CBSE/ICSE/SSC Marks Details </div>
</div>
</nb-card-header>
  <nb-card-body>
  <form [formGroup]="ssc_form"  class="step-container">
    <div class="row">
      <div class="col-md-3">Name of University/Board : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.university}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.sscUniversityCtrl.invalid && (ssc_form.controls.sscUniversityCtrl.dirty || ssc_form.controls.sscUniversityCtrl.touched)}" formControlName="sscUniversityCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">School/College Name : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_name}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscCollegeCtrl.invalid && (ssc_form.controls.sscCollegeCtrl.dirty || ssc_form.controls.sscCollegeCtrl.touched)}" formControlName="sscCollegeCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-12"> <button type='button' nbButton hero status="primary" (click)="open()">Find School</button></div>
      <div class="col-md-3">Address of School/College : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_add}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscAddCtrl.invalid && (ssc_form.controls.sscAddCtrl.dirty || ssc_form.controls.sscAddCtrl.touched)}" formControlName="sscAddCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">School/College Country : </div>
      <div class="col-md-9">
      <mat-form-field>
        <mat-select [(ngModel)]="cbse_country" name="selectedCountry"   formControlName="sscCountryCtrl">
          <mat-option *ngFor="let country of Countries" [value]="country.name">
          {{country.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <span *ngIf="sscCountryValidation===false" style="color:red;">Please select country</span> 
      </div><br>
      <div class="col-md-3">Email address : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_email}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscEmailCtrl.invalid && (ssc_form.controls.sscEmailCtrl.dirty || ssc_form.controls.sscEmailCtrl.touched)}" formControlName="sscEmailCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">URL : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_url}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscUrlCtrl.invalid && (ssc_form.controls.sscUrlCtrl.dirty || ssc_form.controls.sscUrlCtrl.touched)}" formControlName="sscUrlCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Date Of Result : </div>
      <div class="col-md-9"> <input readonly ngModel="{{cbse_marks?.result_date}}" nbInput [ngClass]="{'form-control-danger': ssc_form.controls.sscResultDateCtrl.invalid && (ssc_form.controls.sscResultDateCtrl.dirty || ssc_form.controls.sscResultDateCtrl.touched)}" formControlName="sscResultDateCtrl" placeholder="DD/MM/YY" class="form-control" [nbDatepicker]="picker"> <nb-datepicker #picker [(date)]="date" [max]="max"></nb-datepicker></div><br>
      <div class="col-md-3">Roll No / Seat No : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_rollNo}}" nbInput type="text"  [ngClass]="{'form-control-danger': ssc_form.controls.sscRollNoCtrl.invalid && (ssc_form.controls.sscRollNoCtrl.dirty || ssc_form.controls.sscRollNoCtrl.touched)}" formControlName="sscRollNoCtrl" placeholder="" id="" class="form-control"> </div><br>
      <div class="col-md-3">Medium of Instruction at school(English/Others) : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_medium}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.sscMediumCtrl.invalid && (ssc_form.controls.sscMediumCtrl.dirty || ssc_form.controls.sscMediumCtrl.touched)}" formControlName="sscMediumCtrl" placeholder="" id="" class="form-control"> </div><br>

      <div class="col-md-3">Subject :</div>
      <div class="col-md-2"><input ngModel="{{cbse_marks?.Subject_first}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectFirstsscCtrl.invalid && (ssc_form.controls.subjectFirstsscCtrl.dirty || ssc_form.controls.subjectFirstsscCtrl.touched)}" formControlName="subjectFirstsscCtrl" placeholder="Subject1" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{cbse_marks?.mark_first}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markFirstsscCtrl.invalid && (ssc_form.controls.markFirstsscCtrl.dirty || ssc_form.controls.markFirstsscCtrl.touched)}" formControlName="markFirstsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{cbse_marks?.OutOf_first}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfFirstsscCtrl.invalid && (ssc_form.controls.outOfFirstsscCtrl.dirty || ssc_form.controls.outOfFirstsscCtrl.touched)}" formControlName="outOfFirstsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{cbse_marks?.grade_first}}" nbInput type="text" formControlName="gradeFirstsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_Second}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectSecondsscCtrl.invalid && (ssc_form.controls.subjectSecondsscCtrl.dirty || ssc_form.controls.subjectSecondsscCtrl.touched)}" formControlName="subjectSecondsscCtrl" placeholder="Subject2" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.mark_Second}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markSecondsscCtrl.invalid && (ssc_form.controls.markSecondsscCtrl.dirty || ssc_form.controls.markSecondsscCtrl.touched)}" formControlName="markSecondsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.OutOf_Second}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfSecondsscCtrl.invalid && (ssc_form.controls.outOfSecondsscCtrl.dirty || ssc_form.controls.outOfSecondsscCtrl.touched)}" formControlName="outOfSecondsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input  ngModel="{{cbse_marks?.grade_Second}}" nbInput type="text" formControlName="gradeSecondsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_Third}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectThirdsscCtrl.invalid && (ssc_form.controls.subjectThirdsscCtrl.dirty || ssc_form.controls.subjectThirdsscCtrl.touched)}" formControlName="subjectThirdsscCtrl" placeholder="Subject3" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.mark_Third}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markThirdsscCtrl.invalid && (ssc_form.controls.markThirdsscCtrl.dirty || ssc_form.controls.markThirdsscCtrl.touched)}" formControlName="markThirdsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.OutOf_Third}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfThirdsscCtrl.invalid && (ssc_form.controls.outOfThirdsscCtrl.dirty || ssc_form.controls.outOfThirdsscCtrl.touched)}" formControlName="outOfThirdsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input  ngModel="{{cbse_marks?.grade_Third}}" nbInput type="text" formControlName="gradeThirdsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_fourth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.subjectFourthsscCtrl.invalid && (ssc_form.controls.subjectFourthsscCtrl.dirty || ssc_form.controls.subjectFourthsscCtrl.touched)}" formControlName="subjectFourthsscCtrl" placeholder="Subject4" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.mark_fourth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.markFourthsscCtrl.invalid && (ssc_form.controls.markFourthsscCtrl.dirty || ssc_form.controls.markFourthsscCtrl.touched)}" formControlName="markFourthsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.OutOf_fourth}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.outOfFourthsscCtrl.invalid && (ssc_form.controls.outOfFourthsscCtrl.dirty || ssc_form.controls.outOfFourthsscCtrl.touched)}" formControlName="outOfFourthsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input  ngModel="{{cbse_marks?.grade_fourth}}" nbInput type="text" formControlName="gradeFourthsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.Subject_fifth}}" nbInput type="text" formControlName="subjectFifthsscCtrl" placeholder="Subject5" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.mark_fifth}}" nbInput type="text" formControlName="markFifthsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input  ngModel="{{cbse_marks?.OutOf_fifth}}" nbInput type="text" formControlName="outOfFifthsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input  ngModel="{{cbse_marks?.grade_fifth}}" nbInput type="text" formControlName="gradeFifthsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>
      <div class="col-md-3"></div>
      <div class="col-md-2"><input ngModel="{{cbse_marks?.Subject_Six}}" nbInput type="text" formControlName="subjectSixthsscCtrl" placeholder="Subject6" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{cbse_marks?.mark_Six}}" nbInput type="text" formControlName="markSixthsscCtrl" placeholder="Marks" id="" class="form-control"></div>
      <div class="col-md-2"><input ngModel="{{cbse_marks?.OutOf_Six}}" nbInput type="text" formControlName="outOfSixthsscCtrl" placeholder="Out of" id="" class="form-control"></div> OR <div
        class="col-md-2"> <input ngModel="{{cbse_marks?.grade_Six}}" nbInput type="text" formControlName="gradeSixthsscCtrl" placeholder="Grade" id="" class="form-control"> </div><br>

      <div class="col-md-3">CGPA or Marks in % : </div>
      <div class="col-md-9"> <input ngModel="{{cbse_marks?.school_marks}}" nbInput type="text" [ngClass]="{'form-control-danger': ssc_form.controls.sscMarksCtrl.invalid && (ssc_form.controls.sscMarksCtrl.dirty || ssc_form.controls.sscMarksCtrl.touched)}" formControlName="sscMarksCtrl" placeholder="" id="" class="form-control"> </div><br>
    </div>
    </form>
  </nb-card-body>
  <nb-card-footer>
    <button nbButton hero status="primary" (click)="dismiss()">Close</button> 
    <button nbButton hero status="primary" style="margin-left:15px;" (click)="saveSsc()" >Update</button>
  </nb-card-footer>
</nb-card>
`,
})
export class FirstDialogComponent {
@Input() title: string;
cbse_marks;
ssc_form: FormGroup;
Countries: any [];
cbse_country;
sscCountryValidation = true;
max;
date;
readonly emailValidate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
result_date: any;

constructor(protected ref: NbDialogRef<FirstDialogComponent>,
  protected api : ApiService,
  private fb: FormBuilder,
  private dialogService: NbDialogService,
  protected countries :CountriesService,
  public themeService : NbThemeService) {
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
    this.buildsscForm();
  }

  private buildsscForm() : void{
    
         
    this.api.getProfileValue('Education_SSC') 
      .subscribe(
        (data: any) => {  
          this.cbse_marks =  data['data']['ssc_info'];
          if(this.cbse_marks == null){
            this.result_date = null;
          }else{
            this.result_date = new Date(data['data']['ssc_info']['result_date']);
          }
          if(!( data['data']['ssc_info'] == null || data['data']['ssc_info'] == undefined || data['data']['ssc_info'] == '' )){
            this.cbse_country = data['data']['ssc_info']['school_country'];
          }
          err => console.error(err)
      });
      
        this.ssc_form = this.fb.group({
          sscUniversityCtrl: [ '' ,  Validators.required],
          sscCollegeCtrl: ['', Validators.required],
          sscAddCtrl:['',  Validators.required],
          sscEmailCtrl: ['', [Validators.required,Validators.pattern(this.emailValidate)]], 
          sscUrlCtrl:['',  Validators.required],
          sscResultDateCtrl: [ '',  Validators.required],
          sscRollNoCtrl:['',  Validators.required],
          sscCountryCtrl:['',  Validators.required],
          sscMediumCtrl:['',  Validators.required],
          subjectFirstsscCtrl:['', Validators.required],
          markFirstsscCtrl:['',  Validators.required],
          outOfFirstsscCtrl:['',  Validators.required],
          gradeFirstsscCtrl : [''],
          subjectSecondsscCtrl:['', Validators.required],
          markSecondsscCtrl:['', Validators.required],
          outOfSecondsscCtrl:['',Validators.required ],
          gradeSecondsscCtrl : [''],
          subjectThirdsscCtrl:['',  Validators.required],
          markThirdsscCtrl:['', Validators.required],
          outOfThirdsscCtrl:['', Validators.required],
          gradeThirdsscCtrl:[''],
          subjectFourthsscCtrl:['', Validators.required],
          markFourthsscCtrl:['', Validators.required],
          outOfFourthsscCtrl:['', Validators.required],
          gradeFourthsscCtrl : [''],
          subjectFifthsscCtrl:['',],
          markFifthsscCtrl:['', ],
          outOfFifthsscCtrl:['',],
          gradeFifthsscCtrl : [''],
          subjectSixthsscCtrl:['',],
          markSixthsscCtrl:['',],
          outOfSixthsscCtrl:['',],
          gradeSixthsscCtrl : [''],
          sscMarksCtrl:['', Validators.required],
        });
    }

    saveSsc() {
      
      
      if (this.ssc_form.valid==false){
        this.ssc_form.controls.sscUniversityCtrl.markAsDirty();
        this.ssc_form.controls.sscCollegeCtrl.markAsDirty();
        this.ssc_form.controls.sscAddCtrl.markAsDirty();
        this.ssc_form.controls.sscEmailCtrl.markAsDirty();
        this.ssc_form.controls.sscUrlCtrl.markAsDirty();
        //this.ssc_form.controls.sscCountryCtrl.markAsDirty();
        this.ssc_form.controls.sscResultDateCtrl.markAsDirty();
        this.ssc_form.controls.sscRollNoCtrl.markAsDirty();
        this.ssc_form.controls.sscMediumCtrl.markAsDirty();
        this.ssc_form.controls.subjectFirstsscCtrl.markAsDirty();
        this.ssc_form.controls.markFirstsscCtrl.markAsDirty();
        this.ssc_form.controls.outOfFirstsscCtrl.markAsDirty();
        
        this.ssc_form.controls.subjectSecondsscCtrl.markAsDirty();
        this.ssc_form.controls.markSecondsscCtrl.markAsDirty();
        this.ssc_form.controls.outOfSecondsscCtrl.markAsDirty();
        
        this.ssc_form.controls.subjectThirdsscCtrl.markAsDirty();
        this.ssc_form.controls.markThirdsscCtrl.markAsDirty();
        this.ssc_form.controls.outOfThirdsscCtrl.markAsDirty();
        
        this.ssc_form.controls.subjectFourthsscCtrl.markAsDirty();
        this.ssc_form.controls.markFourthsscCtrl.markAsDirty();
        this.ssc_form.controls.outOfFourthsscCtrl.markAsDirty();
        
        this.ssc_form.controls.sscMarksCtrl.markAsDirty();
        if(this.ssc_form.controls.sscCountryCtrl.value === null || this.ssc_form.controls.sscCountryCtrl.value ==='' || this.ssc_form.controls.sscCountryCtrl.value ===undefined){
    
          this.sscCountryValidation = false;
          
        }else {
          
          this.sscCountryValidation = true;
          
        }
     }else{
        var ssc_data ={
          sscUniversity : this.ssc_form.controls.sscUniversityCtrl.value,
          sscCollege : this.ssc_form.controls.sscCollegeCtrl.value,
          sscCountry: this.ssc_form.controls.sscCountryCtrl.value,
          sscAdd : this.ssc_form.controls.sscAddCtrl.value,
          sscEmail : this.ssc_form.controls.sscEmailCtrl.value,
          sscUrl : this.ssc_form.controls.sscUrlCtrl.value,
          sscResultDate: this.ssc_form.controls.sscResultDateCtrl.value,
          sscRollNo: this.ssc_form.controls.sscRollNoCtrl.value,
          sscMedium: this.ssc_form.controls.sscMediumCtrl.value,
          subjectFirstssc: this.ssc_form.controls.subjectFirstsscCtrl.value,
          markFirstssc: this.ssc_form.controls.markFirstsscCtrl.value,
          outOfFirstssc: this.ssc_form.controls.outOfFirstsscCtrl.value,
          gradeFirstssc: this.ssc_form.controls.gradeFirstsscCtrl.value,
          
          subjectSecondssc: this.ssc_form.controls.subjectSecondsscCtrl.value,
          markSecondssc: this.ssc_form.controls.markSecondsscCtrl.value,
          outOfSecondssc: this.ssc_form.controls.outOfSecondsscCtrl.value,
          gradeSecondssc: this.ssc_form.controls.gradeSecondsscCtrl.value,
          
          subjectThirdssc: this.ssc_form.controls.subjectThirdsscCtrl.value,
          markThirdssc: this.ssc_form.controls.markThirdsscCtrl.value,
          outOfThirdssc: this.ssc_form.controls.outOfThirdsscCtrl.value,
          gradeThirdssc: this.ssc_form.controls.gradeThirdsscCtrl.value,
          
          subjectFourthssc: this.ssc_form.controls.subjectFourthsscCtrl.value,
          markFourthssc: this.ssc_form.controls.markFourthsscCtrl.value,
          outOfFourthssc: this.ssc_form.controls.outOfFourthsscCtrl.value,
          gradeFourthssc: this.ssc_form.controls.gradeFourthsscCtrl.value,
  
          subjectFifthssc: this.ssc_form.controls.subjectFifthsscCtrl.value,
          markFifthssc: this.ssc_form.controls.markFifthsscCtrl.value,
          outOfFifthssc: this.ssc_form.controls.outOfFifthsscCtrl.value,
          gradeFifthssc: this.ssc_form.controls.gradeFifthsscCtrl.value,
  
          subjectSixthssc: this.ssc_form.controls.subjectSixthsscCtrl.value,
          markSixthssc: this.ssc_form.controls.markSixthsscCtrl.value,
          outOfSixthssc: this.ssc_form.controls.outOfSixthsscCtrl.value,
          gradeSixthssc: this.ssc_form.controls.gradeSixthsscCtrl.value,
          
          sscMarks: this.ssc_form.controls.sscMarksCtrl.value,
     }
    
          this.api.setProfileValues(ssc_data,'Education_SSC')
          .subscribe(
            (data: any) => {  
             
              this.ref.close(ssc_data);
              err => console.error(err) 
          });
     }
      
    }

    open() {
      this.dialogService.open(find_College_SSC).onClose
      .subscribe(
       (data: any) => {
         
          if(data!==undefined){
            this.ssc_form.controls['sscEmailCtrl'].setValue(data[0].school_email);
            this.ssc_form.controls['sscCollegeCtrl'].setValue(data[0].school_name);
            this.ssc_form.controls['sscCountryCtrl'].setValue(data[0].school_country);
            this.ssc_form.controls['sscAddCtrl'].setValue(data[0].school_add);
            this.ssc_form.controls['sscUrlCtrl'].setValue(data[0].school_url);
          }
          
          err => console.error(err)
        }
       );
    }


}
