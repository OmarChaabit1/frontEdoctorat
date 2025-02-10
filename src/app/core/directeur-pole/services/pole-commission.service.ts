import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Commission } from 'src/app/models/Commission';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoleCommissionService {

  constructor(private http: HttpClient) {}

  public getCommissions(offset: number | undefined = undefined){
   
    let url = `${environment.API_URL}/api/get-all-commissions/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise<Result<Commission>>((resolve, reject) => {
      this.http.get<Result<Commission>>(url).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

 
}