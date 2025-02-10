import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IsDPoleGuard } from 'src/app/guards/is-dpole.guard';
import { MainLaboComponent } from './components/main-labo/main-labo.component';
import { SujetsComponent } from './components/sujets/sujets.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { ResultatsComponent } from './components/resultats/resultats.component';
import { PreselectionComponent } from './components/preselection/preselection.component';


const routes: Routes = [
    { path: 'labo', redirectTo: '/labo/sujets', pathMatch: 'full' },

    {
        path: 'labo',
        canActivateChild: [IsDPoleGuard],
        component: MainLaboComponent,
        children: [
            { path: 'sujets', component: SujetsComponent },
            { path: 'commissions', component: CommissionsComponent },
            { path: 'resultats', component: ResultatsComponent },
            { path: 'candidats', component: CandidatsComponent },
            { path: 'preselection', component: PreselectionComponent },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LaboRoutingModule { }
