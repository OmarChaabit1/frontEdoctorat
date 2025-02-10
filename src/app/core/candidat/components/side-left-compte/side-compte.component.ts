import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import Config from 'src/app/models/Config';
import UserInfo from 'src/app/models/UserInfo';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert';
import { CandidatNotificationsService } from '../../services/candidat-notifications.service';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: '[app-side-compte]',
  templateUrl: './side-compte.component.html',
  styleUrls: ['./side-compte.component.css'],
})
export class SideCompteComponent implements OnInit {

  public candidatInfo!: UserInfo;
  public config!: Config;
  public date_debut:any;
  public date_fin:any;
  public actual_date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  public disablePostuler = false;
  public notifications: Notification [] = [];
  public nbrNotifications = 0;

  constructor(
              public authService: AuthService,
              public candidatConfig:CandidatService,
              public candidatNotifications : CandidatNotificationsService
              ) {}

  getConfigInfo() {
    this.candidatConfig.getConfigInfo().then((res) => {
      this.config = res;
      this.date_debut = res.date_debut_postuler_sujet_candidat;
      this.date_fin = res.date_fin_postuler_sujet_candidat;


      if(this.actual_date > this.date_fin){
        this.disablePostuler = ! this.disablePostuler;
      }

      if(this.actual_date < this.date_debut){
        this.disablePostuler;
      }

    });
  }



   ngOnInit():  void {

    this.getConfigInfo();
    
  
    this.authService.currentUserSubjet  // Observable subscription starts
    .pipe(filter((u) => u != undefined))
    .subscribe((uinfo) => {
      this.candidatInfo = uinfo!;
         console.log(this.candidatInfo)
        if (
          this.candidatInfo.pathPhoto &&
          this.candidatInfo.pathPhoto.indexOf(environment.API_URL) <= -1
        ) {
          this.candidatInfo.pathPhoto = `${environment.API_URL}${this.candidatInfo.pathPhoto}`;
        
        }
      });

     this.candidatNotifications.getNotifications()
     .then(res=>{
       this.nbrNotifications = res.results.length;
     })
     .catch()
     .finally()

  }
}
