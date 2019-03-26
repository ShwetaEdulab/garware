import {Component} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NbSearchService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { HeaderComponent } from '../../@theme/components/header/header.component';

@Component({
    selector: 'totalcourse',
    templateUrl: './totalcourse.component.html',
    styleUrls: ['./totalcourse.scss'],
    providers:[HeaderComponent],
  })
  export class TotalCourseComponent {
  courselist_data: any;
    constructor(private router : Router,
      private route: ActivatedRoute,
      private api : ApiService,
      private searchService : NbSearchService,
      private dialogService: NbDialogService,
      private comp: HeaderComponent,
    ) {
    }
    courseid ;
    collegeId;
    collegelist;
    courselist;
    courselistCount;
    college_principal;
    college_vice_principal;
    Dropdownvar = 0;
    collegedata;
    status;
    alertflag = 0;
    gallery;
    placement;
    accreditation;
    video;
    naac_rating;
    college_affiliates;
    AFFILIATE_IMAGE_PATH;
    college_foreign_nationals;
    lat: number;
    lng: number;
    counsellor_img;
    available_counsellors;
    peerstatus:any;
    available_from:any;
    available_to:any;
    mobile :any;
    peer : any;
    peer_id : any;

    async ngOnInit() {
      this.api.getTheme();
      this.api.allcoursedetails().subscribe(data=>{
        //console.log("data['data']======>"+JSON.stringify(data['data']));
        this.courselist_data = data['data']['courses'];
        //console.log("this.courselist_data======>"+this.courselist_data.length);
      })
  
    }

    redirectCourse(course_id,specialization){
      this.router.navigate(['pages/course'],{queryParams:{course_id:course_id,specialization:specialization}});
    }

    
redirectToPeers(college_id,id){
 // console.log("id========>"+id);
  //console.log("college_id========>"+college_id);
  this.router.navigate(['pages/peers'],{queryParams:{college_id:college_id,cour_id:id}}); 
 }

    onClickMe(x) {
       this.Dropdownvar = x;
     }

     
   }


