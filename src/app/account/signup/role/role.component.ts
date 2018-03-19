import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: 'role.component.html'
})

export class RoleComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute, ) {
      this.router.events.subscribe(() => {
        window.scroll(0, 0);
      });
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   if (params['role'] === 'mentor' || params['role'] === 'student') {
    //     this.role = params['role'];
    //   } else {
    //     this.role = 'mentor';
    //   }
    // });

  }

  register(role) {
    if (localStorage.getItem('temp_email')) {
      this.router.navigate(['/account/register/role/' + role]);
    } else {
      this.router.navigate(['/account/signup/role/' + role]);
    }


  }



}
