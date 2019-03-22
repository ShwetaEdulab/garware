import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable, Subscriber,Subject} from 'rxjs/Rx';
import { NbAuthService } from '@nebular/auth';
import { NbThemeService } from '@nebular/theme';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class InstituteApiService {
  private baseUrl = config.serverUrl;
  constructor(
    private httpClient : HttpClient,
    public authService : NbAuthService,
    public themeService : NbThemeService) { 
    }

  //Course Listing Starts Here//
  getCourseList(){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/course-listing`);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  getCourse(name){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/searchDegree?country=India&degree=`+name);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  getspecialization(coursename, degreename){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/searchDegree?country=India&degree=`+degreename+`&course=`+coursename);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  getCourseId(degreename,coursename,specialization){
    try{
      return this.httpClient.post(`${this.baseUrl}/institute_api/getCourseId`,{
        degree : degreename,
        course : coursename,
        specialization : specialization
      });
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }
  
  courseList(courseId){
    //var courseId;
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/course?courseId=`+courseId);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  
  saveCourseOverview(instituteId,overview_data,courseId){
    try{
      return  this.httpClient.post(`${this.baseUrl}/institute_api/`+instituteId+`/course/course-overview`,{
        data : overview_data,courseId
      });
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  facultyData(faculty_data,courseID){
    try{
      return  this.httpClient.post(`${this.baseUrl}/institute_api/`+courseID+`/faculty`,{
        data : faculty_data,courseID
      });
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  deleteFaculty(id){
    try{
      return  this.httpClient.delete(`${this.baseUrl}/institute_api/faculty/course/`+id);
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  addUpdateCurriculum(collegeId,courseID,semester_no,subjects,currId){
    // var collegeId = 1;
    // var courseId = 39;
    try{
      return this.httpClient.post(`${this.baseUrl}/institute_api/`+collegeId+`/course/`+courseID+`/academics`,{
        semester : semester_no, 
        subjects : subjects,
        academicId : currId
      });
    }catch(error){
      this.handleError("setProfileValues: "+JSON.stringify(error));
    }
  }

  getCurriculum(currId,courseID,collegeId){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/`+collegeId+`/course/`+courseID+`/academics/`+currId);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  deleteCurriculum(collegeId,courseID,id){
    try{
      return this.httpClient.delete(`${this.baseUrl}/institute_api/`+collegeId+`/course/`+courseID+`/academics/`+id);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  //Course Listing Ends Here//

  //Applicaton Starts Here//
  getApplication(tab){
    try{
      return this.httpClient.get(`${this.baseUrl}/institute_api/application`);
    }catch(error) {
      this.handleError("getApplication : "+JSON.stringify(error));
    }
  }

  //Applicaton Ends Here//


  //Dashboard Starts Here//
  async getDashboardData(){
    try{
       return await this.httpClient.get(`${this.baseUrl}/institute_api/dashboard`);     
    }catch(error) {
      this.handleError("getApplicationLength : "+error);
    }
  }

  //Dashboard Ends Here//




  private handleError(error){
    console.error(error);
  }




}