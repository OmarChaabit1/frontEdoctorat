import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import UserProf from 'src/app/models/UserProf';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-sujet]',
  templateUrl: './prof-sujet.component.html',
  styleUrls: ['./prof-sujet.component.css'],
})

export class ProfSujetComponent implements OnInit {

  public alert: AlertData | undefined = undefined;
  public loading = false;
  public sujets: Sujet[] = [];
  public professeurs: Professeur[] = [];
  public formationDoctorales: FormationDoctorale[] = [];

  public formationDoctorale: FormationDoctorale = {
    id: 0,
    ced: 0,
    etablissement: 0,
    axeDeRecherche: '',
    pathImage: '',
    titre: '',
    initiale: '',
    dateAccreditation: '',
  };

  user: UserProf = {
    username: '',
    first_name: '',
    last_name: '',
  };

  public prof: Professeur = {
    id: 0,
    nom: '',
    prenom: '',
  };

  public coDirecteur: Professeur = {
    id: 0,
    nom: '',
    prenom: '',
  };
  public currentProfesseur: Professeur = {
    id: 0,
    nom: '',
    prenom: '',
  };
  public sujet: Sujet = {
    id: 0,
    professeur: {
      id: 0,
      nom: '',
      prenom: '',
    },
    coDirecteur: {
      id: 0,
      nom: '',
      prenom: '',
    },
    titre: '',
    description: '',
    formationDoctorale: {
      id: 0,
      ced: 0,
      etablissement: 0,
      axeDeRecherche: '',
      pathImage: '',
      titre: '',
      initiale: '',
      dateAccreditation: '',
    },
    publier: false,
  };
  public sujet2: Sujet = {
    id: 0,
    professeur: {
      id: 0,
      nom: '',
      prenom: '',
    },
    coDirecteur: {
      id: 0,
      nom: '',
      prenom: '',
    },
    titre: '',
    description: '',
    formationDoctorale: {
      id: 0,
      ced: 0,
      etablissement: 0,
      axeDeRecherche: '',
      pathImage: '',
      titre: '',
      initiale: '',
      dateAccreditation: '',
    },
    publier: false,
  };
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  closeResult = '';

  public form = new FormGroup({
    titre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    coDirecteur: new FormControl(''),
    formationDoctorale: new FormControl('', [Validators.required]),
  });

  arrayRemove = (arr: Professeur[]) => {
    return arr.filter((ele) => {
      return ele.id !== this.currentProfesseur.id;
    });
  };

  ngOnInit(): void {

    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    Promise.all([this.getFormationDoctorales(), this.getProfesseurs(), this.getSujets()]).then(() => {
      this.alert = {
        type: 'success',
        message: 'success',
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
  getFormationDoctorales = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getFormationDoctorales().then((data) => {
        this.result = data as Result<FormationDoctorale>;
        this.formationDoctorales = this.result.results;
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  getProfesseurs = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getProfesseurs().then((data) => {
        this.result = data as Result<Professeur>;
        this.professeurs = this.result.results;
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  getSujets = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getSujets().then((data) => {
        this.result = data as Result<Sujet>;
        this.sujets = this.result.results;
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }
  
  constructor(
    private modalService: NgbModal,
    private operationsService: OperationsService
  ) { }

  fun = (content: any, s: Sujet) => {
    this.sujet2 = s;
    this.form.setValue({
      titre: s.titre,
      description: s.description,
      coDirecteur: null,
      formationDoctorale: null,
    });

    this.open(content);
  };

  open(content: any) {
    if (content._declarationTContainer.localNames[0] == 'mymodal') {
      this.form.reset()
    }
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
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


  onClickSubmit() {
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.sujet = this.form.value;
    const sujet = {
      formationDoctoraleId: this.sujet.formationDoctorale,
      titre: this.sujet.titre,
      description: this.sujet.description,
    };

    if (this.sujet.coDirecteur !== null) {
      sujet['coDirecteurId'] = this.sujet.coDirecteur;
    }
    this.operationsService.addSujet(sujet).then(
      (data) => {
        this.loading = false;
        this.alert = {
          type: 'success',
          message: 'ajouter avec succès',
        };
        this.sujets.push(data as Sujet);
      }).catch((err) => {
        this.alert = {
          type: 'error',
          message: "error lors de l'ajout",
        };
      }).finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });

  }

  onClickDelete(s: Sujet) {
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService
      .deleteSujet(s)
      .then((data) => {
        this.loading = false;
        for (var i = 0; i < this.sujets.length; i++) {
          if (this.sujets[i].id === s.id) {
            this.sujets.splice(i, 1);
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
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.sujet = this.form.value;
    const sujet = {
      formationDoctoraleId: this.sujet.formationDoctorale,
      titre: this.sujet.titre,
      description: this.sujet.description,
    };
    if (this.sujet.coDirecteur !== null) {
      sujet['coDirecteurId'] = this.sujet.coDirecteur;
    }
    this.operationsService
      .updateSujet(sujet, this.sujet2.id)
      .then((data) => {
        this.loading = false;
        for (var i = 0; i < this.sujets.length; i++) {
          if (this.sujets[i].id === this.sujet2.id) {
            this.sujets[i] = data as Sujet;
          }
        }
        this.alert = {
          type: 'success',
          message: 'modifier avec succès',
        };
      })
      .catch((err) => {
        console.log(err);
        this.alert = {
          type: 'error',
          message: 'error lors de la modification',
        };
      })
      .finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }
}
