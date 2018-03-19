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
import { _login, currentUser } from '../../../app/_mock/global';


@Injectable()


export class AccountService {

  private _apiUrl = environment.apiUrlPrefix + 'account';


  loginResponse: ILoginResponse;
  response: IStandardResponse;
  model: any = {};

  constructor(private _http: HttpClient) {

  }

  /* #g gender, removed gender*/
  postAccount(username, password, birthday, kind, firstname, lastname,  url_image,facebookid): Observable<ILoginResponse> {
    this.model.username = username;
    this.model.password = password;
    this.model.birthday = birthday;
    this.model.kind = kind.toUpperCase();
    this.model.first_name = firstname;
    this.model.last_name = lastname;
    /* #g this.model.gender = gender; */
    this.model.url_image = url_image;
    this.model.facebookid = facebookid;

    const body = JSON.stringify(this.model);

    // const body = JSON.stringify(this.model);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this._http.post<ILoginResponse>(this._apiUrl, body, options)
      .do(data => {

        this.response = data.response;
        this.loginResponse = data;

      })
      .catch(this.handleError);
  }

  putAccount(birthday, firstname, lastname, gender, url_image): Observable<ILoginResponse> {
    this.model.birthday = birthday;
    this.model.first_name = firstname;
    this.model.last_name = lastname;
    this.model.gender = gender;
    this.model.url_image = url_image;

    const body = JSON.stringify(this.model);
    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

    return this._http.put<ILoginResponse>(this._apiUrl, body, options)
      .do(data => {

        this.response = data.response;
        this.loginResponse = data;
        // this.setToken(data.login.sessionToken);
        if (data.response.code === 'AM0000') {
          this.set_login(data.login);
        } else {


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
 
    localStorage.setItem('currentUser', JSON.stringify(value));
  }
}
