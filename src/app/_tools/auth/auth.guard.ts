import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login']);
    // this.router.navigate(['/accont/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}

@Injectable()
export class CheckSession implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/dashboard/profile']);
      return false;
    } else {
      return true;
    }
  }

}


@Injectable()
export class PremiumGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.premium_status == 'ACTIVE') {
      return true;
    } else {
      this.router.navigate(['/account/completeOrder']);
      return false;
    }

  }
  }

