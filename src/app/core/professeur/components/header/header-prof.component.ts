import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/models/UserInfo';

@Component({
  selector: '[app-header-prof]',
  templateUrl: './header-prof.component.html',
  styleUrls: ['./header-prof.component.css'],
})

export class HeaderProfComponent {

  public prof!: UserInfo;
  constructor(private authService: AuthService) {
    
    authService.currentUserSubjet
      .pipe(filter((u) => u !== undefined))
      .subscribe((uinfo) => (this.prof = uinfo!));
  }
  public logout() {
    this.authService.logout()
  }
}
