import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import PreRegistration from 'src/app/models/PreRegistration';
import { PasswordRecoveryService } from 'src/app/public/services/auth/password-recovery.service';
import { RegisterService } from 'src/app/public/services/auth/register.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  isVerifyingToken = true;
  tokenError = false;
  data: PreRegistration | undefined;
  requesting = false;
  token: string | undefined;
  requestSuccessful: boolean | undefined;

  constructor(
    private service: PasswordRecoveryService,
    private fb: FormBuilder,
    registerService: RegisterService,
    route: ActivatedRoute
  ) {
    route.queryParams.subscribe({
      next: (params) => {
        const token: string | undefined | null = params['token'];
        if (!token) {
          this.tokenError = true;
          this.isVerifyingToken = false;
          return;
        }
        registerService.verifyToken(token).subscribe({
          next: (data) => {
            this.data = data;
            this.token = token;
          },
          error: (_) => {
            this.tokenError = true;
            this.isVerifyingToken = false;
          },
          complete: () => {
            this.isVerifyingToken = false;
          },
        });
      },
    });
  }

  form = this.fb.group(
    {
      pwd: ['', [Validators.required]],
      confPwd: ['', [Validators.required]],
    },
    { validators: this.ConfirmedValidator('pwd', 'confPwd') }
  );

  ngOnInit(): void {}

  onSubmit() {
    this.requesting = true;
    this.service
      .resetPassword(this.form.get('pwd').value, this.token)
      .then((success) => {
        if (success) {
          this.requestSuccessful = true;
          return;
        }
        this.requestSuccessful = false;
      })
      .finally(() => (this.requesting = false));
  }

  private ConfirmedValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const f = control.get(controlName);
      const matchF = control.get(matchingControlName);

      return f && matchF && f.value === matchF.value
        ? null
        : { NotEqual: true };
    };
  }
}
