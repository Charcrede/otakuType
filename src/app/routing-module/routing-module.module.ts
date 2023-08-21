import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceuilComponent } from '../acceuil/acceuil.component';
import { CitationsComponent } from '../citations/citations.component';
import { PlayCitComponent } from '../play-cit/play-cit.component';
import { PlaySynopComponent } from '../play-synop/play-synop.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { RouterModule, Routes } from '@angular/router';
const typeRoute: Routes = [
  {
    path : 'acceuil',
    component: AcceuilComponent,
  },
  {
    path : 'citations',
    component: CitationsComponent,
  },
  {
    path : 'citation-play',
    component: PlayCitComponent,
  },
  {
    path : 'synopsis',
    component: SynopsisComponent,
  },
  {
    path : 'synopsis-play',
    component: PlaySynopComponent,
  },
  {
    path : '',
    component: AcceuilComponent,
  },
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(typeRoute),
  ],
  exports:[RouterModule],
})
export class RoutingModuleModule { }
