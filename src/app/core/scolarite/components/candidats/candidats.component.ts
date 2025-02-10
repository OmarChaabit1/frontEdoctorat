import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidatService } from 'src/app/core/candidat/services/candidat.service';
import { PoleCandidatsService } from 'src/app/core/directeur-pole/services/pole-candidats.service';
import { Candidat } from 'src/app/models/Candidat';
import { Postuler } from 'src/app/models/Postuler';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { environment } from 'src/environments/environment';
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
  public candidats: Postuler[] = [];
  public candidat: Postuler = {
    pathFile: '',
    sujet: undefined,
    candidat: undefined,
    id: 0
  };
  public remarque = '';
  closeResult = '';
  public str: string = environment.API_URL
  constructor(public operationsService: OperationsService, private modalService: NgbModal) { }

  public form = new FormGroup({
    remarque: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  ngOnInit(): void {
    this.getScolariteCandidats();
  }


  fun = (content: any, c: Postuler) => {
    this.candidat = c;
    this.form.setValue({
      remarque: c['remarque'],
    });
    // console.log(this.candidat)
    this.open(content);
  };

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public getScolariteCandidats() {
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService.fetchScolariteCandidats()
      .then(x => {
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
    this.operationsService
      .fetchScolariteCandidats(offset)
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

  onClickUpdate() {
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    const valider = {
      remarque: this.form.get('remarque').value,
      valider: true,
    };
    // console.log(valider)
    this.operationsService
      .updateValider(valider, this.candidat.id)
      .then((data) => {
        this.loading = false;
        for (var i = 0; i < this.candidats.length; i++) {
          if (this.candidats[i].id === this.candidat.id) {
            this.candidats[i] = data as Postuler;
          }
        }
        this.alert = {
          type: 'success',
          message: 'success',
        };
      })
      .catch((err) => {
        console.log(err);
        this.alert = {
          type: 'error',
          message: 'error',
        };
      })
      .finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }
  invalider() {
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    const valider = {
      remarque: this.form.get('remarque').value,
      valider: false,
    };
    // console.log(valider)
    this.operationsService
      .updateValider(valider, this.candidat.id)
      .then((data) => {
        this.loading = false;
        for (var i = 0; i < this.candidats.length; i++) {
          if (this.candidats[i].id === this.candidat.id) {
            this.candidats[i] = data as Postuler;
          }
        }
        this.alert = {
          type: 'success',
          message: 'success',
        };
      })
      .catch((err) => {
        console.log(err);
        this.alert = {
          type: 'error',
          message: 'error',
        };
      })
      .finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }
}
