import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementHistoryComponent } from './achievement-history/achievement-history.component';
import { ActionPlanComponent } from './action-plan.component';
import { MyPlanComponent } from './my-plan/my-plan.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CarouselModule} from 'primeng/primeng';
import * as $ from 'jquery';
import { MdProgressSpinnerModule, MdInputModule } from '@angular/material';
import { isLoaded } from 'app/dashboard/action-plan/recommendations/isloaded.directive';

@NgModule({
  imports: [
    FormsModule, CommonModule,
    Ng2SearchPipeModule, //including into imports
    Ng2OrderModule, // importing the sorting package here
    CarouselModule,
    NgxPaginationModule,
    NgbModule,
    MdProgressSpinnerModule,
    MdInputModule
  ],
  declarations: [AchievementHistoryComponent, MyPlanComponent, RecommendationsComponent, isLoaded]
})
export class ActionPlanModule { }
