import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
	templateUrl: './employers.component.html',
	styleUrls: ['./employers.component.css']
})
export class EmployersComponent implements AfterViewInit,OnInit {
    title: string;
    public loading = true;

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }
    constructor(private router: Router) {
        this.loading = true;
        this.title = 'Employers';
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    ContactUs(): void{
        this.router.navigate(['/contact-us']);
    }
}
