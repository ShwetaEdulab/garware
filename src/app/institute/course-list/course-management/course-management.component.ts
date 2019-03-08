import { Component, OnInit, Renderer2, ElementRef, ComponentFactoryResolver, ViewChild, ComponentRef, ViewContainerRef } from '@angular/core';
import { FormControl, FormBuilder,
  FormGroup,
  Validators, } from '@angular/forms';
import { InstituteApiService } from '../../../shared/instituteapi.service';
import { config } from '../../../../../config';
import { UserService } from '../../../@core/data/users.service'  // '../../@core/data/users.service';
import { NbDialogService } from '@nebular/theme';
import { facultyComponent } from '../dialog/facultycomponent';
import { Router, ActivatedRoute } from '@angular/router';
import { curriculumComponent } from '../dialog/curriculumcomponent';

@Component({
  selector: 'course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.scss']
})
export class CourseManagementComponent implements OnInit {
  //@ViewChild("divMessages", {read: ElementRef}) private divMessages: ElementRef;
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) VCR: ViewContainerRef;
  index: number = 0;
  componentsReferences = [];
  collegeId : any;
  courseID;
  currId;
  date = new Date();
  min: Date;
  max = new Date();
  degreeName
  course_from;
  course_to;
  intake_from;
  intake_to;
  degreeNameValues;
  courseOverviewValues;
  curriculumValues = {
    academics:[]
  };
  facultyValues = [];
  tab_type;
  saveData = false;
  public filterText: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  serverUrl = config.serverUrl;

  courseOverviewForm: FormGroup;

  constructor(
    protected instituteApi : InstituteApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private renderer:Renderer2,
    private el: ElementRef,
    private dialogService: NbDialogService,
    protected router : Router,
    private CFR: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    //console.log("serverUrl========"+this.serverUrl)
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.collegeId = user['collegeId'];
        console.log("this.collegeId=======>"+this.collegeId);
    });
    this.courseID = this.route.snapshot.queryParamMap.get('courseId');
    console.log("this.courseID=========>"+this.courseID);
    this.courseOverview();

  }

  public courseOverview(): void {
    this.courseOverviewForm = this.fb.group({
      degreeNameCtrl : ['', [Validators.required,]],
      courseNameCtrl : ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      courseSpecializationCtrl : ['', [Validators.required,Validators.minLength(3)]],
      fromDateCtrl : ['', [Validators.required,]],
      toDateCtrl : ['', [Validators.required,]],
      intakefromDateCtrl : ['', [Validators.required,]],
      intaketoDateCtrl : ['', [Validators.required,]],
      NRIseatsCtrl : [''],
      PIOseatsCtrl : [''],
      OCIseatsCtrl : [''],
      courseFeeCtrl : [''],
      bankNameCtrl : [''],
      branchNameCtrl : [''],
      accountNameCtrl : [''],
      accNoCtrl : [''],
      IFSCCodeCtrl : [''],
      courseOverviewCtrl : ['',[Validators.maxLength(2500)]],
      courseDescriptionCtrl : ['',[Validators.maxLength(2500)]],
      admissionProcedureCtrl : [''],
      femalepopulationCtrl : ['', [Validators.required,]],
      malepopulationCtrl : ['', [Validators.required,]],
    });

    this.instituteApi.courseList(this.courseID).subscribe(data=>{
      this.degreeNameValues = data['data']['degrees'];
      this.courseOverviewValues = data['data']['course_overview'];
      console.log("this.courseOverviewValues============>"+JSON.stringify(this.courseOverviewValues));
      var duration_from1 = data['data']['course_overview']['duration_from'];
      var duration_to1 = data['data']['course_overview']['duration_to'];
      this.course_from = duration_from1 ? new Date(data['data']['course_overview']['duration_from']) : null;
      this.course_to = duration_to1 ? new Date(data['data']['course_overview']['duration_to']) : null;
      var intake_from1 = data['data']['course_overview']['intake_from'];
      var intake_to1 = data['data']['course_overview']['intake_to'];
      this.intake_from = intake_from1 ? new Date(data['data']['course_overview']['intake_from']) : null;
      this.intake_to = intake_to1 ? new Date(data['data']['course_overview']['intake_to']) : null;
      this.degreeName = data['data']['course_overview']['degree'];
      this.facultyValues = data['data']['faculties'];
      //console.log("this.facultyValues======>"+this.facultyValues);
      //console.log("this.facultyValues======>"+this.facultyValues.length);

      this.curriculumValues = data['data']['academics_fees'];
      console.log("this.curriculumValues============>"+JSON.stringify(this.curriculumValues));
    })
  }

  saveCourseOverview(){
    console.log("this.courseOverviewForm.valid========>"+this.courseOverviewForm.valid);
    this.courseOverviewForm.controls.courseNameCtrl.markAsDirty();
    this.courseOverviewForm.controls.courseSpecializationCtrl.markAsDirty();
    this.courseOverviewForm.controls.fromDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.toDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.intakefromDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.intaketoDateCtrl.markAsDirty();
    this.courseOverviewForm.controls.femalepopulationCtrl.markAsDirty();
    this.courseOverviewForm.controls.malepopulationCtrl.markAsDirty();
    if(this.courseOverviewForm.valid){
      console.log("this.courseOverviewForm.valid========>true*****");
      var overview_data = {
        DegreeName : this.courseOverviewForm.controls.degreeNameCtrl.value,
        CourseName : this.courseOverviewForm.controls.courseNameCtrl.value,
        CourseSpecialization : this.courseOverviewForm.controls.courseSpecializationCtrl.value,
        CoursefromDate : this.courseOverviewForm.controls.fromDateCtrl.value,
        CoursetoDate : this.courseOverviewForm.controls.toDateCtrl.value,
        IntakefromDate : this.courseOverviewForm.controls.intakefromDateCtrl.value,
        IntaketoDate : this.courseOverviewForm.controls.intaketoDateCtrl.value,
        NRIseats : this.courseOverviewForm.controls.NRIseatsCtrl.value,
        PIOseats : this.courseOverviewForm.controls.PIOseatsCtrl.value,
        OCIseats : this.courseOverviewForm.controls.OCIseatsCtrl.value,
        CourseFee : this.courseOverviewForm.controls.courseFeeCtrl.value,
        BankName : this.courseOverviewForm.controls.bankNameCtrl.value,
        BranchName : this.courseOverviewForm.controls.branchNameCtrl.value,
        AccountName : this.courseOverviewForm.controls.accountNameCtrl.value,
        AccountNo : this.courseOverviewForm.controls.accNoCtrl.value,
        IFSCCode : this.courseOverviewForm.controls.IFSCCodeCtrl.value,
        CourseOverview : this.courseOverviewForm.controls.courseOverviewCtrl.value,
        CourseDescription : this.courseOverviewForm.controls.courseDescriptionCtrl.value,
        AdmissionProcedure : this.courseOverviewForm.controls.admissionProcedureCtrl.value,
        FemalePopulation : this.courseOverviewForm.controls.femalepopulationCtrl.value,
        Malepopulation : this.courseOverviewForm.controls.malepopulationCtrl.value,
      }
      this.instituteApi.saveCourseOverview(this.collegeId,overview_data,this.courseID)
      .subscribe(
        (data: any) => {
          if(data['status']== 200){
            console.log("Course Details save successfully");
            //console.log("data['data']======>"+data['data']);
            //console.log("data['data']['courseId']======>"+data['data']['courseId']);
            this.courseID = data['data']['courseId'];
            this.saveData = true;
          }
          err => console.error(err)
        });
   
    }else{
      console.log("this.courseOverviewForm.valid========>false*****");
    }
  }

  //faculty functions

  addFaculty(){
    this.dialogService.open(facultyComponent, {
      context: {
        courseID: this.courseID,
      },
    }).onClose
      .subscribe(
        (data: any) => {
          this.courseOverview();
          // if (data !== undefined) {
          //   this.buildForm5();
          // }
          // err => console.error(err)
        })
  }

  deleteFaculty(id){
    this.instituteApi.deleteFaculty(id)
      .subscribe(
        (data: any) => {
          if(data['status']== 200){
            console.log("data['data']======>"+data['data']);
            this.refreshFaculty();
          }
          err => console.error(err)
        });
  }

  refreshFaculty(){
    this.instituteApi.courseList(this.courseID).subscribe(data=>{
      this.facultyValues = data['data']['faculties'];
      console.log("this.facultyValues==== refreshFaculty =======>"+JSON.stringify(this.facultyValues));
    })

  }

  backtocourse(){
    this.router.navigate(['pages/course-list']);
  }
  
  //Course Curriculum
  addCurriculum(id){
    console.log("id===========>"+id);
    this.dialogService.open(curriculumComponent, {
      context: {
        courseID: this.courseID,
        currId : id
      },
    }).onClose
      .subscribe(
        (data: any) => {
          this.refreshCurriculum();
        })
  }

  refreshCurriculum(){
    this.instituteApi.courseList(this.courseID).subscribe(data=>{
      this.curriculumValues = data['data']['academics_fees'];
      console.log("this.curriculumValues==== refreshCurriculum =======>"+JSON.stringify(this.curriculumValues));
    })
  }

  deleteCurriculum(id){
    console.log("id=======>"+id);
    this.instituteApi.deleteCurriculum(this.collegeId,this.courseID,id).subscribe(data=>{
      if(data['status'] == 200){
        this.refreshCurriculum();
      }
    })
  }

}
