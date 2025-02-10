import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordRecoveryService {
  constructor(private client: HttpClient) {}

  requestPasswordReset(email: string): Promise<Boolean> {
    return new Promise<Boolean>((resolve, _) => {
      this.client
        .post(`${environment.API_URL}/api/request-password-reset/`, {
          email,
          redirectUrl: `${window.origin}/home/candidat/perform-reset`,
        })
        .pipe(first())
        .subscribe({
          next: (_) => resolve(true),
          error: (_) => resolve(false),
        });
    });
  }

  resetPassword(password: string, token: string): Promise<Boolean> {
    return new Promise<Boolean>((resolve, _) => {
      this.client
        .patch(`${environment.API_URL}/api/perform-password-reset/`, {
          password,
          token,
        })
        .pipe(first())
        .subscribe({
          next: (_) => resolve(true),
          error: (_) => resolve(false),
        });
    });
  }
}
