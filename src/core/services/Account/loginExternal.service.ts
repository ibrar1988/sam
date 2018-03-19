import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { ILoginResponse } from '../../interfaces/Account/ILoginResponse';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginExternalService {
  private _apiUrl = environment.apiUrlPrefix + 'account/loginExternal';
  model: any = {};

  constructor(private _http: HttpClient) { }

  getLoginExternal(token): Observable<ILoginResponse> {

    this.model.token = token;

    const body = JSON.stringify(this.model);

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this._http.post<ILoginResponse>(this._apiUrl, body, options)
      .do(data => {
        console.log('All: ' + JSON.stringify(data));
        localStorage.setItem('fb_session', JSON.stringify(data.login));
      },
      err => console.log(err)
      )
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }


}
