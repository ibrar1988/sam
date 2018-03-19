import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { IOrder } from '../../interfaces/Store/IOrder';
import { IOrdersListResponse } from 'core/interfaces/Store/IOrdersListResponse';
import { ICompleteOrderResponse } from 'core/interfaces/Store/ICompleteOrderResponse';

@Injectable()
export class OrdersService {
    private _apiUrl = environment.apiUrlPrefix + 'store/orders';
    model: any = {};
    response: IStandardResponse;
    orders: Array<IOrder>;

    constructor(private _http: HttpClient

    ) { }

    getOrders(): Observable<IOrdersListResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<IOrdersListResponse>(this._apiUrl, options)
            .do(data => {
                console.log('All: ' + JSON.stringify(data));
                if (data.response.code === 'AM0000') {
                    // OK
                } else {
                    return Observable.throw(data.response.message);
                }
            })
            .catch(this.handleError);
    }

    getPortfolioContainer(order_id): Observable<ICompleteOrderResponse> {

        this._apiUrl = this._apiUrl + '/' + order_id;
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<ICompleteOrderResponse>(this._apiUrl, options)
            .do(data => {
                if (data.response) {
                if (data.response.response.code === 'AM0000') {
                    // OK
                } else {
                    return Observable.throw(data.response.response.message);
                }
            }
            })
            .catch(this.handleError);
    }


    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
