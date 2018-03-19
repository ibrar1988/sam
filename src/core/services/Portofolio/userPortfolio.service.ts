import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';

import { environment } from '../../../environments/environment';
import { IUserPortfolioContainerResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerResponse';
import { IUserPortfolioContainer } from 'core/interfaces/Portfolio/IUserPortfolioContainer';
// tslint:disable-next-line:max-line-length
import { UserPortfolioContainerPutRequest } from 'core/interfaces/Portfolio/IUserPortfolioContainerPutRequest';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserPortfolioContainerListResponse } from 'core/interfaces/Portfolio/IUserPortfolioContainerListResponse';

@Injectable()
export class UserPortfolioService {
    private _apiUrl = environment.apiUrlPrefix + 'portfolio/userPortfolio';
    private _putApiUrl = environment.apiUrlPrefix + 'portfolio/userPortfolio';

    model: any = {};


    constructor(private _http: HttpClient

    ) { }

    getPortfolio(kind): Observable<IUserPortfolioContainerListResponse> {

        this._apiUrl = this._apiUrl + '?kind=' + kind;
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<IUserPortfolioContainerListResponse>(this._apiUrl, options)
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

    getPortfolioContainer(container_id): Observable<IUserPortfolioContainerResponse> {

        var url = this._apiUrl + '/' + container_id;
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<IUserPortfolioContainerResponse>(url, options)
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

    putPortfolioContainer(container: UserPortfolioContainerPutRequest): Observable<IStandardResponse> {
        // this.model.container_id = container_id;
        // this.model.container_code = container_code;
        // this.model.json = json;

        const body = JSON.stringify(container);
        console.log(body);
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.put<IStandardResponse>(this._putApiUrl, body, options)
            .do(data => {
                if (data) {
                    if (data.code === 'AM0000') {
                        // OK
                    } else {
                        return Observable.throw(data.message);

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
