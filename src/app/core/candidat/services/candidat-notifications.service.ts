import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Notification } from 'src/app/models/Notification';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CandidatNotificationsService {

  constructor(public http: HttpClient) {}

  getNotifications(): Promise<Result<Notification>> {
    let url = `${environment.API_URL}/api/get-candidat-notifications/`;
    return new Promise((resolve, reject) => {
      this.http.get<Result<Notification>>(url)
      .pipe(first())
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }

  sendSubjectChosen(x:Sujet): Promise<Sujet>{
    
    let url = `${environment.API_URL}/api/add-inscription/${x['sujet'].id}/`;
    return new Promise((resolve, reject) => {
      this.http.post<Sujet>(url,x)
      .pipe(first())
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }



}
