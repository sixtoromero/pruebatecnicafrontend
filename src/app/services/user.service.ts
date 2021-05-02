import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
import { CorrespondeceModel } from '../models/correspondence.model';
import { UserModel } from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class UserService {
    
    endPoint = `${environment.apiURL}/Auth`;

    constructor(private _http: HttpClient) { }        

    getUserAll(): Observable<Observable<ResponseModel<UserModel[]>>> {
        return this._http.get<Observable<ResponseModel<UserModel[]>>>(`${this.endPoint}/GetAllAsync`);
    }

}