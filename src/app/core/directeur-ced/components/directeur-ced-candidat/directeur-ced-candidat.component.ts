import { Component, OnInit } from '@angular/core';
import { Examiner } from 'src/app/models/Examiner';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationCedService } from '../../services/operation-ced.service';

@Component({
  selector: '[app-directeur-ced-candidat]',
  templateUrl: './directeur-ced-candidat.component.html',
  styleUrls: ['./directeur-ced-candidat.component.css']
})
export class DirecteurCedCandidatComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined;
  public candidats: Examiner[] = []
  constructor(private operationsService: OperationCedService) { }

  ngOnInit(): void {
    this.getCandidats()
  }

  getCandidats() {
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService.getCandidats().then(data => {
      this.loading = false
      console.log(data.results)
      this.itemsCount = data.count;
      this.candidats = data.results

    }).catch((error) => {
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      this.alert = {
        type: 'success',
        message: 'success',
      };
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }
  onIndexChange(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getCandidats(offset)
      .then((d) => {
        this.candidats = d.results;
      })
      .finally(() => (this.loading = false));
  }
}
