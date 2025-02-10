import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/models/UserInfo';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public prof!: UserInfo;
  constructor(private authService: AuthService) {

    authService.currentUserSubjet
      .pipe(filter((u) => u !== undefined))
      .subscribe((uinfo) => (this.prof = uinfo!));
  }
  ngOnInit(): void {
  }
  public logout() {
    this.authService.logout()
  }
}
