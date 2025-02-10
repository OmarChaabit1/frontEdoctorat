import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DirecteurMainComponent } from './components/directeur-main/directeur-main.component';
import { PoleSujetComponent } from './components/pole-sujet/pole-sujet.component';
import { PoleCommissionComponent } from './components/pole-commission/pole-commission.component';
import { PoleCommuniquerComponent } from './components/pole-communiquer/pole-communiquer.component';
import { PoleCandidatComponent } from './components/pole-candidat/pole-candidat.component';
import { PoleInscriptionComponent } from './components/pole-inscription/pole-inscription.component';
import { PoleCalendrierComponent } from './components/pole-calendrier/pole-calendrier.component';
import { IsDPoleGuard } from 'src/app/guards/is-dpole.guard';

const routes: Routes = [
  { path: 'pole', redirectTo: '/pole/sujets', pathMatch: 'full' },

  {
    path: 'pole',
    canActivateChild: [IsDPoleGuard],
    component: DirecteurMainComponent,
    children: [
      { path: 'sujets', component: PoleSujetComponent },
      { path: 'commission', component: PoleCommissionComponent },
      { path: 'communiquer', component: PoleCommuniquerComponent },
      { path: 'candidat', component: PoleCandidatComponent },
      { path: 'calendrier', component: PoleCalendrierComponent },
      { path: 'inscription', component: PoleInscriptionComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoleRoutingModule {}
