import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IUserResponse } from '../../interfaces/Account/IUserResponse';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment.prod';
import { currentUser } from 'app/_mock/global';
import { Router } from '@angular/router';

@Injectable()
export class LogoutService {
  private _apiUrl = environment.apiUrlPrefix + 'account/logout';
  model: any = {};
  user_id: string;
  response: IStandardResponse;
  constructor(private _http: HttpClient, private router: Router
  ) { }



  logout(): Observable<IUserResponse> {

    const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

    const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };
    this.deleteSession();

    return this._http.get<IUserResponse>(this._apiUrl, options)
      .do(data => {
        this.user_id = data.user_id;
        this.response = data.response;
      }

      )
      .catch(this.handleError);

  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }

  deleteSession() {

    // localStorage.setItem('sessionToken', null);
    // currentUser['currentUser'] = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('temp_email');
    localStorage.removeItem('fb_session');

    window.location.href = environment.siteUrlPrefix;
    // this.router.navigate(['/']);

  }


}
