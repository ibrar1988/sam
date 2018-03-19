import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';

@Component({
	templateUrl: './companies.component.html',
	styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements AfterViewInit,OnInit {
    title: string;
    public loading = true;

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    constructor(iconRegistry: MdIconRegistry) {
        this.loading = true;
        this.title = 'For Companies';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }
}