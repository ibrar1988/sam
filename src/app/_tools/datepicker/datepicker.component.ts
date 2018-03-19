import { Component, OnInit, Injectable, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { datetimePicker } from './datepicker';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

@Injectable()
export class DatepickerComponent implements OnInit {

  @Input() public datetimePicker = new datetimePicker();
  // @Input() public date: string;
  constructor(
    private _notification: NotificationsService

  ) {
  }

  ngOnInit() {
  }

  getDateJSON() {

    if (Number(this.datetimePicker._day) <= 9) {
      this.datetimePicker._day = '0' + Number(this.datetimePicker._day.toString());
    } else {
      this.datetimePicker._day = this.datetimePicker._day.toString();
    }

    if ((Number(this.datetimePicker._month)) <= 9) {
      this.datetimePicker._month = '0' + Number(this.datetimePicker._month).toString();
    } else {
      this.datetimePicker._month = this.datetimePicker._month.toString();
    }

    let date = this.datetimePicker._month + '/' + this.datetimePicker._day + '/' + this.datetimePicker._year;

    if (this.isValidDate(date)) {
      let d = new Date(date);
      let n = d.toJSON();
      return n;

    } else {
      return '';
    }

  }

  getDate() {

    this.datetimePicker._month = (Number(this.datetimePicker._month)).toString();
    return this.datetimePicker;
  }

  setDateJSON(date) {

    let d = new Date(date);

    this.datetimePicker._day = d.getDate().toString();
    this.datetimePicker._month = (d.getMonth() + 1).toString();

    this.datetimePicker._year = d.getFullYear().toString();
  }

  setDate(day, month, year) {

    this.datetimePicker._day = day.toString();
    this.datetimePicker._month = month.toString();
    this.datetimePicker._year = year.toString();
  }

  isValidDate(dateStr) {

    // Checks for the following valid date formats:
    // MM/DD/YYYY
    // Also separates date into month, day, and year variables
    var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;

    var matchArray = dateStr.match(datePat); // is the format ok?
    if (matchArray == null) {
      //  alert("Date must be in MM/DD/YYYY format");
      this._notification.warn('Invalid Date', 'Date must be in MM/DD/YYYY format');
      return false;
    }

    let month = matchArray[1]; // parse date into variables
    let day = matchArray[3];
    let year = matchArray[4];
    if (month < 1 || month > 12) { // check month range
      //  alert("Month must be between 1 and 12");
      this._notification.warn('Invalid Date', 'Month must be between 1 and 12');
      return false;
    }
    if (day < 1 || day > 31) {
      //  alert("Day must be between 1 and 31");
      this._notification.warn('Invalid Date', 'Day must be between 1 and 31');
      return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
      //  alert("Month "+month+" doesn't have 31 days!")
      this._notification.warn('Invalid Date', "Month " + month + " doesn't have 31 days!");
      return false;
    }
    if (month == 2) { // check for february 29th
      var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
      if (day > 29 || (day == 29 && !isleap)) {
        // alert("February " + year + " doesn't have " + day + " days!");
        this._notification.warn("February " + year + " doesn't have " + day + " days!");
        return false;
      }
    }
    return true;  // date is valid
  }



}
