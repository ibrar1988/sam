import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IUserResponse } from '../../interfaces/Account/IUserResponse';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmailChangeEmailService {
    private _apiUrl = environment.apiUrlPrefix + 'account/emailChangeEmail';
    model: any = {};
    user_id: string;
    response: IUserResponse;
    constructor(private _http: HttpClient

    ) { }

    emailChangeEmail(username): Observable<IUserResponse> {
        this.model.username = username;
        const body = JSON.stringify(this.model);
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': bearer}) };

        return this._http.post<IUserResponse>(this._apiUrl, body, options)
            .do(data => {
                console.log('All: ' + JSON.stringify(data));
                this.user_id = data.user_id;
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
