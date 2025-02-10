import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-scolarite-login',
  templateUrl: './scolarite-login.component.html',
  styleUrls: ['./scolarite-login.component.css']
})
export class ScolariteLoginComponent{

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  showLoading = false;
  showError = false;
  errorText = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.showLoading = true;
    this.authService
      .loginScolarite(
        this.form.get('username')!.value,
        this.form.get('password')!.value
      )
      .then((status) => {
        this.showError = false;
        this.router.navigateByUrl('/scolarite');
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
