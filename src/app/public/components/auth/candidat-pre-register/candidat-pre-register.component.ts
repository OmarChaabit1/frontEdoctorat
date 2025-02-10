import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreRegisterService } from 'src/app/public/services/auth/pre-register.service';

@Component({
  selector: 'app-candidat-pre-register',
  templateUrl: './candidat-pre-register.component.html',
  styleUrls: ['./candidat-pre-register.component.css'],
})
export class CandidatPreRegisterComponent {
  constructor(private service: PreRegisterService) {}

  errorText: string | undefined = undefined;
  showEmailConfMsg = false;
  showError = false;
  showLoading = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.errorText = undefined;
    this.showError = false;
    this.showLoading = true;
    this.service
      .makeConfirmationEmailRequest(
        this.form.get('email')!.value,
        this.form.get('nom')!.value,
        this.form.get('prenom')!.value
      )
      .subscribe({
        next: (data) => {
          this.showEmailConfMsg = true;
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 400) {
            this.errorText =
              "Une erreur s'est produite lors de l'exécution de la demande. Il est possible qu'un compte soit déjà lié aux informations fournies";
          } else {
            this.errorText =
              "Une erreur s'est produite lors de la communication avec notre serveur.Réessayez plus tard. Désolé pour le dérangement";
          }
          this.showError = true;
          this.showLoading = false;
        },
        complete: () => (this.showLoading = false),
      });
  }
}
