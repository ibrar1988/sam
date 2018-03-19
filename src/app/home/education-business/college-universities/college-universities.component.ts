import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { Router } from '@angular/router'

@Component({
	templateUrl: './college-universities.component.html',
	styleUrls: ['./college-universities.component.css']
})
export class CollegeUniversitiesComponent implements AfterViewInit,OnInit {
    title: string;
    public loading = true;

    constructor(iconRegistry: MdIconRegistry, private router: Router) {
        this.loading = true;
        this.title = 'College & Universities';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    ContactUs(): void{
        this.router.navigate(['/contact-us']);
    }
}