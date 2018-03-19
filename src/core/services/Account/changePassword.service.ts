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
export class ChangePasswordService {
    private _apiUrl = environment.apiUrlPrefix + 'account/changePassword';
    model: any = {};

    constructor(private _http: HttpClient

    ) { }

    changePassword(password, newPassword): Observable<IUserResponse> {

        this.model.password = password;
         this.model.newPassword = newPassword;

        const body = JSON.stringify(this.model);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<IUserResponse>(this._apiUrl, body, options)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
