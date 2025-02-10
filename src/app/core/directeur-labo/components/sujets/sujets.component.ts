import { Component, OnInit } from '@angular/core';
import { Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import swal from 'sweetalert';
import { LaboSujet } from '../../services/labo-sujet.service';


@Component({
  selector: 'app-sujets',
  templateUrl: './sujets.component.html',
  styleUrls: ['./sujets.component.css']
})

export class SujetsComponent implements OnInit {

  public closeResult = '';
  public isFetchingItems = true;
  public sujet_ = '';
  public formationDoctorale_ = '';
  public sujets_:Sujet[] = [];
  public page = 1;
  public itemsCount: number | undefined;
  public errorText = '';
  public dLaboSujet : Sujet | undefined ; 
  public dLaboSujetId : number | undefined;
  public dLaboProfesseur : Professeur | undefined;
  public alert: AlertData | undefined = undefined;
  public formations !: Result<FormationDoctorale>;
  public professors !: Result<Professeur>;
  public loading = false;

  constructor (
    private modalService: NgbModal,
    private fservice: RxFormBuilder,
    private operationsService: LaboSujet
    ) { }
  
  public dLaboform = <RxFormGroup>this.fservice.group({

    titre  :['',Validators.required],
    professeurId : ['',Validators.required],
    coDirecteurId : [''],
    formationDoctoraleId : ['',Validators.required]

   })

  ngOnInit(): void {
     this.getAllSujets();
     this.getFormationsDoctorales();
     this.getProfessors();
  }

  getAllSujets() {
  this.operationsService.getSubjects().then(x=>{
    this.sujets_ = x.results;    
    this.isFetchingItems = false;
    this.itemsCount= x.count;
    this.alert = {
      type: 'success',
      message: 'Bienvenue',
    };
  }).catch((error)=>{
    this.alert = {
      type: 'error',
      message: 'error',
    };
  }).finally(()=>{
    this.loading = false
    setTimeout(() => (this.alert = undefined), 3000);
  });

  }

  getFormationsDoctorales(){

  this.operationsService.getFormationsDoctorales().then(res=>{
     this.formations = res;
  })

  }

  getProfessors(){

  this.operationsService.getProfesseurs().then(res=>{
    this.professors = res;
  })

  }


  // search partie

  searchFormation() {
    if (this.formationDoctorale_ === '') {
      this.ngOnInit();
    } else {
      this.sujets_ = this.sujets_.filter((res) => {
        return res.formationDoctorale.titre
          .toLocaleLowerCase()
          .match(this.formationDoctorale_.toLocaleLowerCase());
      });
    }
  }

  // add sujet 

  addSujet(){
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    const sujetLabo = this.dLaboform.toFormData();
    this.operationsService.addSujet(sujetLabo)
    .then(res=>{
        this.sujets_.push(res as Sujet);
        this.loading = false;
        this.alert = {
        type: 'success',
        message: 'ajouté avec succès',
      };
    })
    .catch(res=>{
      this.alert = {
        type: 'error',
        message: "error lors de l'ajout",
      }
     }).finally(() => {
      this.dLaboform.reset();
      setTimeout(() => (this.alert = undefined), 3000);
    });

  }
  
  update (){
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.dLaboSujet = this.dLaboform.value; 

     this.operationsService.updateSujet(this.dLaboSujet,this.dLaboSujetId)
     .then(res=>{
      this.loading = false;
      this.alert = {
        type: 'success',
        message: 'modifié avec succès',
      };
     })
     .catch(res=>{
      this.alert = {
        type: 'error',
        message: "error lors de l'ajout",
      }
     }).finally(() => {
      this.dLaboform.reset();
      setTimeout(() => (this.alert = undefined), 3000);
    });

  }

  // delete sujet

  deleteSujet(sujet:Sujet){

    this.operationsService.deleteSujet(sujet.id).then(res=>{
      const index = this.sujets_.indexOf(sujet);
      this.sujets_.splice(index,1);
      swal({
        icon: 'success',
      })
      
    }).catch((_) => {
      this.alert = {
        type: 'loading',
        message: "error lors de la suppression",
      };
    })
    .finally(() => {
      setTimeout(() => (this.alert = undefined), 3000);
    }

    );

  }

  searchSujet() {
    if (this.sujet_ === '') {
      this.ngOnInit();
    } else {
      this.sujets_ = this.sujets_.filter((res) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.sujet_.toLocaleLowerCase());
      });
    }
  }

  onIndexChange(offset: number) {
    if (this.isFetchingItems) return;
    this.isFetchingItems = true;
    this.operationsService
      .getSubjects(offset)
      .then((d) => {
        this.sujets_ = d.results;
      })
      .finally(() => (this.isFetchingItems = false));
  }


// modals partie 

fun (content: any, s: Sujet) {

    this.dLaboform.setValue({
    titre: s.titre,
    professeurId : s.professeur.prenom,
    coDirecteurId: s.coDirecteur,
    formationDoctoraleId: s.formationDoctorale
  
  });
  this.dLaboSujetId = s.id;

  this.open(content);

};

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


}
