import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrincipaleCedComponent } from './components/principale-ced/principale-ced.component';
import { DirecteurCedSujetComponent } from './components/directeur-ced-sujet/directeur-ced-sujet.component';
import { DirecteurCedCandidatComponent } from './components/directeur-ced-candidat/directeur-ced-candidat.component';
import { DirecteurCedCommissionComponent } from './components/directeur-ced-commission/directeur-ced-commission.component';
import { DirecteurCedResultatComponent } from './components/directeur-ced-resultat/directeur-ced-resultat.component';
import { IsCEDGuard } from 'src/app/guards/is-ced.guard';

const routes: Routes = [
  {
    path: 'ced',
    component: PrincipaleCedComponent,
    canActivate: [IsCEDGuard],
    canActivateChild: [IsCEDGuard],
    children: [
      { path: 'sujetced', component: DirecteurCedSujetComponent },
      { path: 'candidatced', component: DirecteurCedCandidatComponent },
      { path: 'commissionced', component: DirecteurCedCommissionComponent },
      { path: 'resultatced', component: DirecteurCedResultatComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CedRoutingModule {}
