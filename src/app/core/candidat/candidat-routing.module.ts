import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { IsCandidatGuard } from 'src/app/guards/is-candidat.guard';
import { BacComponent } from './components/bac/bac.component';
import { BtsComponent } from './components/bts/bts.component';
import { CIngenieurComponent } from './components/c-ingenieur/c-ingenieur.component';
import { ParcoursComponent } from './components/candidat-mini-header/parcours.component';
import { ContainerComponent } from './components/container/container.component';
import { DemandeInscriptionComponent } from './components/demande-inscription/demande-inscription.component';
import { DeugComponent } from './components/deug/deug.component';
import { DeustComponent } from './components/deust/deust.component';
import { DoctoratMedecineComponent } from './components/doctorat-medecine/doctorat-medecine.component';
import { DtsComponent } from './components/dts/dts.component';
import { DutComponent } from './components/dut/dut.component';
import { InfoPersonnelsComponent } from './components/info-personnels/info-personnels.component';
import { LicenceProComponent } from './components/licence-pro/licence-pro.component';
import { LicenceComponent } from './components/licence/licence.component';
import { MasterProComponent } from './components/master-pro/master-pro.component';
import { MasterStComponent } from './components/master-st/master-st.component';
import { MasterComponent } from './components/master/master.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PostulerComponent } from './components/postuler/postuler.component';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';
import { SujersComponent } from './components/sujets/sujers.component';

const routes: Routes = [
  {
    path: 'candidat',
    redirectTo: 'candidat/info_personnels',
    pathMatch: 'full',
  },
  
  { path: 'profil', component: ProfilCandidatComponent },

  {
    path: 'candidat',
    
    component: ContainerComponent,
    canActivateChild: [IsCandidatGuard],
    children: [
      { path: 'info_personnels', component: InfoPersonnelsComponent },
      { path: 'postuler', component: PostulerComponent },
      { path: 'notifications', component: NotificationsComponent
      },
      {
        path : 'demande_inscription' , component : DemandeInscriptionComponent
      },
      { path: 'sujets_choisies' , component : SujersComponent},
      { path: 'parcours', redirectTo: 'parcours/'+DiplomeType.BAC, pathMatch: 'full' },

      {
        path: 'parcours',
        component: ParcoursComponent,
        children: [
          { path: DiplomeType.BAC, component: BacComponent },
          { path: DiplomeType.DUT, component: DutComponent },
          { path: DiplomeType.CI, component: CIngenieurComponent },
          { path: DiplomeType.MASTER, component: MasterComponent },
          { path: DiplomeType.MASTER_SPECIALISE, component: MasterProComponent },
          { path: DiplomeType.MASTER_EN_SCIENCE_TECHNIQUE, component: MasterStComponent },
          { path: DiplomeType.LICENCE, component: LicenceComponent },
          { path: DiplomeType.LICENCE_PROFESSIONNELLE, component: LicenceProComponent },
          { path: DiplomeType.DOCTORATE_EN_MEDICINE, component: DoctoratMedecineComponent },
          { path: DiplomeType.BTS, component: BtsComponent },
          { path: DiplomeType.DTS, component: DtsComponent },
          { path: DiplomeType.DEUG, component: DeugComponent },
          { path: DiplomeType.DEUST, component: DeustComponent }

        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CandidatRoutingModule {}
