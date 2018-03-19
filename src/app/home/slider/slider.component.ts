import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'home-slider',
  templateUrl: './slider.component.html'
})
export class SliderComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
}
}

