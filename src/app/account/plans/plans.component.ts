import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  constructor(
    private router: Router,
    private metaService: Meta
  ) { }

  ngOnInit() {
  }

  choosePlan() {

    this.router.navigate(['/account/completeOrder']);
  }

  public get_login() {
    if (localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') !== undefined) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return false;
    }
  }
}
