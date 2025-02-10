import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Inscription } from 'src/app/models/Inscription';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-prof-inscrits',
  templateUrl: './prof-inscrits.component.html',
  styleUrls: ['./prof-inscrits.component.css']
})


export class ProfInscritsComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public page = 1;
  public itemsCount: number | undefined
  public message =
    "aucun sujet n'est choisi pour le moment,les sujets choisies vont apparaitre ici";
  public inscriptions: Inscription[] = [];
  public sujet: Sujet = {
    id: 0,
    professeur: {
      id: 0,
      nom: '',
      prenom: ''
    },
    coDirecteur: {
      id: 0,
      nom: '',
      prenom: ''
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
      dateAccreditation: ''
    },
    publier: false
  };
  public resultat: Result<Inscription> = {
    count: 0,
    next: '',
    previous: '',
    results: []
  }

  // public form = new FormGroup({
  //   titre: new FormControl("", [Validators.required, Validators.minLength(2)]),
  // })


  ngOnInit(): void {
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };


    this.operationsService.getMesInscrits().then(x => {
      this.loading = false
      this.inscriptions = x.results
      this.itemsCount = x.count;
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

  closeResult = '';

  constructor(private modalService: NgbModal, private operationsService: OperationsService) { }

  // fun = (content: any, s: Sujet) => {
  //   this.loading = true
  //   this.alert = {
  //     type: 'loading',
  //     message: 'loading',
  //   };
  //   this.operationsService.getSujet(s.id).then(data => {
  //     this.sujet = data
  //     console.log(this.sujet)
  //     this.form.setValue({
  //       titre: s.titre,
  //     });
  //     this.open(content)
  //   }).catch((error) => {
  //     console.log(error)
  //     this.alert = {
  //       type: 'error',
  //       message: 'error',
  //     };
  //   }).finally(() => {
  //     this.loading = false
  //     setTimeout(() => (this.alert = undefined), 2000);
  //   });

    
  // }

  // open(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  // onClickSubmit() {
    
  //   this.loading = true;
  //   this.alert = {
  //     type: 'loading',
  //     message: 'loading',
  //   };

  //   const sujet = {
  //     formationDoctoraleId: this.sujet.formationDoctorale,
  //     titre: this.sujet.titre,
  //     description: this.sujet.description,
  //   };
  //   if (this.sujet.coDirecteur !== null) {
  //     sujet['coDirecteurId'] = this.sujet.coDirecteur;
  //   }
  //   this.operationsService
  //     .updateSujet(sujet, this.sujet.id)
  //     .then((data) => {
  //       this.loading = false;
  //       this.alert = {
  //         type: 'success',
  //         message: 'modifier avec succès',
  //       };
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.alert = {
  //         type: 'faild',
  //         message: 'error lors de la modification',
  //       };
  //     })
  //     .finally(() => {
  //       this.form.reset();
  //       setTimeout(() => (this.alert = undefined), 3000);
  //     });
  // }

  onIndexChange(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getMesInscrits(offset)
      .then((d) => {
        this.inscriptions = d.results;
      })
      .finally(() => (this.loading = false));
  }
}
