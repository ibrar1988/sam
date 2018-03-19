import { Component, OnInit } from '@angular/core';
import { AccountService } from 'core/services/Account/account.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FbService } from 'core/services/Account/fbLogin.service';
import { RoleComponent } from './role/role.component';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AccountService, FbService]
})
export class SignupComponent implements OnInit {
  role: string;

  type = '';
  constructor(
    private createAccountService: AccountService,
    private fb: FbService,
    private _router: Router,
    private route: ActivatedRoute,
    private metaService: Meta
  ) {
    localStorage.removeItem('fb_session');
    
    this.metaService.addTag({property: 'title', content: 'Signup Page'});
    this.metaService.addTag({property: 'description', content: 'Signup Page of Myklovr'});
  }

  ngOnInit() {
    this.route.params.subscribe(params => { this.role = params['role']; });
  }

  signup() {

    /* this.signinService.postSignin(this.username, this.password, this.birthday, this.kind, this.name); */
  }

  register() {

    this._router.navigate(['/account/register/role/' + this.role]);


  }


  loginWithFacebook(): void {
    this.fb.loginWithFacebook(this.role);

  }


  setStudent() {
    this.role = 'student';
  }

  setMentor() {
    this.role = 'mentor';
  }

}
