import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Commission } from 'src/app/models/Commission';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoleCommuniquerService {

  constructor(private http: HttpClient) { }

  public publierSujet() {

    let url = `${environment.API_URL}/api/publier-sujets/`;
    return new Promise((resolve, reject) => {
      this.http.patch(url, {}).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  public publierListeAttente() {

    let url = `${environment.API_URL}/api/publier-liste-attente/`;
    return new Promise((resolve, reject) => {
      this.http.post(url, {}).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  public publierListePrincipale() {

    let url = `${environment.API_URL}/api/publier-liste-principale/`;
    return new Promise((resolve, reject) => {
      this.http.post(url, {}).pipe(first()).subscribe({
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
