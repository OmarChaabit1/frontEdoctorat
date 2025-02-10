import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfCandidatComponent } from './components/prof-candidat/prof-candidat.component';
import { ProfCommissionComponent } from './components/prof-commission/prof-commission.component';
import { ProfInscritsComponent } from './components/prof-inscrits/prof-inscrits.component';
import { ProfResultatComponent } from './components/prof-resultat/prof-resultat.component';
import { ProfSujetComponent } from './components/prof-sujet/prof-sujet.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { MainProfComponent } from './components/main-prof/main-prof.component';
import { ContainerComponent } from './components/container/container.component';
import { IsProfessorGuard } from 'src/app/guards/is-professor.guard';

const routes: Routes = [
  {
    path: 'professeur',
    redirectTo: 'professeur/sujetprof',
    pathMatch: 'full',
  },

  {
    path: 'professeur',
    canActivateChild: [IsProfessorGuard],
    component: ContainerComponent,
    children: [
      { path: 'sujetprof', component: ProfSujetComponent },
      { path: 'candidatprof', component: ProfCandidatComponent },
      { path: 'commissionprof', component: ProfCommissionComponent },
      { path: 'resultatprof', component: ProfResultatComponent },
      { path: 'inscritsprof', component: ProfInscritsComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesseurRoutingModule {}
