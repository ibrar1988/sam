import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';

@Component({
	templateUrl: './principal.component.html',
	styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit,OnInit {
	title: string;
    subtitle: string;
    public loading = true;

        constructor() {
        this.loading = true;
            // tslint:disable-next-line:indent
            this.title = 'Starter Page';
            this.subtitle = 'This is some text within a card block.'
        }
        ngOnInit(): void {
            window.scrollTo(0, 0);
        }

  ngAfterViewInit(): void {
    this.loading = false;
  }
}
