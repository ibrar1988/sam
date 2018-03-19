import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { Router } from '@angular/router'

@Component({
	templateUrl: './college-student.component.html',
	styleUrls: ['./college-student.component.css']
})
export class CollegeStudentComponent implements AfterViewInit, OnInit {
    title: string;
    public loading = true;

    constructor(iconRegistry: MdIconRegistry, private router: Router) {
        this.loading = true;
        this.title = 'College Students';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    SignUp(): void{
        this.router.navigate(['/account/signup/role']);
    }
}
