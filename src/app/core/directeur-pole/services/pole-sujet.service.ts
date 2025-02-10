import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Examiner } from 'src/app/models/Examiner';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PoleSujetService {

  constructor(private http: HttpClient) { }

  fetchPoleSujets ( offset: number | undefined = undefined):Promise<Result<Sujet>>{
    let url = `${environment.API_URL}/api/get-all-sujets/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
  return new Promise((resolve, reject) => {
        this.http
          .get<Result<Sujet>>(url)
          .pipe(first())
          .subscribe({
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
