import { Component, OnInit, Input, OnDestroy, OnChanges, EventEmitter, Output } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CaptchaModule } from 'primeng/primeng';
import { AccountService } from 'core/services/Account/account.service';
import { TagAdderService } from 'core/services/helper/tagAdder.service';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';
import { NotificationsService } from 'angular2-notifications';
import { ILogin } from 'core/interfaces/Account/ILogin';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { DatepickerComponent } from 'app/_tools/datepicker/datepicker.component';
import { datetimePicker } from 'app/_tools/datepicker/datepicker';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  providers: [TagAdderService] 
  // directives : [DatepickerComponent]
})
export class EmailComponent implements OnInit {
  facebookid: string;


  response: IUserResponse;
  loginResponse: ILoginResponse;

  errorMessage: any;
  loading: boolean;
  

  closeResult: string;

  constructor(
    private accountService: AccountService,
    private tagAdderService: TagAdderService,
    private _notification: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private datepickerComponent: DatepickerComponent,
    private modalService: NgbModal,

    //added newly for script tag
    //private _renderer2: Renderer2, @Inject(DOCUMENT) private _document
  ) {



  }


  // @Input() datePickerI: DatepickerComponent;
  // @Output() datePickerO: EventEmitter<DatepickerComponent> = new EventEmitter<DatepickerComponent>();
  public signupLock: boolean;
  public email = '';
  public username = '';
  public password = '';
  public confirmationPassword = '';
  public birthday = '';
  public kind = '';
  public name = '';
  public gender = 'male';
  private url_image = '';

  public firstname = '';
  public lastname = '';

  public _day: number;
  public _month: number;
  public _year: number;

  public recaptcha = false;
  public terms = false;

  public submitted = false;

  public form_disabled = false;
  private _datetimePicker = new datetimePicker();


  ngOnInit() {

    //addded newly for script tag.
    this.tagAdderService.addTag('fbq("track", "AddToCart")');

    if (localStorage.getItem('fb_session')) {
      this.form_disabled = true;
      const fb_session = <ILogin>JSON.parse(localStorage.getItem('fb_session'));
      this.email = fb_session.username;
      this.firstname = fb_session.first_name;
      this.lastname = fb_session.last_name;
      this.url_image = fb_session.url_image;
      this.facebookid = fb_session.facebookid;


    }


    this.route.params.subscribe(params => {
      if (params['role'] === 'mentor' || params['role'] === 'student') {
        this.kind = params['role'];
      } else {
        this.kind = 'mentor';
      }
    });

    // let user_profile = JSON.parse(localStorage.getItem('user_profile'));

    // if (user_profile !== null) {
    //   this.email = user_profile.username;
    //   this.firstname = user_profile.firstname;
    //   this.lastname = user_profile.lastname;

    // }


  }

  // ngOnChanges() {
  //   alert("Input " + this.datePickerI);
  //   alert("Output " + this.datePickerO);
  // }

  showResponse(response) {
    //call to a backend to verify against recaptcha with private key

    this.recaptcha = true;
  }

  validateTerms() {
    this.terms = !this.terms;
  }

  onChange(deviceValue) {
    this.gender = deviceValue;
  }

  getDays() {

    let days: Array<number> = [];

    for (var index = 1; index <= 31; index++) {
      days.push(index);

    }
    return days;
  }


  getYears() {
    let years: Array<number> = [];
    for (var index = 2010; index >= 1970; index--) {
      years.push(index);

    }
    return years;

  }

  getMonths() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months;

  }

  setMonth(month) {
    this._month = month + 1;
  }

  setDay(day) {
    this._day = day;
  }

  setYear(year) {
    this._year = year;
  }

  setGender(gender: string) {
    this.gender = gender;
  }


  checkAge(dateString:string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 13)
    {
        return false;
    }
    else
    {
      return true;
    }

}

  signup(validation) {

    // alert(this.password + ' - ' + this.confirmationPassword);
 
  //console.log('age: ' + this.getAge("1990/10/12"));






    if (validation && this.password === this.confirmationPassword) {
      if (this.terms) {
        this.signupLock = true;
        this.loading = true;
        let dateOk = false;
        if (this._datetimePicker._day && this._datetimePicker._month && this._datetimePicker._year) {
          this.datepickerComponent.setDate(this._datetimePicker._day, this._datetimePicker._month, this._datetimePicker._year);
          this.birthday = this.datepickerComponent.getDateJSON();
          dateOk = true;
        }

        let ageOk = this.checkAge(this._datetimePicker._year+'/'+this._datetimePicker._month+'/'+ this._datetimePicker._day);
        if(!ageOk)
        {
          this.signupLock = false;
          this._notification.warn('Fields validation', 'Hey, to use our services you need to be at least 14 years old. Please ask a parent to sign up for you!');
        }
        if(ageOk){
        if (dateOk) {
          this.username = this.email;
          /*#g removed genter from registration form*/
          this.accountService.postAccount(this.username, this.password, this.birthday, this.kind, this.firstname, this.lastname,  this.url_image, this.facebookid)
            .subscribe(Response => {
              this.loginResponse = Response;
              this.signupLock = false;
              if (this.loginResponse.response.code === 'AM0000') {
               
                this._notification.success('Account Created', this.loginResponse.response.message);
                
                if (!this.form_disabled) {
                  
                  localStorage.setItem('temp_email', this.username);
                  this.router.navigate(['/account/activate']);
                  
                } else {
                  localStorage.setItem('currentUser', JSON.stringify(this.loginResponse.login));
                  this.router.navigate(['/account/welcome']);

                };

              } else {
               
                if (this.loginResponse.response.code === 'AM0007') {
                 localStorage.setItem('currentUser', JSON.stringify(this.loginResponse.login));
                  localStorage.setItem('temp_email', this.username);
                  this.router.navigate(['/account/activate']);
                  this._notification.success('Confirmation Account', 'Please check your Email and confirmate your Account');


                } else {
                  this._notification.error('Registration Error', this.loginResponse.response.message);
                }

              }
              this.loading = false;
            },
            error => {
              this.signupLock = false;
              this.errorMessage = <any>error;
              this._notification.error('Registration Error', this.loginResponse.response.message);
              this.loading = false;
            });
        } else {
          this.signupLock = false;
          this._notification.warn('Fields validation', 'Check that your fields are valid');
        }
      }
      } else {
        this.signupLock = false
        this._notification.warn('Fields validation', 'Please accept the Terms');
      }
    } else {
      this._notification.warn('Fields validation', 'Check that your fields are valid');
    }


  }

  setStudent() {
    this.kind = 'student';
  }

  setMentor() {
    this.kind = 'mentor';
  }

  open(content) {
    this.modalService.open(content, { size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
