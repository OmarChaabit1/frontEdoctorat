import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class CountriesService {


 private _url = 'https://countriesnow.space/api/v0.1/countries'; // this url need a review


 constructor(private http:HttpClient){}
 
    public getCountries():Observable<any>{

    return this.http.get<any>(this._url);

    }

}