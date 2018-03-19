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


export class WelcomeTutorialService {

  private _apiUrl = environment.apiUrlPrefix + 'account/welcome';

  loginResponse: ILoginResponse;
  response: IStandardResponse;
  model: any = {};

  constructor(private _http: HttpClient) {

  }

  confirmWelcomeTutorial(grade): Observable<ILoginResponse> {

    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
    const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };
    const url = this._apiUrl + '/' + grade;
    return this._http.put<ILoginResponse>(url, null , options)
      .do(data => {
        this.response = data.response;
        this.loginResponse = data;
        if (data.response.code === 'AM0000') {
          this.set_login(data.login);
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
