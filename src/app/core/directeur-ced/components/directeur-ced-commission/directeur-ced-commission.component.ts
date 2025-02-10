import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/models/Commission';
import { Participe } from 'src/app/models/Participe';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationCedService } from '../../services/operation-ced.service';

@Component({
  selector: '[app-directeur-ced-commission]',
  templateUrl: './directeur-ced-commission.component.html',
  styleUrls: ['./directeur-ced-commission.component.css']
})
export class DirecteurCedCommissionComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined;
  public commissions: Commission[] =[];
  public isFetchingItems = true;
  public commission: Commission = {
    id: 0,
    dateCommission: '',
    heure: '',
    valider: false,
    lieu: '',
    labo: 0,
    participants: [],
    sujets: []
  }
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
  public currentProfesseur: Professeur = {
    id: 0,
    nom: '',
    prenom: ''
  }
  constructor(private operationsService: OperationCedService) { }

  ngOnInit(): void {
    this.getCommissions()
  }

  getCommissions() {
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService.getCommissions().then(data => {
      this.loading = false
      // console.log(data)

      this.commissions = data.results
      console.log(data.results)
      
      // console.log(this.commissions)

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

  
}
