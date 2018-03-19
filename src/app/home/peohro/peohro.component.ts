import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peohro',
  templateUrl: './peohro.component.html',
  styleUrls: ['./peohro.component.css']
})
export class PeohroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ContactUs(): void{
    this.router.navigate(['/contact-us']);
  }
}
