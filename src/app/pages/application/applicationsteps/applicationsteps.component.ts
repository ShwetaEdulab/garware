
import { Component , OnInit , Input, ViewChild } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { CountriesService } from '../../../@core/data/countries.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService , NbDialogService, NbStepperComponent } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { UserService } from '../../../@core/data/users.service';
import { saveAs } from 'file-saver';
import { Secondpaymentdialog } from './dialog/Secondpaymentdialog';
import { Thirdpaymentdialog } from './dialog/Thirdpaymentdialog';
import { uploadreceiptdialog } from './dialog/uploadreceiptdialog';
import { uploadthirdreceiptdialog } from './dialog/uploadthirdreceiptdialog';
import { config } from '../../../../../config';


@Component({
  selector: 'applicationsteps',
  styleUrls: ['./applicationsteps.component.scss'],
  templateUrl: './applicationsteps.component.html',
})
export class ApplicationStepsComponent implements OnInit {
  @ViewChild('stepper') stepper: NbStepperComponent;
  serverUrl = config.serverUrl;
  applicationId;
  id : any;
  courseID;
  specialization;
  letter;
  uploadedFiles: any[] = [];
  userId;
  Countries: any [];
  ProvisionalForm: FormGroup;
  visaForm: FormGroup;
  ApplicationForm: FormGroup;
  EnrollmentForm : FormGroup;
  ThirdPaymentForm : FormGroup;
  FirmLetterForm : FormGroup;
  MedicalUploadForm : FormGroup;
  RPForm : FormGroup;
  submitted = false;
  medicalsubmitted = false;
  rpsubmitted = false;
  min: Date;
  max: Date;
  visadetails;
  visacountry;
  visaissuedate;
  visaissuedate1;
  visaissuedatedetails;
  visaexpirydate1;
  visaexpirydatedetails;
  visaexpirydate;
  medicalissuedate1;
  medicalissuedatedetails;
  MedicalIssueDate;
  document_type;
  imagevalue;
  secondpaymentdata;
  showonline;
  transdetails;
  showoffdown = 0;
  showonldown = 0;
  enrollmentdetails;
  showfirmnext = 0;
  medicaldetails;
  rpdetails;
  dont_haveto_appear = 0;
  haveto_appear = 0;
  doctorcountry;
  user_data;
  student_category;
  imageToShow;
  index;
  visaImage;
  passImage;
  thirdpaymentdetails;
  medicalImage;
  medicalImageName;
  RPImage;
  RPImageName;
  countryImage;
  showvisaImage = 0;
  showpassImage = 0;
  showcountryImage = 0;
  showmedicalImage = 0;
  showRPImage = 0;
  loading = false;
  showpassbuttondiv;
  showcidbuttondiv;
  country_birth;
  third_not_available;
  tab1;
  tab2;
  tab3;
  tab4;
  tab5;
  tab6;
  tab7;
  tab8;
  tabcheck1;
  tabcheck2;
  tabcheck3;
  tabcheck4;
  tabcheck5;
  tabcheck6;
  tabcheck7;
  tabcheck8;
  alerttab1;
  alerttab2;
  alerttab3;
  alerttab4;
  alerttab5;
  alerttab6;
  alerttab7;
  alerttab8 = 'true';

  constructor(private router: Router,
    private route: ActivatedRoute,
    protected api : ApiService,
    protected countries :CountriesService,
    private formBuilder: FormBuilder,
    protected dateService: NbDateService<Date>,
    private authService: NbAuthService,
    private userService: UserService,
    private dialogService: NbDialogService) {
    this.min = this.dateService.today();
    this.max = this.dateService.today();
  }

  get f() { return this.visaForm.controls; }
  get m() { return this.MedicalUploadForm.controls; }
  get r() { return this.RPForm.controls; }

