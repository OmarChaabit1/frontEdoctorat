import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CandidastProfService {

  constructor(private http: HttpClient) {}

  public getCandidats() {
    return new Promise<Result<Postuler>>((resolve, reject) => {
      this.http
        .get <Result<Postuler>>(environment.API_URL +  '/api/get-professeur-candidats/')
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
