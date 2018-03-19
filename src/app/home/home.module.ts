import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { HomeComponent, SafePipe } from './home.component';
import { PrincipalComponent } from './principal/principal.component';
import { AboutUsComponent } from './about/about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SchoolStudentComponent } from './student-parents/school-student/school-student.component';
import { ParentsComponent } from './student-parents/parents/parents.component';
import { EmployersComponent } from './education-business/employers/employers.component';
import { OurTeamComponent } from './about/our-team/our-team.component';
import { PublicPrivateSchoolsComponent } from './education-business/public-private-schools/public-private-schools.component';
import { CollegeStudentComponent } from './student-parents/college-student/college-student.component';
import { CollegeUniversitiesComponent } from './education-business/college-universities/college-universities.component';
import { CareersComponent } from './about/careers/careers.component';
import { CompaniesComponent } from './companies/companies.component';
import { EmployeesComponent } from './employees/employees.component';
import { StudentVlogComponent } from './student-vlog/student-vlog.component';
import { CompatibilityComponent } from './compatibility/compatibility.component';
import { PlansComponent } from 'app/account/plans/plans.component';
import { PlansModule } from 'app/account/plans/plans.module';
import { MdExpansionModule, MdIconModule, MdInputModule, MdSelectModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { TutorsVendorsComponent } from './tutors-vendors/tutors-vendors.component';
import { BotComponent } from 'app/home/bot/bot.component';
import { MediaComponent } from 'app/home/media/media.component';
import {MdRadioModule} from '@angular/material';
import { NotificationsService } from 'angular2-notifications/dist';
import { AboutService } from 'core/services/About/aboutUs.service';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    PlansModule,
    MdExpansionModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBy3Zjt7E0ICt-jqqI20QoVsAGT6QQdhLg'
    })
  ],
  declarations: [
    // PlansComponent,
    HomeComponent,SafePipe,
    SliderComponent,
    FooterComponent,
    AboutUsComponent,
    PrincipalComponent,
    ContactUsComponent,
    SchoolStudentComponent,
    ParentsComponent,
    EmployersComponent,
    OurTeamComponent,
    PublicPrivateSchoolsComponent,
    CollegeStudentComponent,
    CollegeUniversitiesComponent,
    CareersComponent,
    CompaniesComponent, EmployeesComponent, StudentVlogComponent, TutorsVendorsComponent, BotComponent, MediaComponent,
    CompatibilityComponent
  ],
  providers: [
    NotificationsService,
    AboutService

  ],
  bootstrap: [HomeComponent]
})
export class HomeModule {

  constructor() {
    localStorage.removeItem('fb_session');
  }
}

