import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SujetsComponent } from './components/sujets/sujets.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { ResultatsComponent } from './components/resultats/resultats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MainLaboComponent } from './components/main-labo/main-labo.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { OptionsComponent } from './components/options/options.component';
import { DirecteurLaboComponent } from './components/directeur-labo.component';
import { LaboRoutingModule } from './labo-routing.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { SujetTreeComponent } from './components/sujet-tree/sujet-tree.component';
import { PreselectionComponent } from './components/preselection/preselection.component';





@NgModule({
  declarations: [
    HeaderComponent,
    SujetsComponent,
    CommissionsComponent,
    ResultatsComponent,
    MainLaboComponent,
    CandidatsComponent,
    OptionsComponent,
    DirecteurLaboComponent,
    SujetTreeComponent,
    PreselectionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    LaboRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    Ng2SearchPipeModule,
    SharedModule,
  ],
  exports: [
    DirecteurLaboComponent
  ],
  bootstrap: [
    DirecteurLaboComponent
  ]
})
export class DirecteurLaboModule { }