  async downloadletter(letter){
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    var document_name;
    if(letter == 'Provisional Letter'){
      this.loading = true;
      document_name = '_Confirmation_provisional_Letter.pdf'
    }else if(letter == 'Application Form Letter'){
      document_name = '_Preview.pdf'
    }else if(letter == 'Firm Letter'){
      this.loading = true;
      document_name= '_Final_Letter.pdf'
    }
    var file_name = this.applicationId + document_name;
    var recordactivity = await this.api.recordactivity(this.applicationId,this.courseID,letter);
    recordactivity.subscribe(
        data => {
          this.api.downloadFiles(file_name)
          .subscribe(data => {
           saveAs(data, file_name);
           this.loading = false;
          });
          if(letter == 'Firm Letter'){
            this.alerttab7 = 'false';
            this.showfirmnext=1;
          }
        },
        error => {
            console.error("Error", error);
        }
    ); 
   
  }


  ngOnInit() {
    if(parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 0 || parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 2 || parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 3 || parseInt(this.route.snapshot.queryParamMap.get('selectedIndex')) == 4){
      this.stepper.selectedIndex = parseInt(this.route.snapshot.queryParamMap.get('selectedIndex'));
    }else{
      this.stepper.selectedIndex = 0;
    }
    this.api.getTheme();
    this.Countries = this.countries.getData();
    this.applicationId = this.route.snapshot.queryParamMap.get('appId');
    this.userService.onUserChange()
    .subscribe(
      (user: any) => {
        this.id = user['id'];
        this.country_birth = user['country_birth'];
    });
    this.ProvisionalStep();
    this.VisaStep();
    this.ApplicationFormStep();
    this.EnrollmentDetailsStep();
    this.ThirdPaymentStep();
    this.FirmLetterStep();
    this.MedicalDetailsStep();
    this.RPDetails();
    this.userId = this.id;
    var checkTabs = this.api.myApplicationCheckTabs(this.applicationId)
    .subscribe(
    (data: any) => {
      this.tab1 = data['data']['tab1'];
      this.tab2 = data['data']['tab2'];
      this.tab3 = data['data']['tab3'];
      this.tab4 = data['data']['tab4'];
      this.tab5 = data['data']['tab5'];
      this.tab6 = data['data']['tab6'];
      this.tab7 = data['data']['tab7'];
      this.tab8 = data['data']['tab8'];
      if(this.tab1 && this.tab2 && this.tab3 && this.tab4 && this.tab5 && this.tab6 && this.tab7 && this.tab8){
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
        this.tabcheck3 = 'true';
        this.tabcheck4 = 'true';
        this.tabcheck5 = 'true';
        this.tabcheck6 = 'true';
        this.tabcheck7 = 'true';
        this.tabcheck8 = 'true';

      }else if(this.tab1 && this.tab2 && this.tab3 && this.tab4 && this.tab5 && this.tab6 && this.tab7){
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
        this.tabcheck3 = 'true';
        this.tabcheck4 = 'true';
        this.tabcheck5 = 'true';
        this.tabcheck6 = 'true';
        this.tabcheck7 = 'true';
        this.alerttab8 = 'false';
        this.showfirmnext=1;
      }else if(this.tab1 && this.tab2 && this.tab3 && this.tab4 && this.tab5 && this.tab6){
        this.showfirmnext=1;
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
        this.tabcheck3 = 'true';
        this.tabcheck4 = 'true';
        this.tabcheck5 = 'true';
        this.tabcheck6 = 'true';
      }else if(this.tab1 && this.tab2 && this.tab3 && this.tab4 && this.tab5){
   
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
        this.tabcheck3 = 'true';
        this.tabcheck4 = 'true';
        this.tabcheck5 = 'true';
      }else if(this.tab1 && this.tab2 && this.tab3 && this.tab4){
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
        this.tabcheck3 = 'true';
        this.tabcheck4 = 'true';
      }else if(this.tab1 && this.tab2 && this.tab3){
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
        this.tabcheck3 = 'true';
      }else if(this.tab1 && this.tab2){
        this.tabcheck1 = 'true';
        this.tabcheck2 = 'true';
      }else if(this.tab1){
       this.tabcheck1 = 'true';
      }else{
        console.error('in else ng oninit of applicationsteps');
      }
    }
    );
  }

