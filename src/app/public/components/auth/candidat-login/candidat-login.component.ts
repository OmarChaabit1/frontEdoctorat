import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-candidat-login',
  templateUrl: './candidat-login.component.html',
  styleUrls: ['./candidat-login.component.css'],
})
export class CandidatLoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  showLoading = false;
  showError = false;
  errorText = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.showLoading = true;
    this.authService
      .loginCandidat(
        this.form.get('email')!.value,
        this.form.get('password')!.value
      )
      .then((status) => {
        this.showError = false;
        this.router.navigateByUrl('/candidat');
      })
      .catch((err) => this.showErrorModal(err))
      .finally(() => (this.showLoading = false));
  }

  private showErrorModal(message: string) {
    // better impl will be provided later.
    this.showError = true;
    this.errorText = message;
  }
}
