import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';

import { environment } from '../../../environments/environment';
import { IUserPortfolioContainerListResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerListResponse';

@Injectable()
export class GenerateUserPortfolioService {
    private _apiUrl = environment.apiUrlPrefix + 'portfolio/generateUserPortfolio';
    model: any = {};


    constructor(private _http: HttpClient

    ) { }

    generateUserPortfolio(kind, password): Observable<IUserPortfolioContainerListResponse> {
        this.model.kind = kind;
        this.model.password = password;

        const body = JSON.stringify(this.model);
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<IUserPortfolioContainerListResponse>(this._apiUrl, body, options)
            .do(data => {
                if (data.response) {
                if (data.response.code === 'AM0000') {
                    // OK
                } else {
                    return Observable.throw(data.response.message);
               
                }
            }
            })
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
