import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: '[app-directeur-ced-header]',
  templateUrl: './directeur-ced-header.component.html',
  styleUrls: ['./directeur-ced-header.component.css']
})
export class DirecteurCedHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  public logout() {
    this.authService.logout()
  }
}
