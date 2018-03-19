import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IUserRecommendedGoalListResponse } from 'core/interfaces/ActionPlan/Recommended-goal/IUserRecommendedGoalListResponse';
import { IUserRecommendedGoalResponse } from 'core/interfaces/ActionPlan/Recommended-goal/IUserRecommendedGoalResponse';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserRecommendedGoal } from 'core/interfaces/ActionPlan/Recommended-Goal/IUserRecommendedGoal';

@Injectable()
export class RecommendedGoalService {
    private _apiUrl = environment.apiUrlPrefix + 'recommender/goals';
    private _putApiUrl = environment.apiUrlPrefix + 'recommender/goals';
    constructor(private _http: HttpClient) { }

    getAllUserRecommendedGoal(): Observable<IUserRecommendedGoalListResponse> {
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.get<IUserRecommendedGoalListResponse>(this._apiUrl, options)
            .do(data => {

                // this.setToken(data.login.sessionToken);
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

    getUserRecommendedGoal(gkey): Observable<IUserRecommendedGoalResponse> {
        const url = this._apiUrl + '/' + gkey;
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.get<IUserRecommendedGoalResponse>(url, options)
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

    putUserRecommendedGoal(container: IUserRecommendedGoal): Observable<IStandardResponse> {

        const body = JSON.stringify(container);
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

    cloneGoalRecommended(goalcloned: any): Observable<IStandardResponse> {
        const body = JSON.stringify(goalcloned);
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };
        const apiUrl = environment.apiUrlPrefix + "recommender/clone";

        return this._http.post<IStandardResponse>(apiUrl, body, options)
        .do(data => {
            if (data.code === 'AM0000') {
                // OK
            } else {
                return Observable.throw(data.message);
            }
        })
        .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
}
