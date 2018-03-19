import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors-vendors.component.html',
  styleUrls: ['./tutors-vendors.component.css']
})
export class TutorsVendorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
}

}
