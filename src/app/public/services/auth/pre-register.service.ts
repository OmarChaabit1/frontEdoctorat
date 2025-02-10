import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreRegisterService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  makeConfirmationEmailRequest(email: string, nom: string, prenom: string) {
    this.authService.clearCredentials()
    return this.httpClient.post(`${environment.API_URL}/api/confirm-email/`, {
      email,
      nom,
      prenom,
      origin: `${window.origin}/home/candidat/register`,
    });
  }
}
