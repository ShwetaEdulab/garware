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
}