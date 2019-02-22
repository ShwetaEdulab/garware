import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { SearchModule } from './search/search.module';
import { ProfileModule } from "./profile/profile.module";
import { DownloadsModule } from "./downloads/downloads.module";
import { ApplicationModule } from "./application/application.module";
import { CartModule } from "./cart/cart.module";
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CollegeinfoModule } from './collegeinfo/collegeinfo.module';
import { SettingsComponent } from './settings/settings.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { SelectCollegeModule } from "./selectcollege/selectcollege.module";
import { CourseModule } from "./course/course.module";
import { ApplicationStepsModule } from "./application/applicationsteps/applicationsteps.module";
import { PreferencesModule } from './cart/preference/preferences.module';
import { SecondCancelModule } from "./paymentrequests/SecondCancel.module";
import { ThirdCancelModule } from "./paymentrequests/ThirdCancel.module";
import { SecondFailureModule } from "./paymentrequests/SecondFailure.module";
import { ThirdFailureModule } from "./paymentrequests/ThirdFailure.module";
import { searchCourseModule } from "./course/searchCourse/searchCourse.module";
import { FirstSuccessModule } from "./paymentrequests/FirstSuccess.module";
import { HelpModule } from "./help/help.module";
import { Data } from "../shared/data";
import { PeerModule } from "./peers/peers.module";
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    SearchModule,
    DashboardModule,
    MiscellaneousModule,
    ProfileModule,
    DownloadsModule,
    CartModule,
    ApplicationModule,
    CollegeinfoModule,
    NgxUploaderModule,
    SelectCollegeModule,
    CourseModule,
    ApplicationStepsModule,
    SecondCancelModule,
    SecondFailureModule,
    ThirdCancelModule,
    ThirdFailureModule,
    PreferencesModule,
    searchCourseModule,
    FirstSuccessModule,
    HelpModule,
    PeerModule,
  ],
  providers: [Data],
  declarations: [
    ...PAGES_COMPONENTS,
    SettingsComponent,
  ],
  exports: [
    NgxUploaderModule,
  ],
})
export class PagesModule {
}
