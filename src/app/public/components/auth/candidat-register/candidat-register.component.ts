import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { AuthService } from 'src/app/auth/auth.service';
import { CountriesService } from 'src/app/core/candidat/services/countries.service';
import PreRegistration from 'src/app/models/PreRegistration';
import { RegisterService } from 'src/app/public/services/auth/register.service';

@Component({
  selector: 'app-candidat-register',
  templateUrl: './candidat-register.component.html',
  styleUrls: ['./candidat-register.component.css'],
})
export class CandidatRegisterComponent implements OnInit {
  isVerifyingToken = true;
  showTokenInvalid = false;
  showPasswordsMisMatch = false;
  preRegData: PreRegistration | undefined;
  showRegError = false;
  isRegistering = false;
  private token: string = '';


  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    cne: new FormControl('', [Validators.required]),
    nomAr: new FormControl(''),
    prenomAr: new FormControl(''),
    dateN: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    lieuN: new FormControl('', [Validators.required]),
    lieuNAr: new FormControl(''),
    adresse: new FormControl('', [Validators.required]),
    ville: new FormControl('', [Validators.required]),
    telCandidat: new FormControl('', [Validators.required]),
    nationalite: new FormControl('', [Validators.required]),
    sitFam: new FormControl('celebataire', [Validators.required]),
    handCap: new FormControl('non', [Validators.required]),
    thandCap: new FormControl('aucune'),
  });

  constructor(
    activeRoute: ActivatedRoute,
    private registerService: RegisterService,
    private router: Router,
    private httpCountries: CountriesService,
    authService: AuthService
  ) {
    activeRoute.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
    authService.clearCredentials();
    activeRoute.queryParams.subscribe({
      next: (params) => {
        const token: string | undefined | null = params['token'];
        if (!token) {
          this.showTokenInvalid = true;
          this.isVerifyingToken = false;
          return;
        }
        registerService.verifyToken(token).subscribe({
          next: (data) => {
            this.preRegData = data;
          },
          error: (err: HttpErrorResponse) => {
            this.showTokenInvalid = true;
            this.isVerifyingToken = false;
          },
          complete: () => {
            this.isVerifyingToken = false;
          },
        });

      
      },
    });
    if (!this.showTokenInvalid) {
      // this can be swapped for something better,
      this.form.controls['confPassword'].valueChanges.subscribe({
        next: (value) => {
          if (value !== this.form.controls['password'].value) {
            this.showPasswordsMisMatch = true;
          } else {
            this.showPasswordsMisMatch = false;
          }
        },
      });
    }
  }

  onSubmit() {
    if (this.showPasswordsMisMatch) return;
    const payload = {
      token: this.token,
      cne: this.form.controls['cne'].value,
      nom: this.preRegData?.nom,
      prenom: this.preRegData?.prenom,
      email: this.preRegData?.email,
      password: this.form.controls['password'].value,
      pays: this.form.controls['nationalite'].value,
      cin: this.form.controls['cin'].value,
      nomCandidatAr: this.form.controls['nomAr'].value,
      prenomCandidatAr: this.form.controls['prenomAr'].value,
      adresse: this.form.controls['adresse'].value,
      sexe: this.form.controls['sex'].value,
      villeDeNaissance: this.form.controls['lieuN'].value,
      villeDeNaissanceAr: this.form.controls['lieuNAr'].value,
      ville: this.form.controls['ville'].value,
      dateDeNaissance: this.form.controls['dateN'].value,
      typeDeHandiCape: this.form.controls['thandCap'].value,
      situationfamiliale: this.form.controls['sitFam'].value,
      telephone: this.form.controls['telCandidat'].value,
    };
    this.isRegistering = true;
    this.registerService
      .registerCandidat(payload)
      .then((data) => {
        this.router.navigateByUrl('/home/candidat/login');
      })
      .catch((error) => {
        this.showRegError = true;
      });
  }

  public _countries: any;

  ngOnInit(): void {
    this.httpCountries.getCountries().subscribe((res) => {
      this._countries = res.data;
    });
  }
}
