import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Calendrier } from 'src/app/models/Calendrier';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoleCalendrierService {

  constructor(private client: HttpClient) { }

  fetchCalendrier(): Promise<Calendrier[]> {
    return new Promise<Calendrier[]>((resolve, reject) => {
      this.client.get<Calendrier[]>(`${environment.API_URL}/api/get-calendrier/`)
      .pipe(first())
        .subscribe({
          next: (d) => resolve(d),
          error: (_) => reject(),
        })
    });
  }

  updateCalendrier(calendrierId: number, dateDebut: string, dateFin: string): Promise<Calendrier> {
    return new Promise<Calendrier>((resolve, reject) => {
      this.client.patch<Calendrier>(`${environment.API_URL}/api/update-canlendrier/${calendrierId}/`, { dateDebut, dateFin }).pipe(first()).subscribe({
        next: (d) => resolve(d),
        error: (_) => reject()
      })
    });
  }
}
