import { Component, OnInit } from '@angular/core';
import { global, template } from '../../helper/global.mock';
import { ILogin, Login } from 'core/interfaces/Account/ILogin';
import { _login, currentUser } from '../../../app/_mock/global';
import { LogoutService } from '../../../core/services/Account/logout.service';
import { IUserResponse } from '../../../core/interfaces/Account/IUserResponse';
import { NotificationsService } from 'angular2-notifications';
import { AfterContentInit, HostListener } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'ma-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [LogoutService, NotificationsService]
})
export class NavigationComponent implements OnInit , AfterContentInit {
  currentUser: ILogin;
  userResponse: IUserResponse;
  errorMessage: any;
  url_image: string;
  menu:boolean = false;
  closeResult: string;

  public isSidebar: boolean;
  public barColor: string;
  public itemColor: string;

  isBlack = false;
  isBlue = false;
  isRed = false;
  isPurple = false;
  isGreen = false;
  isDefault = false;

  ngOnInit() {

    this.isSidebar = global['isSidebar'];

    this.barColor = template['barColor'];
    this.itemColor = template['itemColor'];
  }

  ngAfterContentInit(){
    this.setTheme(this.getBarColor())
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

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

  getBarColor() {
    return template['barColor'];
  }

  getItemColor() {
    this.itemColor = template['itemColor'];
    return this.itemColor;
  }

  initTheme() {
    this.isBlack = false;
    this.isBlue = false;
    this.isRed = false;
    this.isPurple = false;
    this.isGreen = false;
    this.isDefault = false;
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

      default:
        break;
    }

  }


  public is_student() {
    if (localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') !== undefined) {
      const session = JSON.parse(localStorage.getItem('currentUser'));
      // if(session){
        return session.user_roles.includes('STUDENT');
      // }else{
      //   return false;

      // }
    
    } else {
      return false;
    }
  }

  toOrder(){
    this.router.navigate(['/account/completeOrder']);
    
  }

  public get_login() {
    // if (currentUser['currentUser'] != null || currentUser['currentUser'] !== undefined) {
    //   return currentUser['currentUser'];
    // }else {
    //   return false;
    // }

    if (localStorage.getItem('currentUser') != null || localStorage.getItem('currentUser') !== undefined) {
      return JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return false;
    }
  }

  public check_validation() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if ((user.trainning_status !== undefined) && (user.grade !== undefined) && (user.email_validated === true)) {
      return false;
    } else {
      return true;
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

  logout() {
 
    this.logoutService.logout()
      .subscribe(response => {
        this.userResponse = response;
        this._notification.success('Success logout', response.response.message);

      },
      error => {
        this.errorMessage = <any>error;
        this._notification.error('Error login', this.errorMessage);
      });
  }

  get_url_image() {

    if (this.get_login() != null) {
      if (this.get_login().url_image === '') {
        this.url_image = 'assets/images/home/icons6c.png';
        if (this.get_login().gender === 'female') {
          this.url_image = 'assets/images/home/icons6c.png';
        }
      } else {
        this.url_image = this.get_login().url_image;
      }
      //  console.log(this.get_login());
      // console.log(currentUser['currentUser']);
    } else {
      this.url_image = 'assets/images/home/icons6c.png';
    }

    return this.url_image;
  }

  constructor(
    private logoutService: LogoutService, private _notification: NotificationsService,private modalService: NgbModal,
    private router : Router
  ) {
    this.isSidebar = global['isSidebar'];
  }

  toggleMenu(){
    this.menu = !this.menu
  }
  clickedInside($event: Event){
    event.preventDefault();
    $event.stopPropagation();  // <- that will stop propagation on lower layers
    console.log("CLICKED INSIDE, MENU WON'T HIDE");
  }
  
  @HostListener('document:click', ['$event']) clickedOutside($event){
    console.log("CLICKED OUTSIDE");
    if(this.menu){
      this.menu = false;
    }
  }

  openUrl(url){
    //window.location.href = url;
    window.open(url,'_blank');
  }
}
