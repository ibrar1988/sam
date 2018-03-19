import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { ICityResponse } from '../../interfaces/Account/ICityResponse';
import { ICity } from '../../interfaces/Account/ICity';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment';


@Injectable()
export class CitiesService {
  private _apiUrl = environment.apiUrlPrefix + 'account/cities';
  model: any = {};
  cities: Array<ICity>;
  response: IStandardResponse;
  constructor(private _http: HttpClient) { }

  getCities(state_code): Observable<ICityResponse> {

    let url = this._apiUrl + '?state=' + state_code;

    return this._http.get<ICityResponse>(url)
      .do(data => {
        if (data) {
          this.cities = data.cities;
          this.response = data.response;
        }
      },
      err => console.log(err),
    )
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }
}
