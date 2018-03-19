import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ContactUs(): void{
    this.router.navigate(['/contact-us']);
  }
}
