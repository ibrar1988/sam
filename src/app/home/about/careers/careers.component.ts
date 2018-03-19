import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';

@Component({
	templateUrl: './careers.component.html',
	styleUrls: ['./careers.component.css']
})
export class CareersComponent implements AfterViewInit, OnInit {
    title: string;
    public loading = true;

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }
    constructor(iconRegistry: MdIconRegistry) {
        this.loading = true;
        this.title = 'Careers';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }
}
