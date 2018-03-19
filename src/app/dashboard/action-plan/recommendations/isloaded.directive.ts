import { Directive, Input, Output, EventEmitter } from "@angular/core";

@Directive({selector: '[isLast]'})
export class isLoaded{
   @Input() isLast:boolean;
   @Output() lastDone:EventEmitter<boolean> = new EventEmitter<boolean>();
   ngOnInit() {
     if(this.isLast) {
       this.lastDone.emit(true);
     }
   }
}