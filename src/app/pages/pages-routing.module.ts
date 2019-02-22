import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { CartComponent } from './cart/cart.component';
import { ApplicationComponent } from './application/application.component';
import { CollegeinfoComponent } from './collegeinfo/collegeinfo.component';
import { SettingsComponent } from './settings/settings.component';
import { SelectCollegeComponent } from './selectcollege/selectcollege.component';
import { CourseComponent } from './course/course.component';
import { ApplicationStepsComponent } from './application/applicationsteps/applicationsteps.component';
import { PreferencesComponent } from './cart/preference/preferences.component';
import { SecondCancelComponent } from './paymentrequests/SecondCancel.component';
import { SecondFailureComponent } from './paymentrequests/SecondFailure.component';
import { ThirdCancelComponent } from './paymentrequests/ThirdCancel.component';
import { ThirdFailureComponent } from './paymentrequests/ThirdFailure.component';
import { searchCourseComponent } from './course/searchCourse/searchCourse.component';
import { FirstSuccessComponent } from './paymentrequests/FirstSuccess.component';
import { HelpComponent } from './help/help.component';
import { ViewTicketComponent } from './help/viewTicket/viewTicket.component';
import { PeersComponent } from './peers/peers.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },{
    path: 'profile',
    component: ProfileComponent,
  }, 
  {
    path: 'search',
    component: SearchComponent,
  },
   {
    path: 'application',
    component: ApplicationComponent ,
  },
  {
    path: 'application/process',
    component: ApplicationStepsComponent,
  },
  {
    path: 'FirstSuccess',
    component: FirstSuccessComponent,
  }, 
  {
    path: 'SecondCancel',
    component: SecondCancelComponent,
  },
  {
    path: 'ThirdCancel',
    component: ThirdCancelComponent,
  },
  {
    path: 'ThirdFailure',
    component: ThirdFailureComponent,
  },
  {
    path: 'SecondFailure',
    component: SecondFailureComponent,
  },
  {
    path: 'downloads',
    component: DownloadsComponent,
  }, {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'preferences',
    component:PreferencesComponent,
  },
  {
    path: 'college',
    component: CollegeinfoComponent,
  },
  {
    path: 'course',
    component: CourseComponent,
  },
  {
    path: 'search/course',
    component: searchCourseComponent,
  },  
  {
    path: 'selectcollege',
    component: SelectCollegeComponent,
  },
  {
    path: 'peers',
    component: PeersComponent,
  }, 
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'viewTicket',
    component: ViewTicketComponent,
  },
   {
    path: 'settings',
    component: SettingsComponent,
  },   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
