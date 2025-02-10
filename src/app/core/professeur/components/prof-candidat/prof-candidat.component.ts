import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import { CandidastProfService } from '../../services/candidat-prof.service';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { Router } from '@angular/router';
import { Examiner } from 'src/app/models/Examiner';

@Component({
  selector: 'app-prof-candidat',
  templateUrl: './prof-candidat.component.html',
  styleUrls: ['./prof-candidat.component.css']
})

export class ProfCandidatComponent implements OnInit {

  public candidats_ : Postuler [] = [];
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public pathFileExists = false;

  constructor(public candidatS: CandidastProfService, private _router: Router) { }

  ngOnInit(): void {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.candidatS.getCandidats()
    .then(x=>{
      this.loading = true;
      this.candidats_ = x.results;
      this.alert = {
        type: 'success',
        message: 'success',
      };
    
    })
    .catch(error=>{
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }
  voirProfile(c: Postuler) {
    // console.log(c.candidat.cne)
    this._router.navigate(['candidat/profil', { id: c.candidat.id }]);
  }
}
