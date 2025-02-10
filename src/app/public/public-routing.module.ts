import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatAuthComponent } from './components/auth/candidat-auth/candidat-auth.component';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRecoveryComponent } from './components/auth/candidat-recovery/candidat-recovery.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ScolariteAuthComponent } from './components/auth/scolarite-auth/scolarite-auth.component';
import { ScolariteLoginComponent } from './components/auth/scolarite-login/scolarite-login.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ContainerComponent } from './components/container/container.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'home', redirectTo: 'home/infos', pathMatch: 'full' },

  {
    path: 'home',
    component: ContainerComponent,
    children: [
      { path: 'infos', component: MainComponent },
      { path : 'description' , component : DetailsComponent },
      { path: 'connexion', component: ConnexionComponent },
      {
        path: 'candidat',
        component: CandidatAuthComponent,
        children: [
          { path: 'login', component: CandidatLoginComponent },

          { path: 'pre-register', component: CandidatPreRegisterComponent },

          { path: 'register', component: CandidatRegisterComponent },
          
          { path: 'recover_password', component: CandidatRecoveryComponent },
          {path: 'perform-reset', component: ResetPasswordComponent}
        ],
      },
      {
        path: 'scolarite',
        component: ScolariteAuthComponent,
        children: [
          { path: 'login', component: ScolariteLoginComponent },
        ],
      },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
