import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { IBilling } from '../../interfaces/Store/IBilling';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { INewOrderResponse } from 'core/interfaces/Store/INewOrderResponse';
import { billingInformation } from 'app/_mock/global';

@Injectable()
export class NewOrderService {
    private _apiUrl = environment.apiUrlPrefix + 'store/newOrder';
    model: any = {};
    response: IStandardResponse;
    order_id: String;
    billing: IBilling;
    constructor(private _http: HttpClient

    ) { }

    newOrder(): Observable<INewOrderResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({'Authorization': bearer }) };

        return this._http.get<INewOrderResponse>(this._apiUrl, options)
            .do(data => {
            
                this.response = data.response;
                this.order_id = data.order_id;
                this.billing = data.billing;

                billingInformation['order_id'] = data.order_id;
                billingInformation['billing'] = data.billing;

                if (data.response) {
                if (data.response.code === 'AM0000') {
                    // OK
                } else {
                    return Observable.throw(data.response.message);
                }
            }
            }
            )
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
