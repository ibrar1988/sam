import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';

import { ILoginResponse } from '../../interfaces/Account/ILoginResponse';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { ILogin } from '../../interfaces/Account/ILogin';
import { environment } from '../../../environments/environment';


@Injectable()
export class ChangeConfirmationStatusService {
    private _apiUrl = environment.apiUrlPrefix + 'account/changeConfirmationStatus';
    model: any = {};

    response: IStandardResponse;
    login: ILogin;

    constructor(private _http: HttpClient

    ) { }

    changeConfirmationStatus(token): Observable<ILoginResponse> {

        this._apiUrl = this._apiUrl + '?P1=' + token;
        return this._http.get<ILoginResponse>(this._apiUrl)
            .do(data => {
                console.log('All: ' + JSON.stringify(data));
                this.response = data.response;
                this.login = data.login;
            } )
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
