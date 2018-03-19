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
import { IBillingInfoResponse } from 'core/interfaces/Account/IBillingInfoResponse';
import { IBilling } from 'core/interfaces/Account/IBilling';


@Injectable()


export class BillingInfoService {

  private _apiUrl = environment.apiUrlPrefix + 'account/billingInfo';

  billingInfoResponse: IBillingInfoResponse;
  billingInfo: IBilling;
  response: IStandardResponse;
  model: any = {};

    constructor(private _http: HttpClient) {

    }



    getBillingInfo(): Observable<IBillingInfoResponse> {
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<IBillingInfoResponse>(this._apiUrl, options)
            .do(data => {
             
                this.response = data.response;
                this.billingInfo = data.billing;
            })
            .catch(this.handleError);
    }

    putBillingInfo(first_name, last_name, address, phone_number, country, state, city, zipcode, company): Observable<IStandardResponse> {
        this.model.first_name = first_name;
        this.model.last_name = last_name;
        this.model.address = address;
        // this.model.phone_number = phone_number;
        this.model.country = country;
        this.model.state = state;
        this.model.city = city;
        this.model.zipcode = zipcode;
        this.model.company = company;

        const body = JSON.stringify(this.model);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.put<IStandardResponse>(this._apiUrl, body, options)
              .do(data => {
               
                  this.response = data;
              } )
              .catch(this.handleError);
      }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
