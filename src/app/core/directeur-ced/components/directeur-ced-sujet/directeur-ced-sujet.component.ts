import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/core/professeur/services/operations.service';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import UserProf from 'src/app/models/UserProf';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationCedService } from '../../services/operation-ced.service';

@Component({
  selector: '[app-directeur-ced-sujet]',
  templateUrl: './directeur-ced-sujet.component.html',
  styleUrls: ['./directeur-ced-sujet.component.css']
})
export class DirecteurCedSujetComponent implements OnInit {
  [x: string]: any;
  
  public alert: AlertData | undefined = undefined;
  public loading = false;
  public sujets: Sujet[] = [];
  public professeurs: Professeur[] = [];
  itemsCount: number | undefined;
  public isFetchingItems = true;
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
  constructor(
   
   private operationsService: OperationCedService
  ) {}
 
 
  ngOnInit(): void {

    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService.getSujets().then((res) => {
      this.sujets = res.results;
      this.itemsCount = res.count;
      this.isFetchingItems = false;
    
    }).then((data)=>{
      this.operationsService.getProfesseurs().then((data) => {
        this.result = data as Result<Professeur>;
        this.professeurs = this.result.results;
  
      });
    }).then((data)=>{
      this.operationsService.getFormationDoctorales().then((data) => {
        this.result = data as Result<FormationDoctorale>;
        this.formationDoctorales = this.result.results;
      });
    }).catch((error)=>{
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(()=>{
      this.loading = false
      this.alert = {
        type: 'success',
        message: 'Bienvenue',
      };
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

  closeResult = '';

 
  onIndexChange(offset: number) {
    if (this.isFetchingItems) return;
    this.isFetchingItems = true;
    this.operationsService.getSujets(offset)
      .then((d) => {
        this.sujets = d.results;
      })
      .finally(() => (this.isFetchingItems = false));
  }
  

  
  }



  


