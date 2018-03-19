import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  routerSubscription: Subscription;
  title: string;
  subtitle: string;
  public loading = true;
  public compatibility = true;

  constructor(private router: Router) {
    this.loading = true;
    // tslint:disable-next-line:indent
    this.title = 'Starter Page';
    this.subtitle = 'This is some text within a card block.'
  }


  ngOnInit(): void {

    // this.routerSubscription = this.router.events
    //   .filter(event => event instanceof NavigationEvent)
    //   .subscribe(event => {
        // window.scrollTo(0, 0);
        console.log('Into Scroll');
      // });
    //Se valida el explorer que se está usando
    // var objAgent = navigator.userAgent;
    // var msie = objAgent.indexOf("MSIE");
    // var trident = objAgent.indexOf('Trident/');
    //
    // if(msie > 0 || trident > 0)
    // {
    //   this.compatibility = false;
    //   this.router.navigate(['/compatibility']);
    // }
    // else
    // {
    //   this.compatibility = true;
    //   this.router.navigate(['/']);
    // }
  }
}
