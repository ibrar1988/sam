import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { _login, currentUser } from '../../../app/_mock/global';
import { ILogin } from 'core/interfaces/Account/ILogin';
import { template } from 'app/helper/global.mock';
import { AfterContentInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
// tslint:disable-next-line:one-line
export class SidebarComponent implements OnInit, OnChanges {

 

  ngOnChanges(): void {
    this.setTheme(this.getBarColor());

  }
  color: string;
  barColor: string;
  closeResult: string;

  public url_image = '';
  public currentUser: ILogin;

  isBlack = false;
  isBlue = false;
  isRed = false;
  isPurple = false;
  isGreen = false;
  isDefault = false;
  isTheme1 = false;
  isTheme2 = false;
  isTheme3 = false;
  isTheme4 = false;

constructor(private modalService: NgbModal,
  private router : Router){}

  ngOnInit(): void {

    this.currentUser = <ILogin>JSON.parse(localStorage.getItem('currentUser'));
    this.barColor = '' + template['barColor'] + '';

    this.setTheme(this.barColor);
    // if (this.currentUser != null) {
    //   if (this.currentUser.url_image === '') {
    //     this.url_image = 'assets/images/users/default-man.png';
    //     if (this.currentUser.gender === 'female') {
    //       this.url_image = 'assets/images/users/default-woman.png';
    //     }
    //   }
    //   console.log(this.currentUser);
    //   console.log(currentUser['currentUser']);
    // }
  }

  ngAfterContentInit() {
    this.setTheme(this.getBarColor());
  }
  setHide(){
    window.location.replace("dashboard/action-plan/myPlan");
   
  } 
  getBarColor() {
    return template['barColor'];
  }
  redirectTo(){
    window.location.replace("dashboard/action-plan/myPlan");
    //this.router.navigate(['dashboard/action-plan/myPlan'])
  }
 open(content) {
  this.modalService.open(content, { size: 'lg'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

open2(content) {
  this.modalService.open(content, { size: 'sm'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

toOrder(){
  this.router.navigate(['/account/completeOrder']);
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
  
  public check_premium() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.premium_status == 'ACTIVE') {
      return true;
    } else {
      return false;
    }

  }
  public check_premium_false() {
    
      return true;
   

  }


  changeStyle($event) {
    this.color = $event.type == 'mouseover' ? 'yellow' : 'red';
  }

  initTheme() {
    this.isBlack = false;
    this.isBlue = false;
    this.isRed = false;
    this.isPurple = false;
    this.isGreen = false;
    this.isDefault = false;
    this.isTheme1 = false;
    this.isTheme2 = false;
    this.isTheme3 = false;
    this.isTheme4 = false;
  }

  setTheme(theme) {

    switch (theme) {
      case 'black':
        this.initTheme();
        this.isBlack = true;
        break;
      case 'blue':
        this.initTheme();
        this.isBlue = true;
        break;
      case 'red':
        this.initTheme();
        this.isRed = true;
        break;
      case 'purple':
        this.initTheme();
        this.isPurple = true;
        break;
      case 'green':
        this.initTheme();
        this.isGreen = true;
        break;
      case 'default':
        this.initTheme();
        this.isDefault = true;
        break;
      case 'theme-1':
        this.initTheme();
        this.isTheme1 = true;
        break;
      case 'theme-2':
        this.initTheme();
        this.isTheme2 = true;
        break;
      case 'theme-3':
        this.initTheme();
        this.isTheme3 = true;
        break;
      case 'theme-4':
        this.initTheme();
        this.isTheme4 = true;
        break;

      default:
        break;
    }

  }

  public is_student() {
    if (localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') !== undefined) {
      const session = JSON.parse(localStorage.getItem('currentUser'));
      // if (session) {
        return session.user_roles.includes('STUDENT');
      // } else {
      //   return false;

      // }
    } else {
      return false;
    }
  }

  // user_roles.includes('STUDENT')
}
