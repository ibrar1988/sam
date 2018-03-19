import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IUserGoalListResponse } from 'core/interfaces/ActionPlan/IUserGoalListResponse';
import { IUserGoalResponse } from 'core/interfaces/ActionPlan/IUserGoalResponse';
import { IStandardResponse } from 'core/interfaces/IStandardResponse';
import { IUserGoal } from 'core/interfaces/ActionPlan/IUserGoal';
import { IUserGoalMilestonePut } from 'core/interfaces/ActionPlan/IUserGoalMilestonePut';
import { IUserGoalCustom } from 'core/interfaces/ActionPlan/IUserGoalCustom';

@Injectable()
export class ActionPlanService {
    private _apiUrl = environment.apiUrlPrefix + 'actionPlan/userGoal';
    private _putApiUrl = environment.apiUrlPrefix + 'actionPlan/userGoal/milestone';
    private _createApiUrl = environment.apiUrlPrefix + 'actionPlan/userGoal';

    //  private _apiUrl = 'http://172.16.10.27:8080/myklovr-webapi/rest/' + 'actionPlan/userGoal';
    // private _putApiUrl = 'http://172.16.10.27:8080/myklovr-webapi/rest/' + 'actionPlan/userGoal/milestone';
    constructor(private _http: HttpClient) { }

    getAllUserGoal(): Observable<IUserGoalListResponse> {
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.get<IUserGoalListResponse>(this._apiUrl, options)
            .do(data => {
               
                if (data.response) {
                    // this.setToken(data.login.sessionToken);
                    if (data.response.code === 'AM0000') {
                        
                    } else {
                    }

                }

            }
            )
            .catch(this.handleError);
    }

    



    getUserGoal(gkey): Observable<IUserGoalResponse> {
        const url = this._apiUrl + '/' + gkey;
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.get<IUserGoalResponse>(url, options)
            .do(data => {
                if (data.response) {
                    // this.setToken(data.login.sessionToken);
                    if (data.response.code === 'AM0000') {
                        // OK
                    } else {
                    }
                }
            }
            )
            .catch(this.handleError);
    }

    // putGoal(name: string, description: string): Observable<IStandardResponse> {
    //     const body = { name: name, description: description };

    //     const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

    //     const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };


    //     return this._http.post<IStandardResponse>(this._apiUrl, body, options)
    //         .do(data => {

    //             // this.setToken(data.login.sessionToken);
    //             if (data.code === 'AM0000') {
    //                 // OK
    //             } else {
    //             }



    //         }
    //         )
    //         .catch(this.handleError);
    // }

     
   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
		 var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    // add a zero in front of numbers<10
    m = this.checkTime(m);
    s = this.checkTime(s);
    return new Date([year, month, day].join('-')+' '+h+':'+m+':'+s+'+0000');
}
 checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

   getProperDate(startDate)
   {
    let date1:Date = new Date(startDate);
    let  date2 = this.formatDate(date1);
    return date2;
   }

  putUserGoal(goal: IUserGoal): Observable<IStandardResponse> {


        goal.startdate = this.getProperDate(goal.startdate);
        goal.completed_date = this.getProperDate(goal.completed_date);
        goal.goal_confirmed_date = this.getProperDate(goal.goal_confirmed_date);
        goal.last_update_date = this.getProperDate(goal.last_update_date);

        //console.log(date1);

        const body = JSON.stringify(goal);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };


        return this._http.put<IStandardResponse>(this._apiUrl, body, options)
            .do(data => {

                // this.setToken(data.login.sessionToken);
                if (data.code === 'AM0000') {
                    // OK
                } else {
                }



            }
            )
            .catch(this.handleError);
    }

    deleteUserGoal(goalId: String): Observable<IStandardResponse> {
        //   const body = JSON.stringify(goal);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };
        return this._http.delete<IStandardResponse>(this._apiUrl + '/' + goalId, options)
            .do(data => {

                // this.setToken(data.login.sessionToken);
                if (data.code === 'AM0000') {
                    // OK
                } else {
                }



            }
            )
            .catch(this.handleError);
    }

    putUserMilestone(container: IUserGoalMilestonePut): Observable<IStandardResponse> {

        const body = JSON.stringify(container);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.put<IStandardResponse>(this._putApiUrl, body, options)
            .do(data => {


                if (data.code === 'AM0000') {
                    // OK
                } else {
                    return Observable.throw(data.message);
                }
            })
            .catch(this.handleError);
    }

    createNewGoal(goalCustom: IUserGoalCustom): Observable<IStandardResponse> {

        const body = JSON.stringify(goalCustom);

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).sessionToken;

        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': bearer }) };

        return this._http.post<IStandardResponse>(this._createApiUrl, body, options)
            .do(data => {


                if (data.code === 'AM0000') {
                    // OK
                } else {
                    return Observable.throw(data.message);
                }
            })
            .catch(this.handleError);
    }

    ///actionPlan/userGoal/milestone


    private handleError(err: HttpErrorResponse) {
        console.error(err.message);
        return Observable.throw(err.message);
    }
   
}
