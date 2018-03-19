import { Component, OnInit } from '@angular/core';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';
import { NavigationEnd } from '@angular/router';



declare const $: any;

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  router: any;

  constructor() { }

  ngOnInit() {
    (<any>$('#sidebarnav')).metisMenu();
  //   this.router.events.subscribe((evt) => {
  //     if (!(evt instanceof NavigationEnd)) {
  //         return;
  //     }
  //     window.scrollTo(0, 0)
  // });

  }

  
}