  selectStep(){
    if(this.stepper.selectedIndex == 2){
        if(this.visaForm.valid){
          this.alerttab3 = 'false';
        }else{
          this.alerttab3 = 'true';
        }
    }
    else if(this.stepper.selectedIndex == 3){
      if(this.secondpaymentdata.uploaded_challan_flag == "true"){
        this.alerttab4 = 'false';
      }else{
        this.alerttab4 = 'true';
      }
    }
    else if(this.stepper.selectedIndex == 4){
      if(this.enrollmentdetails.firm_flag == 'firmrnotexists'){
        this.alerttab5 = 'true';
      }else{
        this.alerttab5 = 'false';
      }
    }
    else if(this.stepper.selectedIndex == 5){
      if(this.thirdpaymentdetails.uploaded_challan_flag == "true"){
        this.alerttab6 = 'false';
      }else{
        this.alerttab6 = 'true';
      }
    }
    else if(this.stepper.selectedIndex == 6){
      if(this.showfirmnext == 1){
        this.alerttab7 = 'false';
      }else{
        this.alerttab7 = 'true';
      }
    }
  }

  prevIncomp(){
    if(this.stepper.selectedIndex == 2){
      if(this.visaForm.invalid){
        this.stepper.selectedIndex = 1;
      }
    }else if(this.stepper.selectedIndex == 3){
      if(this.visaForm.invalid){
        this.stepper.selectedIndex = 1;
      }else if(this.secondpaymentdata.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 2;
      }
    }else if(this.stepper.selectedIndex == 4){
      if(this.visaForm.invalid){
        this.stepper.selectedIndex = 1;
      }else if(this.secondpaymentdata.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 2;
      }else if(this.enrollmentdetails.enroll_flag == "notassign"){
        this.stepper.selectedIndex = 3;
      }
    }else if(this.stepper.selectedIndex == 5){
      if(this.visaForm.invalid){
        this.stepper.selectedIndex = 1;
      }else if(this.secondpaymentdata.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 2;
      }else if(this.enrollmentdetails.enroll_flag == "notassign"){
        this.stepper.selectedIndex = 3;
      }else if(this.thirdpaymentdetails.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 4;
      }
    }else if(this.stepper.selectedIndex == 6){
      if(this.visaForm.invalid){
        this.stepper.selectedIndex = 1;
      }else if(this.secondpaymentdata.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 2;
      }else if(this.enrollmentdetails.enroll_flag == "notassign"){
        this.stepper.selectedIndex = 3;
      }else if(this.thirdpaymentdetails.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 4;
      }else if(this.showfirmnext != 1){
        this.stepper.selectedIndex = 5;
      }
    }else if(this.stepper.selectedIndex == 7){
      if(this.visaForm.invalid){
        this.stepper.selectedIndex = 1;
      }else if(this.secondpaymentdata.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 2;
      }else if(this.enrollmentdetails.enroll_flag == "notassign"){
        this.stepper.selectedIndex = 3;
      }else if(this.thirdpaymentdetails.uploaded_challan_flag != "true"){
        this.stepper.selectedIndex = 4;
      }else if(this.showfirmnext != 1){
        this.stepper.selectedIndex = 5;
      }else if(this.MedicalUploadForm.invalid){
        this.stepper.selectedIndex = 6;
      }
    }

  }

  private ProvisionalStep() : void{
    this.ProvisionalForm = this.formBuilder.group({

    });
  }

