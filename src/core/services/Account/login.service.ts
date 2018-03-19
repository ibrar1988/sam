import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { ILoginResponse } from '../../interfaces/Account/ILoginResponse';
import { _login, currentUser } from '../../../app/_mock/global';
import { ILogin, Login } from '../../../core/interfaces/Account/ILogin';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginService {
    private _loginUrl = environment.apiUrlPrefix + 'account/login';
    model: any = {};

    constructor(private _http: HttpClient) { }

    login(username, password): Observable<ILoginResponse> {

        this.model.username = username;
        this.model.password = password;

        const body = JSON.stringify(this.model);

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this._http.post<ILoginResponse>(this._loginUrl, body, options)
            .do(data => {
                // this.setToken(data.login.sessionToken);
                if (data.response.code === 'AM0000' || data.response.code === 'AM0007') {
                 // localStorage.setItem('apiResponse', JSON.stringify(data.login));
                  // localStorage.setItem('currentUser', JSON.stringify(data.login));
                   this.set_login(data.login);
                }else {
                }
            }
            )
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }



    public get_login() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    public set_login(value: ILogin) {
       // currentUser['currentUser'] = value;
        localStorage.setItem('currentUser', JSON.stringify(value));
    }



}
