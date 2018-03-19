import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IStateResponse } from '../../interfaces/Account/IStateResponse';
import { IState } from '../../interfaces/Account/IState';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment';

@Injectable()
export class StatesService {
    private _apiUrl = environment.apiUrlPrefix + 'account/states';
    model: any = {};
    states: Array<IState>;
    response: IStandardResponse;
    constructor(private _http: HttpClient) { }

    getStates(country_code): Observable<IStateResponse> {

        let url = this._apiUrl + '?country=' + country_code;

        return this._http.get<IStateResponse>(url)
            .do(data => {
                if (data) {
                    this.states = data.states;
                    this.response = data.response;
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
