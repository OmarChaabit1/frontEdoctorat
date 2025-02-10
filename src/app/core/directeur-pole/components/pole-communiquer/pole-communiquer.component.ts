import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Commission } from 'src/app/models/Commission';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { PoleCommuniquerService } from '../../services/pole-communiquer.service';

@Component({
  selector: 'app-pole-communiquer',
  templateUrl: './pole-communiquer.component.html',
  styleUrls: ['./pole-communiquer.component.css']
})
export class PoleCommuniquerComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  constructor(public poleCommuniquerService: PoleCommuniquerService) { }

  ngOnInit(): void {
  }
  publierSujet() {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    this.poleCommuniquerService.publierSujet().then(
      (data) => {
        this.alert = {
          type: 'success',
          message: 'publier avec succès',
        };
      }).catch((err) => {

        this.alert = {
          type: 'error',
          message: "error",
        };
      }).finally(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }

  publierListePrincipale() {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    this.poleCommuniquerService.publierListePrincipale().then(
      (data) => {
        this.alert = {
          type: 'success',
          message: 'publier avec succès',
        };
      }).catch((err) => {

        this.alert = {
          type: 'error',
          message: "error",
        };
      }).finally(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }

  publierListeAttente() {
    
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    this.poleCommuniquerService.publierListeAttente().then(
      (data) => {
        this.alert = {
          type: 'success',
          message: 'publier avec succès',
        };
      }).catch((err) => {

        this.alert = {
          type: 'error',
          message: "error",
        };
      }).finally(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }
}
