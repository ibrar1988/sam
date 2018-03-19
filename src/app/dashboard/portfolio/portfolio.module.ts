import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyticsRouting } from '../analytics/analytics.routing.module';
import { PortfolioComponent, SafePipe, myDateFormat } from './portfolio.component';
import { InputTextareaModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { IC0000Component } from './AboutMe/ic0000/ic0000.component';
import { IC0001Component } from './AboutMe/ic0001/ic0001.component';
import { IC0002Component } from './AboutMe/ic0002/ic0002.component';
import { IC0003Component } from './AboutMe/ic0003/ic0003.component';

import { IC0008Component } from './academic/ic0008/ic0008.component';
import { IC0009Component } from './academic/ic0009/ic0009.component';
import { IC0010Component } from './academic/ic0010/ic0010.component';
import { IC0011Component } from './academic/ic0011/ic0011.component';
import { IC0012Component } from './academic/ic0012/ic0012.component';
import { IC0013Component } from './academic/ic0013/ic0013.component';
import { IC0014Component } from './academic/ic0014/ic0014.component';
import { IC0015Component } from './academic/ic0015/ic0015.component';
import { IC0036Component } from './academic/ic0036/ic0036.component';
import { IC0016Component } from './academic/ic0016/ic0016.component';
import { IC0017Component } from './academic/ic0017/ic0017.component';
import { IC0018Component } from './academic/ic0018/ic0018.component';
import { IC0019Component } from './academic/ic0019/ic0019.component';
import { IC0020Component } from './academic/ic0020/ic0020.component';
import { IC0021Component } from './academic/ic0021/ic0021.component';
import { IC0022Component } from './academic/ic0022/ic0022.component';
import { IC0023Component } from './academic/ic0023/ic0023.component';

import { IC0024Component } from './personal/ic0024/ic0024.component';
import { IC0025Component } from './personal/ic0025/ic0025.component';
import { IC0026Component } from './personal/ic0026/ic0026.component';
import { IC0027Component } from './personal/ic0027/ic0027.component';
import { IC0028Component } from './personal/ic0028/ic0028.component';
import { IC0029Component } from './personal/ic0029/ic0029.component';
import { IC0030Component } from './personal/ic0030/ic0030.component';
import { IC0031Component } from './professional/ic0031/ic0031.component';
import { IC0033Component } from './professional/ic0033/ic0033.component';
import { IC0034Component } from './professional/ic0034/ic0034.component';
import { IC0035Component } from './professional/ic0035/ic0035.component';
import { MdTabsModule } from '@angular/material';
import { AboutmeComponent } from './AboutMe/aboutme.component';
import { AcademicComponent } from './academic/academic.component';
import { PersonalComponent } from './personal/personal.component';
import { ProfessionalComponent } from './professional/professional.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { MdSlideToggleModule } from '@angular/material';
import { MdSliderModule  } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { MdInputModule, MdDatepickerModule, MdNativeDateModule, DateAdapter, NativeDateAdapter, MdRadioModule, MdSelectModule, MdTooltipModule } from '@angular/material';
import { RatingModule } from 'primeng/primeng';
import { ImageUploadModule } from 'angular2-image-upload';
import {ImageCropperComponent, CropperSettings,ImageCropperModule} from 'ng2-img-cropper';


@NgModule({
  imports: [MdSliderModule, RatingModule, MdProgressSpinnerModule , MdSlideToggleModule, BootstrapSwitchModule.forRoot(), FormsModule, CommonModule, InputTextareaModule, BrowserModule, AnalyticsRouting, MdTabsModule, NgbModule.forRoot(), MdInputModule, MdDatepickerModule, MdNativeDateModule, MdRadioModule, MdSelectModule, MdTooltipModule, ImageUploadModule.forRoot(), ImageCropperModule],
  exports: [],
  declarations: [PortfolioComponent, AboutmeComponent, AcademicComponent, PersonalComponent,
    ProfessionalComponent,
    SafePipe, myDateFormat,
    IC0000Component, IC0001Component, IC0002Component, IC0003Component,
    IC0008Component, IC0009Component, IC0010Component, IC0011Component, IC0012Component, IC0013Component, IC0014Component, IC0015Component, IC0036Component, IC0016Component, IC0017Component, IC0018Component, IC0019Component, IC0020Component, IC0021Component, IC0022Component, IC0023Component,
    IC0024Component, IC0025Component, IC0026Component, IC0027Component, IC0028Component, IC0029Component, IC0030Component,
    IC0031Component, IC0033Component, IC0034Component, IC0035Component],
  providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
})
export class PortfolioModule { }
