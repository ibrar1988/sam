import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { Router } from '@angular/router'

@Component({
	templateUrl: './school-student.component.html',
	styleUrls: ['./school-student.component.css']
})
export class SchoolStudentComponent implements AfterViewInit,OnInit {
    ngOnInit(): void {
        window.scrollTo(0, 0);
    }
    title: string;
    public loading = true;

    constructor(iconRegistry: MdIconRegistry, private router: Router) {
        this.loading = true;
        this.title = 'About Us';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    SignUp(): void{
        this.router.navigate(['/account/signup/role']);
    }
}
