import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IMentorsListResponse } from 'core/interfaces/Mentors/IMentorsListResponse';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Headers, RequestOptions } from '@angular/http';
import { environment } from 'environments/environment';


@Injectable()
export class MentorsService {
    private _apiUrl = environment.apiUrlPrefix + 'relationship/mentors';

    constructor(private _http: HttpClient) { }

    getMentors(): Observable<IMentorsListResponse> {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Authorization': bearer }) };

        return this._http.get<IMentorsListResponse>(this._apiUrl, options)
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