  private VisaStep() : void{
      this.api.getenrollmentdetails('upload-visa',this.route.snapshot.queryParamMap.get('appId'))
      .subscribe(
      (data: any) => {
        if(data['data']['visa_details'] == null){
          if(this.country_birth == 154){
            this.index = 2;
          }else{
            this.index = 0;
          }
        }else{
          this.visadetails = data['data']['visa_details'];
          this.document_type = data['data']['visa_details']['document_type'];
          if(this.document_type == "passport_oci_card"){
            this.index = 1;
          
            this.passImage = data['data']['pass_image_name'];
            var passext = data['data']['pass_image_name'].split('/').pop();
            var finalext = passext.split('.').pop();
            if(finalext == 'png' || finalext == 'PNG' || finalext == 'jpg' || finalext == 'JPG'){
              this.showpassbuttondiv = 0;
              this.showpassImage = 1;

            }else{
              this.showpassImage = 0;
              this.showpassbuttondiv = 1;
            }
            this.visaForm = this.formBuilder.group({
              visaNumber: [''],
              issuancePlace: [''],
              issuanceDate : [''],
              expiryDate : [''],
              visaDocument : [''],
              passDocument : [null, Validators.required],
              countryDocument : ['']
            });
            this.visaForm.controls.passDocument.patchValue({file: data['data']['visa_details']['document_type']});
            this.visaForm.get('visaNumber').disable();
            this.visaForm.get('issuancePlace').disable();
            this.visaForm.get('issuanceDate').disable();
            this.visaForm.get('expiryDate').disable();
            this.visaForm.get('visaDocument').disable();
            this.visaForm.get('countryDocument').disable();
          }else if(this.document_type == 'country_id_card'){
            this.index = 2;
            this.countryImage = data['data']['country_image_name'];
            var passext = data['data']['country_image_name'].split('/').pop();
            var finalext = passext.split('.').pop();
            if(finalext == 'png' || finalext == 'PNG' || finalext == 'jpg' || finalext == 'JPG'){
              this.showcidbuttondiv = 0;
              this.showcountryImage = 1;

            }else{
              this.showcountryImage = 0;
              this.showcidbuttondiv = 1;
            }
            this.visaForm = this.formBuilder.group({
              visaNumber: [''],
              issuancePlace: [''],
              issuanceDate : [''],
              expiryDate : [''],
              visaDocument : [''],
              passDocument : [''],
              countryDocument : [null, Validators.required]
            });
            this.visaForm.controls.countryDocument.patchValue({file: data['data']['visa_details']['document_type']});
            this.visaForm.get('visaNumber').disable();
            this.visaForm.get('issuancePlace').disable();
            this.visaForm.get('issuanceDate').disable();
            this.visaForm.get('expiryDate').disable();
            this.visaForm.get('visaDocument').disable();
            this.visaForm.get('passDocument').disable();
          }
          else{
            this.index = 0;
            this.showvisaImage = 1;
            this.visaImage = data['data']['visa_image_name'];
            this.visaForm = this.formBuilder.group({
              visaNumber: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
              issuancePlace: ['', Validators.required],
              issuanceDate : ['', Validators.required],
              expiryDate : ['', Validators.required],
              visaDocument : [null, Validators.required],
              passDocument : [''],
              countryDocument : ['']
            });
            this.visaForm.controls.visaDocument.patchValue({file: data['data']['visa_details']['document_type']});
            this.visaForm.get('countryDocument').disable();
            this.visaForm.get('passDocument').disable();
            this.visadetails = data['data']['visa_details'];
            this.visacountry = ""+data['data']['visa_details']['place_issue'];
            if(data['data']['visa_details']['issue_date'] == null || data['data']['visa_details']['issue_date']==undefined||data['data']['visa_details']['issue_date']==''){
              this.visaissuedate = null
            }else{
              this.visaissuedate1 = ""+data['data']['visa_details']['issue_date'];
              this.visaissuedatedetails = this.visaissuedate1.split("/");
              this.visaissuedate = this.visaissuedatedetails[2] +'-'+ this.visaissuedatedetails[1] +'-'+ this.visaissuedatedetails[0];
            }
            if(data['data']['visa_details']['expiry_date'] == null || data['data']['visa_details']['expiry_date']==undefined||data['data']['visa_details']['expiry_date']==''){
              this.visaexpirydate = null
            }else{
              this.visaexpirydate1 = ""+data['data']['visa_details']['expiry_date'];
              this.visaexpirydatedetails = this.visaexpirydate1.split("/");
              this.visaexpirydate = this.visaexpirydatedetails[2] +'-'+ this.visaexpirydatedetails[1] +'-'+ this.visaexpirydatedetails[0];
            }
            // this.visaissuedate1 = ""+data['data']['visa_details']['issue_date'];
            // this.visaissuedatedetails = this.visaissuedate1.split("/");
            // this.visaissuedate = this.visaissuedatedetails[2] +'-'+ this.visaissuedatedetails[1] +'-'+ this.visaissuedatedetails[0];
            // this.visaexpirydate1 = ""+data['data']['visa_details']['expiry_date'];
            // this.visaexpirydatedetails = this.visaexpirydate1.split("/");
            // this.visaexpirydate = this.visaexpirydatedetails[2] +'-'+ this.visaexpirydatedetails[1] +'-'+ this.visaexpirydatedetails[0];
          }
        }

        
      },
      error => {
          console.error("Error", error);
      }
    ); 
    this.visaForm = this.formBuilder.group({
      visaNumber: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      issuancePlace: ['', Validators.required],
      issuanceDate : ['', Validators.required],
      expiryDate : ['', Validators.required],
      visaDocument : [null, Validators.required],
      passDocument : [''],
      countryDocument : ['']
    }); 
  }

