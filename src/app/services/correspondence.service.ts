import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseModel } from '../models/response.model';
import { CorrespondeceModel } from '../models/correspondence.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root',
})
export class CorrespondenceService {
    
    endPoint = `${environment.apiURL}/Correspondences`;    

    constructor(private _http: HttpClient) { }    

    getCorrespondenceByUserId(userId: number): Observable<Observable<ResponseModel<CorrespondeceModel[]>>> {        
        return this._http.get<Observable<ResponseModel<CorrespondeceModel[]>>>(`${this.endPoint}/GetAsyncByUserId/${userId}` );
    }

    getCorrespondenceAll(): Observable<Observable<ResponseModel<CorrespondeceModel[]>>> {        
        return this._http.get<Observable<ResponseModel<CorrespondeceModel[]>>>(`${this.endPoint}/GetAllAsync` );
    }

    insert(model: CorrespondeceModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.post<Observable<ResponseModel<string>>>(`${this.endPoint}/InsertAsync`, model, httpOptions);
    }

    update(model: CorrespondeceModel): Observable<Observable<ResponseModel<string>>> {
        return this._http.put<Observable<ResponseModel<string>>>(`${this.endPoint}/UpdateAsync`, model, httpOptions);
    }
    
    delete(Id: number): Observable<Observable<ResponseModel<string>>> {
        return this._http.delete<Observable<ResponseModel<string>>>(`${this.endPoint}/DeleteAsync/${Id}`);
    }

}