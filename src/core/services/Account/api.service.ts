import { Injectable,Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
 constructor(private http: Http) { }

 // private url_api = 'http://172.16.10.109:8081/myklovr-webapi/rest/';
    private url_api = environment.apiUrlPrefix;
 // private url_api = 'http://172.16.11.19:8081/myklovr-webapi/rest/';

    Api_request(body, method, type , option) {
        var dir = this.url_api.concat(method);

        switch (type) {
            case "get": {
                    return this.http.get(dir, { search: body }).map((response: Response) => {
                    let data = response.json();
                    localStorage.setItem('api_response', JSON.stringify(data));
                });
            }
            case 'post': {
                return this.http.post(dir, body, option).map((response: Response) => {
                    let data = response.json();
                    localStorage.setItem('api_response', JSON.stringify(data));
                });
            }
        }
    }

}
