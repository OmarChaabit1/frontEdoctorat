import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Inscription } from 'src/app/models/Inscription';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class PoleInscriptionService {

  constructor(private http: HttpClient) { }

  fetchPoleInscriptions ( offset: number | undefined = undefined):Promise<Result<Inscription>>{
    let url = `${environment.API_URL}/api/get-all-inscriptions/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
  return new Promise((resolve, reject) => {
        this.http
          .get<Result<Inscription>>(url)
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
