import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './core/candidat/components/candidat.component';
import { MainCedComponent } from './core/directeur-ced/components/main-ced/main-ced.component';
import { MainLaboComponent } from './core/directeur-labo/components/main-labo/main-labo.component';
import { DirecteurPoleComponent } from './core/directeur-pole/components/directeur-pole.component';
import { MainProfComponent } from './core/professeur/components/main-prof/main-prof.component';
import { MainScolariteComponent } from './core/scolarite/components/main-scolarite/main-scolarite.component';
import { IsCandidatGuard } from './guards/is-candidat.guard';
import { IsCEDGuard } from './guards/is-ced.guard';
import { IsDPoleGuard } from './guards/is-dpole.guard';
import { IsProfessorGuard } from './guards/is-professor.guard';
import { HomeComponent } from './public/components/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/infos', pathMatch: 'full' },
  { path: 'home',
    loadChildren: () => import('./public/public.module').then(x => x.PublicModule),
   component: HomeComponent },
  {
    path: 'professeur',
    component: MainProfComponent,
    canActivate: [IsCandidatGuard],
  },
  { path: 'candidat',
   loadChildren: () => import('./core/candidat/candidat.module').then(x => x.CandidatModule) } ,
  {
    path: 'pole',
    loadChildren: () => import('./core/directeur-pole/directeur-pole.module').then(x => x.DirecteurPoleModule),
    component: DirecteurPoleComponent,
    canActivate: [IsProfessorGuard, IsDPoleGuard],
  },
  {
    path: 'labo',
    loadChildren: () => import('./core/directeur-labo/directeur-labo.module').then(x => x.DirecteurLaboModule),
    component: MainLaboComponent,
    canActivate: [IsProfessorGuard, IsDPoleGuard],
  },
  {
    path: 'ced',
    loadChildren: () => import('./core/directeur-pole/directeur-pole.module').then(x => x.DirecteurPoleModule),
    component: MainCedComponent,
    canActivate: [IsProfessorGuard, IsCEDGuard],
  },
  {
    path: 'scolarite',
    loadChildren: () => import('./core/scolarite/scolarite.module').then(x => x.ScolariteModule),
    component: MainScolariteComponent,
    canActivate: [IsProfessorGuard, IsCEDGuard],
  },
 { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
