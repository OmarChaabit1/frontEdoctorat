import { Component, OnInit } from '@angular/core';
import { Examiner } from 'src/app/models/Examiner';
import Result from 'src/app/models/Result';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { LaboSujet } from '../../services/labo-sujet.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})

export class ResultatsComponent implements OnInit {

  public candidatInfos: Result<Examiner> | undefined;
  public loading = false;
  public alert: AlertData | undefined = undefined;
  public page = 1;
  public itemsCount: number | undefined;
  public errorText = '';
  public isFetchingItems = true;
  constructor(public candidatLabo: LaboSujet) { }

  ngOnInit(): void {
    this.fetchResultats();
  }

  public fetchResultats() {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.candidatLabo.fetchResultats()
      .then(res => {
        this.candidatInfos = res;
        this.isFetchingItems = false;
        this.itemsCount = res.count;
        this.alert = {
          type: 'success',
          message: 'Bienvenue',
        };
      }).catch((error) => {
        this.alert = {
          type: 'error',
          message: 'error',
        };
      }).finally(() => {
        this.loading = false
        setTimeout(() => (this.alert = undefined), 3000);
      });

  }

  onIndexChange(offset: number) {
    if (this.isFetchingItems) return;
    this.isFetchingItems = true;
    this.candidatLabo
      .fetchResultats(offset)
      .then((d) => {
        this.candidatInfos.results = d.results;
      })
      .finally(() => (this.isFetchingItems = false));
  }



}
