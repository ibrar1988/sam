import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { Router } from '@angular/router'

@Component({
	templateUrl: './parents.component.html',
	styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements AfterViewInit,OnInit {
    title: string;
    public loading = true;

    constructor(iconRegistry: MdIconRegistry, private router: Router) {
        this.loading = true;
        this.title = 'Parents';
        iconRegistry.registerFontClassAlias('fontawesome', 'fa');
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    SignUp(): void{
        this.router.navigate(['/account/signup/role']);
    }
}
