import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

@Injectable()
export class ValidateToken implements HttpInterceptor {

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
       
         var subscription =  next.handle(req).do(evt => {
            console.log('---> status exit:', evt);

            if (evt instanceof HttpResponse) {
                console.log('---> status:', evt.status);
                // console.log('---> filter:', req.params.get('filter'));
                if (evt.body != undefined) {
                    if (evt.body.code == "401" || evt.body.code == "412") {
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('temp_email');
                        localStorage.removeItem('fb_session');
                        this._router.navigate(['/account/login']);
                       
                        return;
                    }
                }
            }
        });
        subscription.subscribe().unsubscribe();
        return subscription;
    }
    constructor(private _router: Router) { }
}