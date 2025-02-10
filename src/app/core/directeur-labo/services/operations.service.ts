import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Commission } from 'src/app/models/Commission';
import { Examiner } from 'src/app/models/Examiner';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class OperationsService {

  constructor(private http: HttpClient) { }

  public getSujetsLabo(offset: number | undefined = undefined) {
    let url = `${environment.API_URL}/api/sujetslabo/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise<Result<Sujet>>((resolve, reject) => {
      this.http.get<Result<Sujet>>(url).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public addCommission(comm: object) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + '/api/commission/', comm).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public updateSujet(comm: object, id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .put(environment.API_URL + '/api/commission/' + id + '/', comm)
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

  public getCommissions(offset: number | undefined = undefined){
   
    let url = `${environment.API_URL}/api/commission/`;
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
  public getProfesseurs(offset: number | undefined = undefined) {
    let url = `${environment.API_URL}/api/labo_professeur/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise<Result<Professeur>>((resolve, reject) => {
      this.http.get<Result<Professeur>>(url).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  
  public deleteCommission(c: Commission) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(environment.API_URL + '/api/commission/' + c.id + '/')
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

  public getCandidats(offset: number | undefined = undefined) {
    let url = `${environment.API_URL}/api/labo_candidat/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise<Result<Examiner>>((resolve, reject) => {
      this.http.get<Result<Examiner>>(url).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  
  public getCandidatsSujet(id:number) {
    let url = `${environment.API_URL}/api/get-sujet-candidat/${id}/`;
    return new Promise((resolve, reject) => {
      this.http.get(url).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public validerCandidat(id:number, item:any) {
    let url = `${environment.API_URL}/api/labo_valider_examiner/${id}/`;
    return new Promise((resolve, reject) => {
      this.http.put(url, item).pipe(first()).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public envoyerNotification(id: number) {
    let url = `${environment.API_URL}/api/convoque-candidat/${id}/`;
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
