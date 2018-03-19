import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IUserResponse } from '../../interfaces/Account/IUserResponse';
import { environment } from '../../../environments/environment';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';

@Injectable()
export class ChangePasswordTokenService {
    private _refreshtokenUrl = environment.apiUrlPrefix + 'account/changePasswordToken';
    model: any = {};
    user_id: string;
    response: IUserResponse;

    constructor(private _http: HttpClient

    ) { }

    changePasswordToken(verification_token, password): Observable<IUserResponse> {
        this.model.verification_token = verification_token;
        this.model.password = password;

        const body = JSON.stringify(this.model);

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this._http.post<IUserResponse>(this._refreshtokenUrl, body, options)
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
