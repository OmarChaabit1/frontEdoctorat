import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordRecoveryService } from 'src/app/public/services/auth/password-recovery.service';

@Component({
  selector: 'app-candidat-recovery',
  templateUrl: './candidat-recovery.component.html',
  styleUrls: ['./candidat-recovery.component.css']
})
export class CandidatRecoveryComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: PasswordRecoveryService) { }
  requesting = false
  requestSuccessful: boolean | undefined

  form = this.fb.group({
    email: ['',[ Validators.required, Validators.email]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.requesting = true
    this.service.requestPasswordReset(this.form.get('email').value).then((successful) => {
      if (successful) {
        this.requestSuccessful = true
        return;
      }
      this.requestSuccessful = false
    }

    ).finally(() => this.requesting = false)
  }

}
