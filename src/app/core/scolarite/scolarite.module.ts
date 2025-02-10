import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScolariteRoutingModule } from './scolarite-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { MainScolariteComponent } from './components/main-scolarite/main-scolarite.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    CandidatsComponent,
    MainScolariteComponent
  ],
  imports: [
    CommonModule,
    ScolariteRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ScolariteModule { }
