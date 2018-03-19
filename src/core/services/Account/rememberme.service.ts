import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IRefreshTokenResponse } from '../../interfaces/Account/IRefreshTokenResponse';
import { environment } from '../../../environments/environment';
import { ILogin } from 'core/interfaces/Account/ILogin';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';


@Injectable()
export class RemembermeService {
    private _apiUrl = environment.apiUrlPrefix + 'account/rememberme';

    constructor(private _http: HttpClient

    ) { }

    rememberme(): Observable<ILoginResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('rememberme')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.get<ILoginResponse>(this._apiUrl, options)
            .do(data => {

                if (data.response.code === 'AM0000' || data.response.code === 'AM0007') {
                    this.set_login(data.login);
                }
            })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }

    public set_login(value: ILogin) {
        // currentUser['currentUser'] = value;
        localStorage.setItem('currentUser', JSON.stringify(value));
    }
}
