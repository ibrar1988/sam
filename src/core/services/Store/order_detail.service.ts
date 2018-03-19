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
import { IOrderDetail } from 'core/interfaces/Store/IOrderDetail';
import { IOrderDetailResponse } from 'core/interfaces/Store/IOrderDetailResponse';

@Injectable()
export class OrdersDetailService {
    ///store/orders/detail/adc2403f-7521-44fa-b712-5b696e440e25
    private _apiUrl = environment.apiUrlPrefix + 'store/orders/detail/';
    model: any = {};
    response: IStandardResponse;
    orders: Array<IOrder>;

    constructor(private _http: HttpClient

    ) { }

    getDetail(id): Observable<IOrderDetailResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<IOrderDetailResponse>(this._apiUrl + id, options)
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



    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
