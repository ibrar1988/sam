import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { LoginService } from 'core/services/Account/login.service';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})
export class AcademicComponent implements OnInit {
  errorMessage: string;
  public type = '';
  @Output() EventOutput: EventEmitter<string> = new EventEmitter<string>();
  container_ic0037_tooltip = "Programs created by the College Board that offer college-level curricula and examinations to high school students. American colleges and universities may grant placement and course credit to students who obtain high scores on the examinations.";
  container_ic0037_name= "Advanced Courses & Exams"; 

  constructor(
    private loginService: LoginService, private _notification: NotificationsService) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onEvent(message:string): void{
    this.EventOutput.emit(message);
    //let user = JSON.parse(localStorage.getItem("currentUser"));
    //this.grade = user.grade;
  }
}
