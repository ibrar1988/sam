import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment';

@Injectable()
export class ZipCodeService {
    ///store/validateZipcode?region=CA&postalCode=90003&country=US
    private _apiUrl = environment.apiUrlPrefix + 'store/validateZipcode';
    model: any = {};
    response: IStandardResponse;
    constructor(private _http: HttpClient) { }

    validateZipCode(region, zipCode): Observable<IStandardResponse> {

        let url = this._apiUrl + '?region=' + region + '&postalCode=' + zipCode + '&country=' + 'US';

        return this._http.get<IStandardResponse>(url)
            .do(data => {

            }
            )
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
