import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoleCandidatsService {

  constructor(private http: HttpClient) { }
  fetchPoleCandidats(offset: number | undefined = undefined): Promise<Result<Postuler>> {
    let url = `${environment.API_URL}/api/get-all-candidats/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise((resolve, reject) => {
      this.http
        .get<Result<Postuler>>(url)
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
