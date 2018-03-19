import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { ILoginResponse } from 'core/interfaces/Account/ILoginResponse';
import { ILogin } from 'core/interfaces/Account/ILogin';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserResponse } from 'core/interfaces/Account/IUserResponse';
import { _login, currentUser } from '../../../app/_mock/global';


@Injectable()


export class ChangeEmailService {

  private _apiUrl = environment.apiUrlPrefix + 'account/changeEmail';

  loginResponse: ILoginResponse;
  response: IStandardResponse;
  model: any = {};

    constructor(private _http: HttpClient) {

    }

    changeEmail(verification_token): Observable<ILoginResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Authorization': bearer })};

        let url = this._apiUrl + '?P1=' + verification_token;
        // URLEncoder.encode(otherParameter + jsonString, 'UTF-8');
        return this._http.get<ILoginResponse>(url , options)
            .do(data => {
                // console.log('All: ' + JSON.stringify(data));
                this.response = data.response;
                this.loginResponse = data;
                if (data.response.code === 'AM0000') {
                     this.set_login(data.login);
                     console.log(JSON.stringify(this.get_login().first_name));
                  }else {
                  }
            })
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
