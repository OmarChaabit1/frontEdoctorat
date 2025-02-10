import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatService } from '../../services/candidat.service';
import { Annexe } from 'src/app/models/Annexe';
import {
  RxFormGroup,
} from '@rxweb/reactive-form-validators';
import swal from 'sweetalert';
import { TypeAnnexeEnum } from 'src/app/enums/TypeAnnexeEnum';


@Component({
  selector: '[app-master]',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css'],
})

export class MasterComponent implements OnInit {

  result!: Result<Diplome>;

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours: CandidatParcoursService,
    private candidatService: CandidatService
  ) {}

  public countries: any;
  public _cities: Array<string> = [];
  public candidatMaster: Diplome | undefined;
  public message!: string;
  public MasterExist = false;

  public mentions = this.candidatService.mentions;
  isUpdating = false;
  permitUpdate = true;
  errorText: string | undefined;
  isFetchingInfo = true;
  public selectedFile: File | undefined;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';
  diplome: Diplome | undefined;
  diplomeFileLink: string | undefined;
  releveFileLink: string | undefined;

  public candidatMasterForm = <RxFormGroup>this.fservice.group({
    intitule: [DiplomeType.MASTER],
    type: [DiplomeType.MASTER],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    mention: ['', Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    diplomeFile: ['', Validators.required],
    relevefile: ['', Validators.required]
  });

  ngOnInit(): void {

    this.httpCountries.getCountries().subscribe((res) => {
      this.countries = res.data;
    });

    this.candidatParcours
    .getDiplomes(DiplomeType.MASTER)
    .then((diplome) => {
      if (diplome) {
        diplome = diplome as Diplome;
        this.diplome = diplome;
        this.MasterExist = true;
        this.candidatMasterForm.controls['dateCommission'].setValue(
          diplome.dateCommission
        );
        this.candidatMasterForm.controls['pays'].setValue(diplome.pays);
        this.candidatMasterForm.controls['ville'].setValue(diplome.ville);
        this.candidatMasterForm.controls['province'].setValue(diplome.province);
        this.candidatMasterForm.controls['mention'].setValue(diplome.mention);
        this.candidatMasterForm.controls['etablissement'].setValue(
          diplome.etablissement
        );
        this.candidatMasterForm.controls['specialite'].setValue(
          diplome.specialite
        );
        this.candidatMasterForm.controls['moyen_generale'].setValue(
          diplome.moyen_generale
        );

        this.candidatMasterForm.controls['diplomeFile'].removeValidators(
          Validators.required
        );
        this.candidatMasterForm.controls['relevefile'].removeValidators(
          Validators.required
        );
        diplome.annexes.forEach((annexe) => {
          if (annexe.typeAnnexe == TypeAnnexeEnum.DIPLOME) {
            this.diplomeFileLink = annexe.pathFile.substring(
              annexe.pathFile.lastIndexOf('/') + 1
            );
          } else if (annexe.typeAnnexe == TypeAnnexeEnum.RELEVE) {
            this.releveFileLink = annexe.pathFile.substring(
              annexe.pathFile.lastIndexOf('/') + 1
            );
          }
        });
      }
    })
    .finally(() => (this.isFetchingInfo = false));
}

onSubmit() {
  this.isUpdating = true;
  const formData = this.candidatMasterForm.toFormData();
  formData.set('diplomeFile', formData.get('diplomeFile[0]'));
  formData.set('releveFile', formData.get('relevefile[0]'));
  formData.delete('releveFile[0]');
  formData.delete('diplomeFile[0]');
  if (!this.MasterExist) {
    this.candidatParcours
      .addDiplome(formData)
      .then((_) => {
        swal({
          icon: "success"
       })
      })
      .catch((_) => {
        this.errorText =
          "Une erreur s'est produite de notre côté, réessayez plus tard.";
      })
      .finally(() => (this.isUpdating = false));
  } else {
    if (formData.get('diplomeFile') === 'null') {
      formData.delete('diplomeFile');
    }
    if (formData.get('releveFile') === 'null') {
      formData.delete('releveFile');
    }
    this.candidatParcours
      .updateDiplome(formData, this.diplome.id)
      .then((_) => swal({
        icon: "success"
     }))
      .catch((_) => {
        this.errorText =
          "Une erreur s'est produite de notre côté, réessayez plus tard.";
      })
      .finally(() => (this.isUpdating = false));
  }
}

onFileSelected(event: Event, type: string) {
  this.errorText = undefined;
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (file.size > 4194304) {
      if (type === this.DIPLOME_FILE) {
        this.candidatMasterForm.controls['Master_diplome'].setValue('');
        this.errorText =
          'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo';
      } else if (type === this.RELEVE_FILE) {
        this.candidatMasterForm.controls['releves'].setValue('');
        this.errorText =
          'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
      }
      return;
    }
  }
}
}
