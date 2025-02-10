import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Config from 'src/app/models/Config';
import { Postuler } from 'src/app/models/Postuler';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: '[app-choisir-sujets]',
  templateUrl: './choisir-sujets.component.html',
  styleUrls: ['./choisir-sujets.component.css'],
})

export class ChoisirSujetsComponent implements OnInit {
  public sujets: Sujet[] = [];
  public labo = '';
  public formationDotorale = '';
  public sujet = '';
  public page = 1;
  public config!: Config;
  public maxSujets: number | undefined = 0;
  itemsCount: number | undefined;
  isFetchingItems = true;
  selectedSubjectsId: number[] = [];
  alert: AlertData | undefined = undefined;
  postules: Postuler[] = [];
  public nbrSujets = 0;

  constructor(
    public candidatPostuler: CandidatPostulerService,
    public candidatConfig: CandidatService
  ) {}

  ngOnInit(): void {
    this.candidatPostuler.getSelectedSubjects().subscribe({
      next: (d) => {
        const postules = d.results;
        postules.forEach((p) => {
          this.postules.push(p);
          this.selectedSubjectsId.push(p.sujet.id);
        });
      },
    });
    this.getPublishedSujets();
    this.getConfigInfo();

    this.candidatPostuler.getSelectedSubjects().subscribe(res=>{
      this.nbrSujets = res.results.length;
    })
  }

  getPublishedSujets() {
    this.candidatPostuler.getPublishedSubjects().then((res) => {
      this.sujets = res.results;
      this.itemsCount = res.count;
      this.isFetchingItems = false;
    });
  }

  getConfigInfo() {
    this.candidatConfig.getConfigInfo().then((res) => {
      this.config = res;
      this.maxSujets = this.config.max_sujet_postuler;
    });
  }

  searchLabo() {
    if (this.labo === '') {
      this.ngOnInit();
    } else {
      this.sujets = this.sujets.filter((res) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.labo.toLocaleLowerCase());
      });
    }
  }

  searchFormation() {
    if (this.formationDotorale === '') {
      this.ngOnInit();
    } else {
      this.sujets = this.sujets.filter((res) => {
        return res.formationDoctorale.titre
          .toLocaleLowerCase()
          .match(this.formationDotorale.toLocaleLowerCase());
      });
    }
  }

  searchSujet() {
    if (this.sujet === '') {
      this.ngOnInit();
    } else {
      this.sujets = this.sujets.filter((res) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.sujet.toLocaleLowerCase());
      });
    }
  }

  onSelectSubjet(event: Event, subjet_id: number) {
    const target = event.target as HTMLInputElement;
    const index = this.selectedSubjectsId.indexOf(subjet_id);
    if (!target.checked) {
      if (index > -1) {
        this.handleDeletePostule(index, subjet_id);
        return;
      }
    }
    if (this.selectedSubjectsId.length >= this.maxSujets) return;
    if (index > -1) return;
    this.handleAddPostule(subjet_id);
  }

  private handleAddPostule(subjet_id: number) {
    this.selectedSubjectsId.push(subjet_id);
    this.alert = {
      type: 'loading',
      message: 'Entrain de postuler pour le sujet',
    };
    this.candidatPostuler
      .postuler(subjet_id)
      .then((f) => {
        if (f) {
          this.postules.push(f as Postuler);
          this.alert = {
            type: 'success',
            message: 'Sujet postuler avec success',
          };
          this.nbrSujets++;
        } else {
          this.alert = {
            type: 'error',
            message: 'Error',
          };
        }
      })
      .then(() => {
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }



  private handleDeletePostule(index: number, subjet_id: number) {
    this.selectedSubjectsId.splice(index, 1);
    this.alert = {
      type: 'loading',
      message: "Entrain d'enlever le sujet choisi",
    };
    let postule: Postuler, pindex: number;
    this.postules.every((p, index) => {
      if (p.sujet.id === subjet_id) {
        postule = p;
        pindex = index;
      }
      return p.sujet.id !== subjet_id;
    });
    if (postule) {
      this.candidatPostuler
        .deletePostule(postule.id)
        .then((d) => {
          if (d) {
            this.postules.splice(pindex, 1);
            this.alert = {
              type: 'success',
              message: 'Sujet choisi enlever avec success',
            };
            this.nbrSujets--;
          } else {
            this.alert = {
              type: 'error',
              message: "Erreur d'opération. Réessayez plus tard",
            };
          }
        })
        .finally(() => {
          setTimeout(() => (this.alert = undefined), 3000);
        });
    } else {
      this.alert = undefined;
    }
  }

  onIndexChange(offset: number) {
    if (this.isFetchingItems) return;
    this.isFetchingItems = true;
    this.candidatPostuler
      .getPublishedSubjects(offset)
      .then((d) => {
        this.sujets = d.results;
      })
      .finally(() => (this.isFetchingItems = false));
  }
}
