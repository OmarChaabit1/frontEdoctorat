import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import AuthUser from 'src/app/models/GoogleAuthUser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  showLoading = false;
  showProfAuthError = false;
  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService
  ) {}

  public loginProf() {
    this.showLoading = true;
    this.showProfAuthError = false;
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((authUser: AuthUser) => {
        if (authUser) {
          this.authService
            .loginProfessor(authUser.idToken)
            .then((_) => {
              this.router.navigateByUrl('/professeur');
            })
            .catch((_) => {
              this.showProfAuthError = true;
            });
        }
      })
      .finally(() => (this.showLoading = false));
  }



}
