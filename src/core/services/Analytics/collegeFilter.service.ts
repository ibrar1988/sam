import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { IComplexFilter } from 'core/interfaces/Analytics/IComplexFilter';
import { ICollegesResponse } from 'core/interfaces/Analytics/ICollegesResponse';
import { ICollegeComparisonRequest } from 'core/interfaces/Analytics/ICollegeComparisonRequest';
import { ICollegeComparisonResponse } from 'core/interfaces/Analytics/ICollegeComparisonResponse';

@Injectable()
export class CollegeFilterService {
    private _apiUrl = environment.apiUrlPrefix + 'collegeAnalytic';
    _request: IComplexFilter;

    constructor(private _http: HttpClient) { }

    collegeFilter(request: IComplexFilter): Observable<ICollegesResponse> {
        this._request = request;
        const body = JSON.stringify(this._request);
        let url = this._apiUrl + "/collegeFilter";
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<ICollegesResponse>(url, body, options)
            .do(data => {

                if (data.response) {
                    if (data.response.code === 'AM0000') {
                        // OK
                    } else {
                    }
                }
            }
            )
            .catch(this.handleError);
    }

    collegeComparison(request: ICollegeComparisonRequest): Observable<ICollegeComparisonResponse> {
        const body = JSON.stringify(request);
        let url = this._apiUrl + "/collegeComparison";
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<ICollegesResponse>(url, body, options)
            .do(data => {

                if (data.response) {
                    if (data.response.code === 'AM0000') {
                        // OK
                    } else {
                    }
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
