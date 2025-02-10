import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})

export class CandidatParcoursService {
  constructor(public http: HttpClient) {}

  getInfoDiplomes(): Promise<Result<Diplome>> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Result<Diplome>>(
          `${environment.API_URL}/api/candidat-parcours/` 
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

  getDiplomes(
    type: string | undefined = undefined
  ): Promise<Result<Diplome> | Diplome | undefined> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Result<Diplome>>(`${environment.API_URL}/api/candidat-parcours/`)
        .pipe(first()).subscribe({
          next: (data) => {
            if (type) {
              let res = undefined;
              data.results.every((entry) => {
                if (entry.type === type) {
                  res = entry;
                }
                return entry.type !== type;
              });
              resolve(res);
            } else {
              resolve(data);
            }
          },
          error: (err) => reject(err),
        });
    });
  }

  addDiplome(diplome: any): Promise<Result<Diplome>> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Result<Diplome>>(
          `${environment.API_URL}/api/candidat-parcours/`,
          diplome
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

  updateDiplome(diplome: any, diplomeId: number): Promise<Diplome> {
    return new Promise((resolve, reject) => {
      this.http
        .patch<Diplome>(
          `${environment.API_URL}/api/candidat-parcours/${diplomeId}/`,
          diplome
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

  deleteDiplome(diplomeId: number): Observable<Diplome> {
    return this.http.delete<Diplome>(
      `${environment.API_URL}/api/candidat-parcours/${diplomeId}/`
    );
  }
}
