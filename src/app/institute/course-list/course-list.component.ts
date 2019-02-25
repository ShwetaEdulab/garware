import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  constructor(
    protected router : Router,
  ) { }

  ngOnInit() {
  }

  courseAddEdit(){
    // this.router.navigate(['pages/course-management'],{queryParams:{postal_code:''}});
    this.router.navigate(['pages/course-management']);
  }

}
