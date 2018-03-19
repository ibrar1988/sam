import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { ICountryResponse } from '../../interfaces/Account/ICountryResponse';
import { ICountry } from '../../interfaces/Account/ICountry';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment';


@Injectable()
export class CountriesService {
    private _apiUrl = environment.apiUrlPrefix + 'account/countries';
    model: any = {};
    countries: Array<ICountry>;
    response: IStandardResponse;
    constructor(private _http: HttpClient) { }

    getCountries(): Observable<ICountryResponse> {


        return this._http.get<ICountryResponse>(this._apiUrl)
            .do(data => {
                // console.log('All: ' + JSON.stringify(data));
                if (data) {
                    this.countries = data.countries;
                    this.response = data.response;
                }

            }
            )
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
