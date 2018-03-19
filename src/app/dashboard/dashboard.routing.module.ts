import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SiteComponent } from '../site-template/site/site.component';
import { LoginComponent } from 'app/account/login/login.component';
//changed the home page from PrincipalComponent to LoginComponent
import { AccountComponent } from 'app/account/account.component';
import { HomeComponent } from 'app/home/home.component';
import { PrincipalComponent } from 'app/home/principal/principal.component';
import { AboutUsComponent } from 'app/home/about/about-us/about-us.component';
import { ContactUsComponent } from 'app/home/contact-us/contact-us.component';
import { SchoolStudentComponent } from 'app/home/student-parents/school-student/school-student.component';
import { ParentsComponent } from 'app/home/student-parents/parents/parents.component';
import { EmployersComponent } from 'app/home/education-business/employers/employers.component';
import { EmployeesComponent } from 'app/home/employees/employees.component';
import { OurTeamComponent } from 'app/home/about/our-team/our-team.component';
import { PublicPrivateSchoolsComponent } from 'app/home/education-business/public-private-schools/public-private-schools.component';
import { CollegeStudentComponent } from 'app/home/student-parents/college-student/college-student.component';
import { CollegeUniversitiesComponent } from 'app/home/education-business/college-universities/college-universities.component';
import { CareersComponent } from 'app/home/about/careers/careers.component';
import { CompaniesComponent } from 'app/home/companies/companies.component';
import {PeohroComponent} from 'app/home/peohro/peohro.component';
import {StudentVlogComponent} from 'app/home/student-vlog/student-vlog.component';

import { ProfileComponent } from './profile/profile.component';
import { RoleComponent } from 'app/account/signup/role/role.component';
import { IC0000Component } from 'app/dashboard/portfolio/AboutMe/ic0000/ic0000.component';
import { DashboardComponent } from './dashboard.component';
import { FinderComponent } from './analytics/finder/finder.component';
import { AnalyticsComponent } from 'app/dashboard/analytics/analytics.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutmeComponent } from './portfolio/AboutMe/aboutme.component';
import { AcademicComponent } from './portfolio/academic/academic.component';
import { PersonalComponent } from './portfolio/personal/personal.component';
import { ProfessionalComponent } from './portfolio/professional/professional.component';
import { AuthGuard , PremiumGuard } from 'app/_tools/auth';

import { MentorsComponent } from 'app/dashboard/mentors/mentors.component';
import { ActionPlanComponent } from 'app/dashboard/action-plan/action-plan.component';
import { AchievementHistoryComponent } from 'app/dashboard/action-plan/achievement-history/achievement-history.component';
import { MyPlanComponent } from 'app/dashboard/action-plan/my-plan/my-plan.component';
import { RecommendationsComponent } from 'app/dashboard/action-plan/recommendations/recommendations.component';
import { TutorsVendorsComponent } from 'app/home/tutors-vendors/tutors-vendors.component';
import { BotComponent } from 'app/home/bot/bot.component';
import { MediaComponent } from 'app/home/media/media.component';
import { CompatibilityComponent } from 'app/home/compatibility/compatibility.component';


const dashboardRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard/profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
      { path: 'mentors', component: MentorsComponent },
      {
        path: 'analytics', component: AnalyticsComponent,
        children: [
          { path: 'finder', component: FinderComponent }
        ]
      },
      {
        path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: '/portfolio/about-me', pathMatch: 'full' },
          { path: 'about-me', component: AboutmeComponent },
          { path: 'academic', component: AcademicComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'professional', component: ProfessionalComponent }
        ]
      },
      {
        path: 'action-plan', component: ActionPlanComponent, canActivate: [AuthGuard],
        children: [
          // { path: '', redirectTo: '/portfolio/about-me', pathMatch: 'full'},
          { path: 'achievementHistory', component: AchievementHistoryComponent },
          { path: 'myPlan', component: MyPlanComponent },
          { path: 'myPlan/:plan', component: MyPlanComponent },
          { path: 'recommendations', component: RecommendationsComponent }

        ]
      }
    ]
  },
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'account/login', pathMatch: 'full'  },
      { path: 'account/login', component: LoginComponent },
      { path: 'home', component: PrincipalComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'high-school-students', component: SchoolStudentComponent },
      { path: 'parents', component: ParentsComponent },
      // { path: 'employers', component: EmployersComponent },
      { path: 'employers', component: EmployeesComponent },
      { path: 'tutors-vendors', component: TutorsVendorsComponent },
      { path: 'bot', component: BotComponent },
      { path: 'media', component: MediaComponent },
      { path: 'our-team', component: OurTeamComponent },
      { path: 'public-private-schools', component: PublicPrivateSchoolsComponent },
      { path: 'college-students', component: CollegeStudentComponent },
      { path: 'colleges-universities', component: CollegeUniversitiesComponent },
      { path: 'careers', component: CareersComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'peos-hros', component: PeohroComponent },
      { path: 'student-vlog', component: StudentVlogComponent },
      { path: 'compatibility', component: CompatibilityComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [
    RouterModule,

  ]
  // ,
  // declarations: [
  //   // SiteComponent,AccountComponent,LoginComponent,EmailRecoveryPasswordComponent,ChangePasswordComponent,ActivateComponent,
  //   // RecoveryPasswordComponent,SignupComponent,EmailComponent
  // ]
})

export class DashboardRouting {

}


