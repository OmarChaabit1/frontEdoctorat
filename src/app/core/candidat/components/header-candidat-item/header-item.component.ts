import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';

@Component({
  selector: '[app-header-item]',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.css'],
})
export class HeaderItemComponent implements OnInit {
  public nbrSujets = 0;

  constructor(
    public translate: TranslateService,
    public authService: AuthService
  ) {
    translate.addLangs(['fr', 'ar']);
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {}

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  logout() {
    this.authService.logout();
  }
}
