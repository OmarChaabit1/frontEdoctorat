import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from 'src/app/models/Calendrier';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { environment } from 'src/environments/environment';


@Injectable()

export class HttpService {

  private _url = 'https://62421b72d126926d0c4e2cc8.mockapi.io';

  constructor(private http:HttpClient) { }

  getFormationsDoctorales(): Promise<Array<FormationDoctorale>> {
    return new Promise((resolve, reject) => {
      this.http
        .get<Array<FormationDoctorale>>(
          `${environment.API_URL}/api/formation-doctorale/` 
        )
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
   
  public getLaboratoires():Observable<Array<Laboratoire>>{

   return this.http.get<Array<Laboratoire>>(`${this._url}/laboratoire`);

  }

  public getCalendrierDoctorant():Observable<Calendrier>{

    return this.http.get<Calendrier>(`${this._url}/calendrierDoctorant`);

  }

  public getCalendrierProfesseur():Observable<Calendrier>{

    return this.http.get<Calendrier>(`${this._url}/calendrierProfesseur`);

  }

 

}
