import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const analyticsRoutes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forChild(analyticsRoutes),

  ],
  exports: [
    RouterModule,
  ]
})
export class AnalyticsRouting {
}


