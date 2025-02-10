import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/models/Candidat';
import { Examiner } from 'src/app/models/Examiner';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined;
  public candidats: Examiner[] = []
  constructor(private operationsService: OperationsService, private _router: Router) { }

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
      // this.commissions = data as Commission[];
      // console.log(this.commissions)
      this.alert = {
        type: 'success',
        message: 'success',
      };

    }).catch((error) => {
      // console.log(error)
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
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getCandidats(offset)
      .then((d) => {
        this.candidats = d.results;
      })
      .finally(() => (this.loading = false));
  }
  voirProfile(c:Examiner){
    console.log(c)
    this._router.navigate(['candidat/profil', { id: c.candidat.id}]);
  }
}
