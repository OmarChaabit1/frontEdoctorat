import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PoleCandidatComponent } from './components/pole-candidat/pole-candidat.component';
import { PoleSujetComponent } from './components/pole-sujet/pole-sujet.component';
import { PoleCommissionComponent } from './components/pole-commission/pole-commission.component';
import { PoleCommuniquerComponent } from './components/pole-communiquer/pole-communiquer.component';
import { PoleInscriptionComponent } from './components/pole-inscription/pole-inscription.component';
import { PoleRoutingModule } from './pole-routing.module';
import { DirecteurMainComponent } from './components/directeur-main/directeur-main.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DirecteurPoleComponent } from './components/directeur-pole.component';
import { PoleCalendrierComponent } from './components/pole-calendrier/pole-calendrier.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PoleCandidatComponent,
    PoleSujetComponent,
    PoleCommissionComponent,
    PoleCommuniquerComponent,
    PoleInscriptionComponent,
    DirecteurMainComponent,
    DirecteurPoleComponent,
    PoleCalendrierComponent
  ],
  imports: [
    CommonModule,
    PoleRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    SharedModule
  ],
  exports: [
    DirecteurPoleComponent
  ],
  bootstrap: [
    DirecteurPoleComponent
  ]
})
export class DirecteurPoleModule { }
