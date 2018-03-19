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

@Injectable()
export class CompleteOrderStripeService {
    private _apiUrl = environment.apiUrlPrefix + 'store/completeOrderStripe';

    model: ICompleteOrderStripeRequest;
    response: ILoginResponse;

    constructor(private _http: HttpClient

    ) { }

    getCompleteOrderStripe(order_stripe: ICompleteOrderStripeRequest): Observable<ILoginResponse> {
        // this.model.billing = order_stripe.billing;
        // this.model.order_id = order_stripe.order_id;
        // this.model.cart = order_stripe.cart;
        // this.model.stripeToken = order_stripe.stripeToken;

        const body = JSON.stringify(order_stripe);
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<ILoginResponse>(this._apiUrl, body, options)
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
