import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
declare var moment: any;

@Pipe({
  name: 'myDateFormat'
})
export class myDateFormat implements PipeTransform {
   transform(value: any, args: string[]): any {
     if (value) {
         var date = value instanceof Date ? value : moment(value);
         if (args && args.length > 0)
             return moment(date).format(args);
         else 
            return moment(date).format('HH:mm');
    }
  }
} 
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  first_name: string;
  last_name: string;
  url_image_profile: string;
  grade: string;
  image_profile_default: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7hYNfHxOzH6TLbREidb_qhnNm_aGjsxsY-GjQVDJIEhc0A5ab";
  
  constructor(private router: Router) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.grade = user.grade;
    this.url_image_profile = (user.url_image == undefined || user.url_image == "") ? this.image_profile_default : user.url_image;
    this.router.navigate(['/dashboard/portfolio/about-me']);
  }

  onEvent(message:string): void{
    this.grade = message;
  }

  TabChange(event){
    let position = event.index;
    switch(position){
      case 0:
      this.router.navigate(['/dashboard/portfolio/about-me']);
      break;

      case 1:
      this.router.navigate(['/dashboard/portfolio/academic']);
      break;

      case 2:
      this.router.navigate(['/dashboard/portfolio/personal']);
      break;
      
      case 3:
      this.router.navigate(['/dashboard/portfolio/professional']);
      break;
    }
  }

}
