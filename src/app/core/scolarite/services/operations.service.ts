import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  fetchScolariteCandidats(offset: number | undefined = undefined): Promise<Result<Postuler>> {
    let url = `${environment.API_URL}/api/scolarite/`;
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

  updateValider(valider:object, id:number){
    return new Promise((resolve, reject) => {
      this.http
        .patch(
          `${environment.API_URL}/api/scolarite/${id}/`,
          valider
        )
        .pipe(first()).subscribe({
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
