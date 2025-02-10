import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/models/Commission';
import { Participe } from 'src/app/models/Participe';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-commission]',
  templateUrl: './prof-commission.component.html',
  styleUrls: ['./prof-commission.component.css']
})

export class ProfCommissionComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public itemsCount: number | undefined
  public participes: Participe[] = [];
  public isFetchingItems = true;
  public commissions: Commission[] = [];
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
  constructor(private operationsService: OperationsService) { }

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
      this.commissions = data as Commission[];
      this.alert = {
        type: 'success',
        message: 'success',
      };
    }).catch((error) => {
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

  
}
