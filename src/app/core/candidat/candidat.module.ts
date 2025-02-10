import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacComponent } from './components/bac/bac.component';
import { CandidatParcoursComponent } from './components/candidat-parcours/parcours.component';
import { HeaderItemComponent } from './components/header-candidat-item/header-item.component';
import { SideCompteComponent } from './components/side-left-compte/side-compte.component';
import { CountriesService } from './services/countries.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CandidatComponent } from './components/candidat.component';
import { ParcoursComponent } from './components/candidat-mini-header/parcours.component';
import { PostulerComponent } from './components/postuler/postuler.component';
import { CandidatRoutingModule } from './candidat-routing.module';
import { DutComponent } from './components/dut/dut.component';
import { CIngenieurComponent } from './components/c-ingenieur/c-ingenieur.component';
import { DoctoratMedecineComponent } from './components/doctorat-medecine/doctorat-medecine.component';
import { MasterComponent } from './components/master/master.component';
import { LicenceComponent } from './components/licence/licence.component';
import { InfoPersonnelsComponent } from './components/info-personnels/info-personnels.component';
import { SujersComponent } from './components/sujets/sujers.component';
import { ChoisirSujetsComponent } from './components/choisir-sujets/choisir-sujets.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { CandidatMainComponent } from './components/candidat-main/candidat-main.component';
import { ContainerComponent } from './components/container/container.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';
import { LicenceProComponent } from './components/licence-pro/licence-pro.component';
import { MasterProComponent } from './components/master-pro/master-pro.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeugComponent } from './components/deug/deug.component';
import { DeustComponent } from './components/deust/deust.component';
import { BtsComponent } from './components/bts/bts.component';
import { DtsComponent } from './components/dts/dts.component';
import { MasterStComponent } from './components/master-st/master-st.component';
import { TranslateModule } from '@ngx-translate/core';
import { DemandeInscriptionComponent } from './components/demande-inscription/demande-inscription.component';
@NgModule({
  declarations: [
    CandidatParcoursComponent,
    HeaderItemComponent,
    SideCompteComponent,
    BacComponent,
    CandidatComponent,
    CandidatParcoursComponent,
    ParcoursComponent,
    PostulerComponent,
    DutComponent,
    CIngenieurComponent,
    DoctoratMedecineComponent,
    MasterComponent,
    LicenceComponent,
    InfoPersonnelsComponent,
    SujersComponent,
    ChoisirSujetsComponent,
    NotificationsComponent,
    CandidatMainComponent,
    ContainerComponent,
    ProfilCandidatComponent,
    LicenceProComponent,
    MasterProComponent,
    DeugComponent,
    DeustComponent,
    BtsComponent,
    DtsComponent,
    MasterStComponent,
    DemandeInscriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CandidatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RxReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SharedModule,
    TranslateModule
  ],
  exports: [CandidatComponent],
  providers: [CountriesService],
  bootstrap: [CandidatComponent],
})
export class CandidatModule {}
