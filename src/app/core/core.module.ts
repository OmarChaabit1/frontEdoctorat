import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CandidatModule } from "./candidat/candidat.module";
import { DirecteurCedModule } from "./directeur-ced/directeur-ced.module";
import { DirecteurLaboModule } from "./directeur-labo/directeur-labo.module";
import { DirecteurPoleModule } from "./directeur-pole/directeur-pole.module";
import { ProfesseurModule } from "./professeur/profeseur.module";
import { ScolariteModule } from "./scolarite/scolarite.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CandidatModule,
    ProfesseurModule,
    DirecteurCedModule,
    DirecteurLaboModule,
    DirecteurPoleModule,
    ScolariteModule
  ],
  exports: [
    ProfesseurModule,
    DirecteurCedModule,
    DirecteurLaboModule,
    DirecteurPoleModule,
    CandidatModule,
    ScolariteModule
  ]
})
export class CoreModule { }
