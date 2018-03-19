import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { MdIconRegistry } from '@angular/material';

@Component({
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements AfterViewInit, OnInit {

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }
    title: string;
    step = 0;
    public loading = true;

    constructor(iconRegistry: MdIconRegistry) {
        this.loading = true;
        // tslint:disable-next-line:indent
        this.title = 'About Us';

        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    setStep(index: number) {
        this.step = index;
    }
}
