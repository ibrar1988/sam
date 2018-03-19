import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
	templateUrl: './our-team.component.html',
	styleUrls: ['./our-team.component.css']
})
export class OurTeamComponent implements AfterViewInit, OnInit {
    title: string;
    public loading = true;

    ngOnInit(): void {
        window.scrollTo(0, 0);
    }

    constructor() {
        this.loading = true;
        this.title = 'Our Team';
    }

    ngAfterViewInit(): void {
        this.loading = false;
    }
}
