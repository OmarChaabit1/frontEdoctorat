import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import { CedComponent } from './components/ced/ced.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ConseilsComponent } from './components/conseils/conseils.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormationsComponent } from './components/formations/formations.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PublicRoutingModule } from './public-routing.module';
import { HttpService } from './services/http.service';
import { MainComponent } from './components/main/main.component';
import { LaboratoiresComponent } from './components/laboratoires/laboratoires.component';
import { ContainerComponent } from './components/container/container.component';
import { CandidatAuthComponent } from './components/auth/candidat-auth/candidat-auth.component';
import { TranslateModule } from '@ngx-translate/core';
import { CandidatRecoveryComponent } from './components/auth/candidat-recovery/candidat-recovery.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { ScolariteLoginComponent } from './components/auth/scolarite-login/scolarite-login.component';
import { ScolariteAuthComponent } from './components/auth/scolarite-auth/scolarite-auth.component';
import { DescriptionComponent } from './components/description/description.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    CalendrierComponent,
    CedComponent,
    ConseilsComponent,
    FooterComponent,
    FormationsComponent,
    HeaderComponent,
    HomeComponent,
    WelcomeComponent,
    ConnexionComponent,
    CandidatLoginComponent,
    CandidatPreRegisterComponent,
    CandidatRegisterComponent,
    LaboratoiresComponent,
    MainComponent,
    ContainerComponent,
    CandidatAuthComponent,
    CandidatRecoveryComponent,
    ResetPasswordComponent,
    ScolariteLoginComponent,
    ScolariteAuthComponent,
    DescriptionComponent,
    DetailsComponent
  ],
  imports: [CommonModule, PublicRoutingModule, ReactiveFormsModule,TranslateModule],
  exports: [HomeComponent],
  providers: [HttpService],
})

export class PublicModule {}


