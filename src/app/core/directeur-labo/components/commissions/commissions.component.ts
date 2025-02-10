import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NumberValueAccessor } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Commission } from 'src/app/models/Commission';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Participe } from 'src/app/models/Participe';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import UserProf from 'src/app/models/UserProf';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined;
  public itemsCountSujets: number | undefined;
  public itemsCountProfs: number | undefined;
  public commissions: Commission[] = [];
  public isFetchingItems = false;
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
  public sujets: Sujet[] = [];
  public professeurs: Professeur[] = [];
  closeResult = '';
  // dropdownList: any = [];

  selectedSujets: Sujet[] = [];
  selectedSujetsIds: number[] = [];
  selectedProfs: Professeur[] = [];
  sujets_ids: number[] = [];
  professeurs_ids: number[] = [];
  labo_id: number;
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  constructor(private modalService: NgbModal, private operationsService: OperationsService, private fb: FormBuilder) { }

  public form = new FormGroup({
    date: new FormControl("", [Validators.required]),
    heure: new FormControl("", [Validators.required]),
    lieu: new FormControl("", [Validators.required, Validators.minLength(2)]),
    sujets: new FormControl(""),
    professeurs: new FormControl(""),

  })


  ngOnInit(): void {

    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    Promise.all([this.getCommissions()]).then(() => {
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



  getSujetsLabo = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getSujetsLabo().then((data) => {
        this.result = data as Result<Sujet>;
        this.sujets = this.result.results;
        this.labo_id = this.result.results[0].laboratoire.id
        this.itemsCountSujets = data.count
        resolve(data);
        this.processSujets(data.results)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getCommissions = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getCommissions().then(data => {
        this.loading = false
        this.result = data as Result<Commission>;
        this.commissions = this.result.results;
        this.itemsCount = data.count;
        resolve(data);
      }).catch((err)=>{
          reject(err)
      })
    })
  }
  getProfesseurs = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getProfesseurs().then(data => {
        this.loading = false
        this.result = data as Result<Professeur>;
        this.professeurs = this.result.results;
        this.itemsCountProfs = data.count
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }

  fun = (content: any, c: Commission) => {
    this.selectedSujets = []
    this.form.reset()
    this.form.setValue({
      date: c.dateCommission,
      heure: c.heure,
      lieu: c.lieu,
      sujets: '',
      professeurs: ''
    });
    this.commission = c
    this.commission.sujets.forEach((element) => {
      this.selectedSujets.push(element)
    })
    this.open(content)
  }
  public processedSujetData: Map<String, Sujet[]> = new Map();
  s: Sujet[] = []
  p: Professeur[] = []
  open(content: any) {
    this.sujets = []
    this.selectedProfs = []
    this.professeurs = []
    this.professeurs_ids = []

    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    if (content._declarationTContainer.localNames[0] == 'mymodal') {
      this.selectedSujets = []
      this.form.reset()
    }

    Promise.all([this.getSujetsLabo(), this.getProfesseurs()]).then(() => {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }).catch((error) => {
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 1000);
    });

  }
  private processSujets(sujets: Sujet[]) {
    this.processedSujetData.clear()
    sujets.forEach(sujet => {
      if (!this.processedSujetData.has(`${sujet.professeur.nom} ${sujet.professeur.prenom}`)) {
        this.processedSujetData.set(`${sujet.professeur.nom} ${sujet.professeur.prenom}`, []);
      }
      this.processedSujetData.get(`${sujet.professeur.nom} ${sujet.professeur.prenom}`).push(sujet);
    });
  }

  private getDismissReason(reason: any): string {
    this.selectedSujetsIds.splice(0, this.selectedSujetsIds.length)
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSujetSelect(sujet: Sujet) {
    this.selectedSujets.push(sujet)
    this.selectedSujetsIds.push(sujet.id)
  }

  onSujetDeSelect(sujet: Sujet) {
    for (let i = 0; i < this.selectedSujetsIds.length; i++) {
      if (this.selectedSujetsIds[i] === sujet.id) {
        this.selectedSujetsIds.splice(i, 1)
      }
    }
    for (var i = 0; i < this.selectedSujets.length; i++) {
      if (this.selectedSujets[i].id === sujet.id) {
        this.selectedSujets.splice(i, 1);
      }
    }
  }
  onProfesseurSelect(item: any) {
    this.selectedProfs.push(item)
    for (var i = 0; i < this.professeurs.length; i++) {
      if (this.professeurs[i] === item) {
        this.professeurs.splice(i, 1);
      }
    }
  }

  onProfesseurDeSelect(item: any) {
    this.professeurs.push(item)

    for (var i = 0; i < this.selectedProfs.length; i++) {
      if (this.selectedProfs[i] === item) {
        this.selectedProfs.splice(i, 1);
      }
    }
  }
  onClickSubmit() {
    this.selectedSujetsIds.splice(0, this.selectedSujetsIds.length)
    this.selectedSujets.forEach(e => {
      this.sujets_ids.push(e.id)
    });

    this.selectedProfs.forEach(e => {
      this.professeurs_ids.push(e.id)
    });

    const comm = {
      dateCommission: this.form.get('date').value,
      heure: this.form.get('heure').value,
      lieu: this.form.get('lieu').value,
      professeurs: this.professeurs_ids,
      sujets_ids: this.sujets_ids,
      labo: this.labo_id
    };

    this.operationsService.addCommission(comm).then(
      (data) => {
        this.loading = false;
        this.alert = {
          type: 'success',
          message: 'ajouter avec succès',
        };
        this.commissions.push(data as Commission);

      }).catch((err) => {
        console.log(err);
        this.alert = {
          type: 'error',
          message: "error lors de l'ajout",
        };
      }).finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }

  onClickDelete(c: Commission) {
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService
      .deleteCommission(c)
      .then((data) => {
        this.loading = false;
        for (var i = 0; i < this.commissions.length; i++) {
          if (this.commissions[i].id === c.id) {
            this.commissions.splice(i, 1);
          }
        }
        this.alert = {
          type: 'success',
          message: 'supprimer avec succès',
        };

      })
      .catch((error) => {
        console.log(`${error}`);
        this.alert = {
          type: 'error',
          message: 'error lors de la suppression',
        };
      })
      .finally(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }
  onClickUpdate() {
    this.selectedSujets.forEach(e => {
      this.sujets_ids.push(e.id)
    });

    this.selectedProfs.forEach(e => {
      this.professeurs_ids.push(e.id)
    });

    const comm = {
      dateCommission: this.form.get('date').value,
      heure: this.form.get('heure').value,
      lieu: this.form.get('lieu').value,
      professeurs: this.professeurs_ids,
      sujets_ids: this.sujets_ids,
      labo: this.labo_id
    };


    this.operationsService.updateSujet(comm, this.commission.id).then(
      (data) => {
        this.loading = false;
        this.alert = {
          type: 'success',
          message: 'modifier avec succès',
        };

        for (var i = 0; i < this.commissions.length; i++) {
          if (this.commissions[i].id === this.commission.id) {
            this.commissions[i] = data as Commission;
          }
        }

      }).catch((err) => {
        console.log(err);
        this.alert = {
          type: 'error',
          message: "error lors du modification",
        };
      }).finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }

  onIndexChange(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getCommissions(offset)
      .then((d) => {
        this.commissions = d.results;
      })
      .finally(() => (this.loading = false));
  }
  onIndexChangeSujets(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getSujetsLabo(offset)
      .then((d) => {
        this.sujets = d.results;
        this.processSujets(d.results)
      })
      .finally(() => (this.loading = false));
  }
  onIndexChangeProfs(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getProfesseurs(offset)
      .then((d) => {
        this.professeurs = d.results;
      })
      .finally(() => (this.loading = false));
  }
}
