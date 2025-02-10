import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, of } from 'rxjs';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CandidatPostulerService {
  constructor(public http: HttpClient) {}

  getPublishedSubjects(
    offset: number | undefined = undefined
  ): Promise<Result<Sujet>> {
    let url = `${environment.API_URL}/api/get-published-subjects/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise((resolve, reject) => {
      this.http.get<Result<Sujet>>(url).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }

  getSelectedSubjects() {
    return this.http.get<Result<Postuler>>(
      `${environment.API_URL}/api/candidat-postules/`
    );
  }

  postuler(sujet: number) {
    return new Promise<Boolean | Postuler>((resolve, _) => {
      this.http
        .post<Postuler>(`${environment.API_URL}/api/candidat-postules/`, {
          sujet,
        })
        .pipe(first()).subscribe({
          next: (d) =>
            resolve({
              ...d,
              sujet: { id: d['sujet'] as unknown as number } as Sujet,
            }),
          error: (e) => resolve(false),
        });
    });
  }

  deletePostule(id: number) {
    return new Promise<Boolean>((resolve, _) => {
      this.http
        .delete(`${environment.API_URL}/api/candidat-postules/${id}`)
        .pipe(first()).subscribe({
          next: (d) => resolve(true),
          error: (e) => resolve(false),
        });
    });
  }

  updatePostuler( PThese: any, sujet: number): Promise<Postuler> {
    return new Promise((resolve, reject) => {
      this.http
        .patch<Postuler>(
          `${environment.API_URL}/api/candidat-postules/${sujet}/`,
          PThese
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