  private ApplicationFormStep() : void{
    this.ApplicationForm = this.formBuilder.group({
      
    });
    this.api.getenrollmentdetails('application-form-letter',this.route.snapshot.queryParamMap.get('appId'))
      .subscribe(
        (data: any) => {
          if(data['data']['second_payment'] == 'true'){
            this.showonline = 0;
            if(data['data']['transaction'] == 'exists'){
              this.transdetails = 1;
            }else{
              this.transdetails = 0;
            }

            if(data['data']['payment_mode'] == 'offline'){
              this.showoffdown = 1; 
              this.showonldown = 0; 
            }else if(data['data']['payment_mode'] == 'online'){
              this.showoffdown = 0; 
              this.showonldown = 1; 
            }
          }else if(data['data']['second_payment'] == 'false'){
            this.showonline = 1;
            this.transdetails = 0;
          }
          this.secondpaymentdata = data['data'];
        },
        error => {
          console.error("Error", error);
        }
      );
  }

  private EnrollmentDetailsStep() : void{
    this.EnrollmentForm = this.formBuilder.group({
      
    });
    this.api.getenrollmentdetails('enrollment',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.enrollmentdetails = data['data'];
      },
      error => {
        console.error("Error", error);
      }
    );
  }
  private ThirdPaymentStep() : void{
    this.ThirdPaymentForm = this.formBuilder.group({

    });
    this.api.getenrollmentdetails('third-payment',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        if(data['status'] == 200){
          this.thirdpaymentdetails = data['data'];
        }else if(data['status'] == 400){
          this.thirdpaymentdetails = '';
          this.third_not_available = 'true';
        }
      },
      error => {
        console.error("Error", error);
      }
    );
  }
  private MedicalDetailsStep() : void{
    this.MedicalUploadForm = this.formBuilder.group({
      medicalNumber: ['', [Validators.required,Validators.pattern(/^[ --()0-9]+$/)]],
      medicalissuanceDate : ['', Validators.required],
      doctorname: ['', [Validators.required,Validators.pattern(/^[.a-zA-Z ]*$/),Validators.maxLength(70)]],
      doctorcountry : ['', Validators.required],
      doctormobile : ['', [Validators.required,Validators.pattern(/^[ --()0-9]+$/)]],
      medicalDocument : [null, Validators.required]
    });
    this.api.getenrollmentdetails('upload-medical',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.medicalImageName = data['data']['medical_image_name'];
        if(this.medicalImageName != null){
          this.showmedicalImage = 1;
          this.medicalImage = data['data']['medical_image_name'];
          this.MedicalUploadForm.controls.medicalDocument.patchValue({file: data['data']['medical_image_name']});
        }
        this.medicaldetails = data['data']['medical_details'];
        if(data['data']['medical_details']['medical_issue'] == null || data['data']['medical_details']['medical_issue'] == undefined || data['data']['medical_details']['medical_issue'] ==''){
          this.MedicalIssueDate = null
        }else{
          if(this.medicaldetails != null){
            this.medicalissuedate1 = ""+data['data']['medical_details']['medical_issue'];
            if(this.medicalissuedate1 != "null"){
              this.medicalissuedatedetails = this.medicalissuedate1.split("/");
              this.MedicalIssueDate = this.medicalissuedatedetails[2] +'-'+ this.medicalissuedatedetails[1] +'-'+ this.medicalissuedatedetails[0];
            }
            if(this.doctorcountry != null){
              this.doctorcountry = ""+data['data']['medical_details']['doctor_country'];
            }
          }
        }
        
      },
      error => {
        console.error("Error", error);
      }
    );
  }
  private FirmLetterStep() : void{
    this.FirmLetterForm = this.formBuilder.group({

    });
  }
  private RPDetails() : void{
    this.RPForm = this.formBuilder.group({
      rpDocument : [null, Validators.required],
      address : ['',Validators.required],
      rpmobile : ['', [Validators.required,Validators.pattern(/^[ --()0-9]+$/)]],
      rpemail : ['', [Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      ept_given: ['', Validators.required]
    });
   
     this.api.getProfileValue('Personal')
    .subscribe(
      (data: any) => {  
        this.user_data =  data['data']['user_data'];
        this.student_category = data['data']['user_data']['student_category'];
    });
    this.api.getenrollmentdetails('resident-permit',this.route.snapshot.queryParamMap.get('appId'))
    .subscribe(
      (data: any) => {
        this.rpdetails = data['data']['rp_details'];
        this.RPImageName = data['data']['rp_image_name'];
        if(this.RPImageName != null){
          this.showRPImage = 1;
          this.RPImage = data['data']['rp_image_name'];
          this.RPForm.controls.rpDocument.patchValue({file: data['data']['rp_image_name']});
        }
        if(this.rpdetails != null){
          if(data['data']['rp_details']['EPT'] == 'dont_haveto_appear'){
            this.dont_haveto_appear = 1;
            this.RPForm.controls['ept_given'].setValue('dont_haveto_appear');
          }else if(data['data']['rp_details']['EPT'] == 'haveto_appear'){
            this.haveto_appear = 1;
            this.RPForm.controls['ept_given'].setValue('haveto_appear');
          }
        }
      },
      error => {
        console.error("Error", error);
      }
    );
  }

  get ept_given() {
    return this.RPForm.get('ept_given');
  } 

  async onSubmit() {
    this.submitted = true;
    if (this.visaForm.invalid) {
        return;
    }else{
      if(this.index == 0){
        this.loading = true;
        var response = await this.api.setvisadetails(this.visaForm.controls.visaNumber.value,this.visaForm.controls.issuancePlace.value,this.visaForm.controls.issuanceDate.value,this.visaForm.controls.expiryDate.value);
        response.subscribe(
          data => {
            this.loading = false;
            this.alerttab3 = 'false';  
          },
          error => {
              console.error("Error", error);
          }
        );  
      }
    }
  };
  async onMedicalSubmit() {
    this.medicalsubmitted = true;
    if (this.MedicalUploadForm.invalid) {
      return;
    }else{
      this.loading = true;
      var response = await this.api.setmedicaldetails(this.MedicalUploadForm.controls.medicalissuanceDate.value,this.MedicalUploadForm.controls.doctorname.value,this.MedicalUploadForm.controls.doctorcountry.value,this.MedicalUploadForm.controls.doctormobile.value,this.MedicalUploadForm.controls.medicalNumber.value);
        response.subscribe(
          data => {
            this.loading = false;
            this.alerttab8 = 'false';
          },
          error => {
              console.error("Error", error);
          }
        );  
    }
  };

  async onRPSubmit(student_category){
    this.rpsubmitted = true;
    if (this.RPForm.invalid) {
      if(student_category == 'Foreign National'){
        return;
      }else{
        this.RPForm.get('rpemail').clearValidators();
        this.RPForm.get('rpemail').updateValueAndValidity();
        this.RPForm.get('rpmobile').clearValidators();
        this.RPForm.get('rpmobile').updateValueAndValidity();
        this.RPForm.get('ept_given').clearValidators();
        this.RPForm.get('ept_given').updateValueAndValidity();
        this.RPForm.get('address').clearValidators();
        this.RPForm.get('address').updateValueAndValidity();
        this.RPForm.get('rpDocument').clearValidators();
        this.RPForm.get('rpDocument').updateValueAndValidity();
        this.loading = true;
        var response = await this.api.setrpdetails(this.RPForm.controls.address.value,this.RPForm.controls.rpmobile.value,this.RPForm.controls.rpemail.value,this.RPForm.controls.ept_given.value);
        response.subscribe(
          data => {
            this.loading = false;
          },
          error => {
              console.error("Error", error);
          }
        );  
      } 
    }else{
      this.loading = true;
      var response = await this.api.setrpdetails(this.RPForm.controls.address.value,this.RPForm.controls.rpmobile.value,this.RPForm.controls.rpemail.value,this.RPForm.controls.ept_given.value);
        response.subscribe(
          data => {
            this.loading = false;
          },
          error => {
              console.error("Error", error);
          }
        );  
    }
  }

  onUpload(event,dynamicController,name) {
    var extname;
    const reader = new FileReader();
    if(event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
      extname = file.name;
      reader.onload = () => {
        dynamicController.patchValue({
          file: reader.result
       });
      };
    }
    var finalext = extname.split('.').pop();
    if(name == 'passDocument'){
      if(finalext == 'png' || finalext == 'PNG' || finalext == 'jpg' || finalext == 'JPG'){
        this.showpassbuttondiv = 0;
        this.showpassImage = 1;
        this.api.getenrollmentdetails('upload-visa',this.route.snapshot.queryParamMap.get('appId'))
        .subscribe(
          (data: any) => {
            this.passImage = data['data']['pass_image_name'];
            this.alerttab3 = 'false';
          }
        )
      }else{
        this.showpassImage = 0;
        this.showpassbuttondiv = 1;
      }
    }else if(name == 'countryDocument'){
      if(finalext == 'png' || finalext == 'PNG' || finalext == 'jpg' || finalext == 'JPG'){
        this.showcidbuttondiv = 0;
        this.showcountryImage = 1;
        this.api.getenrollmentdetails('upload-visa',this.route.snapshot.queryParamMap.get('appId'))
        .subscribe(
          (data: any) => {
            this.countryImage = data['data']['country_image_name'];
            this.alerttab3 = 'false';
          }
        )
      }else{
        this.showcountryImage = 0;
        this.showcidbuttondiv = 1;
      }
    }else if(name == 'visaDocument'){
      this.api.getenrollmentdetails('upload-visa',this.route.snapshot.queryParamMap.get('appId'))
      .subscribe(
        (data: any) => {
          this.showvisaImage = 0;
          this.visaImage = data['data']['visa_image_name'];
          this.showvisaImage = 1;
          
        }
      )
    }else if(name == 'medicalDocument'){
      this.api.getenrollmentdetails('upload-medical',this.route.snapshot.queryParamMap.get('appId'))
      .subscribe(
        (data: any) => {
          this.medicalImage = data['data']['medical_image_name'];
          this.showmedicalImage = 1;
        }
      
      );
    }else if(name == 'rpDocument'){
      this.api.getenrollmentdetails('resident-permit',this.route.snapshot.queryParamMap.get('appId'))
      .subscribe(
        (data: any) => {
          this.RPImage = data['data']['rp_image_name'];
          this.showRPImage = 1;
        }
      );
    }
        
  }

  mySelect(event){
    
  }
  
  async downloaddoc(type){
    var downloaddoc = await this.api.getdownloaddoc(type,this.route.snapshot.queryParamMap.get('appId'));
    downloaddoc.subscribe(
      data => {
        var imagename = data['data'].split('/').pop();
        this.api.downloadFiles(imagename)
          .subscribe(data => {
           saveAs(data, imagename);
          });
      },
      error => {
          console.error("Error", error);
      }
    ); 
  }


  onlinepayment(){
    this.dialogService.open(Secondpaymentdialog, {
      context: {
       title: 'This is a title passed to the dialog component',
      },
   }).onClose
   .subscribe(
     (data: any) => {
      this.ApplicationFormStep();
      //  if (data !== undefined) {
      //    this.buildForm5();
      //  }
       err => console.error(err)
     })
  }

  onlinethirdpayment(){
    this.dialogService.open(Thirdpaymentdialog, {
      context: {
       title: this.thirdpaymentdetails.college_third_payment,
      },
   }).onClose
   .subscribe(
     (data: any) => {
      this.ThirdPaymentStep();
      this.FirmLetterStep();
       err => console.error(err)
     });
  }
  
  async online_receipt(transaction_id,user_id,pay_num){
    var generatereceipt = await this.api.generateonlinereceipt(transaction_id,this.route.snapshot.queryParamMap.get('appId'),user_id,pay_num);
    generatereceipt.subscribe(
      data => {
        var value = data['data'].split('/').pop();
        this.api.downloadFiles(value)
          .subscribe(data => {
           saveAs(data, value);
          });
      },
      error => {
          console.error("Error", error);
      }
    ); 
  }

  upload_online_receipt(){
  var hasBackdrop = false;
  
   this.dialogService.open(uploadreceiptdialog, { hasBackdrop }).onClose
   .subscribe(
    (name: any) => {
      if(name=="done"){
        this.secondpaymentdata.uploaded_challan_flag = "true";
        this.alerttab4 = 'false';
      }else{
      }
      err => console.error(err)
  }
      );
   
  }
  upload_online_third_receipt(){
    var hasBackdrop = false;
  
    this.dialogService.open(uploadthirdreceiptdialog, { hasBackdrop }).onClose
    .subscribe(
     (name: any) => {
       if(name=="done"){
         this.thirdpaymentdetails.uploaded_challan_flag = "true";
         this.alerttab6 = 'false';
       }else{
       }
       err => console.error(err)
   }
       );
  }
  


  checkfirm(enrollment,colg_name,applicationId){
    this.api.checkfirmletter(enrollment,colg_name,applicationId)
    .subscribe(
      (data: any) => {
        if(data['status'] == 200){
        }else if(data['status'] == 400){
        }
      },
      error => {
        console.error("Error", error);
      }
    );
  }

  handleChange(e) {
    this.index = e.index;
    if(this.index == 0){
      this.visaForm = this.formBuilder.group({
        visaNumber: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
        issuancePlace: ['', Validators.required],
        issuanceDate : ['', Validators.required],
        expiryDate : ['', Validators.required],
        visaDocument : [null, Validators.required],
        passDocument : [''],
        countryDocument : ['']
      });
      if(this.document_type == 'visa'){
        this.visaForm.controls['visaNumber'].setValue(this.visadetails.visa_no);
        this.visaForm.controls['issuancePlace'].setValue(this.visacountry);
        this.visaForm.controls['issuanceDate'].setValue(this.visaissuedate);
        this.visaForm.controls['expiryDate'].setValue(this.visaexpirydate);
        this.visaForm.controls['visaDocument'].setValue(this.visaImage);
      }
      this.visaForm.get('countryDocument').disable();
      this.visaForm.get('passDocument').disable();
    }else if(this.index == 1){
     
      this.visaForm = this.formBuilder.group({
        visaNumber: [''],
        issuancePlace: [''],
        issuanceDate : [''],
        expiryDate : [''],
        visaDocument : [''],
        passDocument : [null, Validators.required],
        countryDocument : ['']
      });
      if(this.document_type == 'passport_oci_card'){
        this.visaForm.controls['passDocument'].setValue(this.passImage);
      }
      this.visaForm.get('visaNumber').disable();
      this.visaForm.get('issuancePlace').disable();
      this.visaForm.get('issuanceDate').disable();
      this.visaForm.get('expiryDate').disable();
      this.visaForm.get('visaDocument').disable();
      this.visaForm.get('countryDocument').disable();
    }else if(this.index == 2){
      this.visaForm = this.formBuilder.group({
        visaNumber: [''],
        issuancePlace: [''],
        issuanceDate : [''],
        expiryDate : [''],
        visaDocument : [''],
        passDocument : [''],
        countryDocument : [null, Validators.required]
      });
      if(this.document_type == 'country_id_card'){
        this.visaForm.controls['countryDocument'].setValue(this.countryImage);
      }
      this.visaForm.get('visaNumber').disable();
      this.visaForm.get('issuancePlace').disable();
      this.visaForm.get('issuanceDate').disable();
      this.visaForm.get('expiryDate').disable();
      this.visaForm.get('visaDocument').disable();
      this.visaForm.get('passDocument').disable();
    }
  }

}

