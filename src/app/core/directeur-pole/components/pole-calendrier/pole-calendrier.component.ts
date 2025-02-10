import { Component, OnInit } from '@angular/core';
import { Calendrier } from 'src/app/models/Calendrier';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { PoleCalendrierService } from '../../services/pole-calendrier.service';

@Component({
  selector: 'app-pole-calendrier',
  templateUrl: './pole-calendrier.component.html',
  styleUrls: ['./pole-calendrier.component.css']
})
export class PoleCalendrierComponent implements OnInit {

  alertData: AlertData | undefined = {
    message: "S'il vous plaît, attendez", type: "loading"
  };

  calendrierData: Calendrier[] | undefined

  constructor(private service: PoleCalendrierService) { }

  ngOnInit(): void {
    this.service.fetchCalendrier().then(data => {
      this.calendrierData = data
      this.alertData = undefined
    }).catch(() => {
      this.alertData = { message: "Erreur lors de la récupération des données", type: "error" }
    }).finally(() => setTimeout(() => this.alertData = undefined, 3000));
  }

  onConfirmerClicked(calendrierId: number) {
    const dateDebut = document.getElementById(`date-debut-${calendrierId}`) as HTMLInputElement
    const dateFin = document.getElementById(`date-fin-${calendrierId}`) as HTMLInputElement
    this.alertData = { message: "Traitement de la mise à jour du calendrier", type: "loading" }
    this.service.updateCalendrier(calendrierId, dateDebut.value, dateFin.value).then(() => this.alertData = {message: "Mis à jour avec succés",type: "success"}).catch(() => this.alertData = {message: 'Mis à jour avec succés', type: 'error'}).finally(() => setTimeout(() => {
      this.alertData = undefined
    }, 3000))
  }

}
