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
  selector: '[app-deug]',
  templateUrl: './deug.component.html',
  styleUrls: ['./deug.component.css'],
})

export class DeugComponent implements OnInit {
  constructor(
    private httpCountries: CountriesService,
    private fservice: RxFormBuilder,
    private candidatParcours: CandidatParcoursService,
    private candidatService: CandidatService
  ) {}

  public countries: any;
  public candidatDeug: Diplome | undefined;
  public message!: string;
  public isFetchingInfo = true;
  public errorText: string | undefined;
  public isUpdating = false;                                   
  public mentions = this.candidatService.mentions;
  public DeugTypes = this.candidatService.DeugTypes;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';
  diplomeFileLink: string | undefined;
  releveFileLink: string | undefined;
  public DeugExists = false;
  diplome: Diplome | undefined;

  public candidatDeugForm = <RxFormGroup>this.fservice.group({
    intitule: [DiplomeType.DEUG],
    type: [DiplomeType.DEUG],
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
      .getDiplomes(DiplomeType.DEUG)
      .then((diplome) => {
        if (diplome) {
          diplome = diplome as Diplome;
          this.diplome = diplome;
          this.DeugExists = true;
          this.candidatDeugForm.controls['dateCommission'].setValue(
            diplome.dateCommission
          );
          this.candidatDeugForm.controls['pays'].setValue(diplome.pays);
          this.candidatDeugForm.controls['ville'].setValue(diplome.ville);
          this.candidatDeugForm.controls['province'].setValue(diplome.province);
          this.candidatDeugForm.controls['mention'].setValue(diplome.mention);
          this.candidatDeugForm.controls['etablissement'].setValue(
            diplome.etablissement
          );
          this.candidatDeugForm.controls['specialite'].setValue(
            diplome.specialite
          );
          this.candidatDeugForm.controls['moyen_generale'].setValue(
            diplome.moyen_generale
          );

          this.candidatDeugForm.controls['diplomeFile'].removeValidators(
            Validators.required
          );
          this.candidatDeugForm.controls['relevefile'].removeValidators(
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
    const formData = this.candidatDeugForm.toFormData();
    formData.set('diplomeFile', formData.get('diplomeFile[0]'));
    formData.set('releveFile', formData.get('relevefile[0]'));
    formData.delete('releveFile[0]');
    formData.delete('diplomeFile[0]');
    if (!this.DeugExists) {
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
          this.candidatDeugForm.controls['diplomeFile'].setValue('');
          this.errorText =
            'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo';
        } else if (type === this.RELEVE_FILE) {
          this.candidatDeugForm.controls['relevefile'].setValue('');
          this.errorText =
            'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
        }
        return;
      }
    }
  }
}
