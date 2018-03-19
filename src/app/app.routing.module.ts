import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { SiteComponent } from 'app/site-template/site/site.component';
import { HomeComponent } from 'app/home/home.component';
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: '**', redirectTo: '' },
  {
    path: '', component: AppComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // { useHash: true, enableTracing: true } <-- debugging purposes only
    ),
    FormsModule
  ],
  exports: [
    RouterModule
  ],

})
export class AppRouting implements OnInit {
  router: any;
  routerSubscription: any;

  constructor() {



  }

  ngOnInit() {

   
  }

}

