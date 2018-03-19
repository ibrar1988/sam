import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { IStandardResponse } from '../../interfaces/IStandardResponse';
import { environment } from '../../../environments/environment';
import { IAbout } from 'core/interfaces/About/IAbout';

@Injectable()
export class AboutService {
    private _apiUrl = environment.apiUrlPrefix + 'contactus/message';
    model: any = {};
    response: IStandardResponse;
    constructor(private _http: HttpClient) { }

    sendAboutMessage(form: IAbout): Observable<IStandardResponse> {

        const body = JSON.stringify(form);

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        return this._http.post<IStandardResponse>(this._apiUrl, body, options)
            .do(data => {

                if (data.code === 'AM0000') {

                    

                } else {


                }
            })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
