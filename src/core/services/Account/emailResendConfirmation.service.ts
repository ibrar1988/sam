import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';

import { IUserResponse } from '../../interfaces/Account/IUserResponse';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmailResendConfirmationService {
    private _apiUrl = environment.apiUrlPrefix + 'account/emailResendConfirmation';
    model: any = {};
    user_id: string;
    response: IUserResponse;

    constructor(private _http: HttpClient

    ) { }

    emailResendConfirmation(email): Observable<IUserResponse> {

        this.model.email = email;

        const body = JSON.stringify(this.model);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<IUserResponse>(this._apiUrl, body, options)
            .do(data => {
                console.log('All: ' + JSON.stringify(data));
                this.user_id = data.user_id;
                this.response = data;
            })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
