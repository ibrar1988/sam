import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// added newly for script tag
import { Renderer2, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class TagAdderService implements OnInit{
    ngOnInit() {}
  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document)
    {}
    addTag(text: string): any {

        let s = this._renderer2.createElement('script');
        s.type = `text/javascript`;
        s.text = text;
       return this._renderer2.appendChild(this._document.head, s);
     }
}
