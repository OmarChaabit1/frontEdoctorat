import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirecteurCedCandidatComponent } from './components/directeur-ced-candidat/directeur-ced-candidat.component';
import { DirecteurCedCommissionComponent } from './components/directeur-ced-commission/directeur-ced-commission.component';
import { DirecteurCedHeaderComponent } from './components/directeur-ced-header/directeur-ced-header.component';
import { DirecteurCedResultatComponent } from './components/directeur-ced-resultat/directeur-ced-resultat.component';
import { DirecteurCedSujetComponent } from './components/directeur-ced-sujet/directeur-ced-sujet.component';
import { MainCedComponent } from './components/main-ced/main-ced.component';
import { PrincipaleCedComponent } from './components/principale-ced/principale-ced.component';
import { CedRoutingModule } from './directeur.routing.module';
import { DirecteurCedOptionsComponent } from './components/directeur-ced-options/directeur-ced-options.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DirecteurCedCandidatComponent,
    DirecteurCedCommissionComponent,
    DirecteurCedHeaderComponent,
    DirecteurCedResultatComponent,
    DirecteurCedSujetComponent,
    MainCedComponent,
    PrincipaleCedComponent,
    DirecteurCedOptionsComponent
  ],
  imports: [
    CommonModule,
    CedRoutingModule,
    NgxPaginationModule,
    SharedModule,
    TranslateModule
  ]
})
export class DirecteurCedModule { }

//par anouar 2022 8 april 01h-48
