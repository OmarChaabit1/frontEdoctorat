import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { PoleCandidatsService } from '../../services/pole-candidats.service';

@Component({
  selector: 'app-pole-candidat',
  templateUrl: './pole-candidat.component.html',
  styleUrls: ['./pole-candidat.component.css']
})
export class PoleCandidatComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined;
  public candidats: Postuler[] = [];
  public sujet_ = '';
  public formationDoctorale_ = '';
  public isFetchingItems = true;
  public errorText = '';
  public laboratoire_ = '';
  constructor(public poleCandidatsService: PoleCandidatsService) { }

  ngOnInit(): void {
    this.getPoleSubjects();
  }
  public getPoleSubjects() {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.poleCandidatsService.fetchPoleCandidats()
      .then(x => {
        this.isFetchingItems = false;
        this.candidats = x.results;
        this.itemsCount = x.count;
        this.alert = {
          type: 'success',
          message: 'Bienvenue',
        };
      }
      )
      .catch(error => {
        this.alert = {
          type: 'error',
          message: 'error',
        };
      }).finally(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }


  onIndexChange(offset: number) {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.poleCandidatsService
      .fetchPoleCandidats(offset)
      .then((d) => {
        this.candidats = d.results;
        this.alert = {
          type: 'success',
          message: 'success',
        };
      }).catch(error => {
        this.alert = {
          type: 'error',
          message: 'error',
        };
      }).finally(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }


}
