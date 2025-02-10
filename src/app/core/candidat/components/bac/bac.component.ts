import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatService } from '../../services/candidat.service';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { TypeAnnexeEnum } from 'src/app/enums/TypeAnnexeEnum';
import swal from 'sweetalert';


@Component({
  selector: '[app-bac]',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.css'],
})

export class BacComponent implements OnInit {
  constructor(
    private httpCountries: CountriesService,
    private fservice: RxFormBuilder,
    private candidatParcours: CandidatParcoursService,
    private candidatService: CandidatService
  ) {}

  public countries: any;
  public candidatBac: Diplome | undefined;
  public message!: string;
  public isFetchingInfo = true;
  public errorText: string | undefined;
  public isUpdating = false;                                   
  public mentions = this.candidatService.mentions;
  public bacTypes = this.candidatService.TypeBac;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';
  diplomeFileLink: string | undefined;
  releveFileLink: string | undefined;
  public bacExists = false;
  diplome: Diplome | undefined;

  public candidatBacForm = <RxFormGroup>this.fservice.group({
    intitule: [DiplomeType.BAC],
    type: [DiplomeType.BAC],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    mention: ['', Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    diplomeFile: ['', Validators.required],
    relevefile: ['', Validators.required],
  });

  ngOnInit(): void {
    this.httpCountries.getCountries().subscribe((res) => {
      this.countries = res.data;
    });

    this.candidatParcours
      .getDiplomes(DiplomeType.BAC)
      .then((diplome) => {
        if (diplome) {
          diplome = diplome as Diplome;
          this.diplome = diplome;
          this.bacExists = true;
          this.candidatBacForm.controls['dateCommission'].setValue(
            diplome.dateCommission
          );
          this.candidatBacForm.controls['pays'].setValue(diplome.pays);
          this.candidatBacForm.controls['ville'].setValue(diplome.ville);
          this.candidatBacForm.controls['province'].setValue(diplome.province);
          this.candidatBacForm.controls['mention'].setValue(diplome.mention);
          this.candidatBacForm.controls['etablissement'].setValue(
            diplome.etablissement
          );
          this.candidatBacForm.controls['specialite'].setValue(
            diplome.specialite
          );
          this.candidatBacForm.controls['moyen_generale'].setValue(
            diplome.moyen_generale
          );
          this.candidatBacForm.controls['moyen_generale'].setValue(
            diplome.moyen_generale
          );
          this.candidatBacForm.controls['diplomeFile'].removeValidators(
            Validators.required
          );
          this.candidatBacForm.controls['relevefile'].removeValidators(
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
    const formData = this.candidatBacForm.toFormData();
    formData.set('diplomeFile', formData.get('diplomeFile[0]'));
    formData.set('releveFile', formData.get('relevefile[0]'));
    formData.delete('releveFile[0]');
    formData.delete('diplomeFile[0]');
    if (!this.bacExists) {
      this.candidatParcours
        .addDiplome(formData)
        .then((_) => {
          swal({
            icon: 'success',
          });
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
        .then((_) =>
          swal({
            icon: 'success',
          })
        )
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
          this.candidatBacForm.controls['diplomeFile'].setValue('');
          this.errorText =
            'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo';
        } else if (type === this.RELEVE_FILE) {
          this.candidatBacForm.controls['relevefile'].setValue('');
          this.errorText =
            'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
        }
        return;
      }
    }
  }
}
