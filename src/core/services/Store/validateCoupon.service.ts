import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { ICompleteOrderStripeRequest } from '../../interfaces/Store/ICompleteOrderStripeRequest';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { ICouponResponse } from 'core/interfaces/Store/ICouponResponse';

@Injectable()
export class ValidateCouponService {
    private _apiUrl = environment.apiUrlPrefix + 'store/validateCoupon';
    response: ICouponResponse;

    constructor(private _http: HttpClient

    ) { }

    getVerifyCoupon(coupon: String): Observable<ICouponResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.get<ICouponResponse>(this._apiUrl + '/' + coupon, options)
            .do(data => {

                this.response = data;
            }
            )
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
