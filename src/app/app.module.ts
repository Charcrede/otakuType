import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { CitationsComponent } from './citations/citations.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { PlaySynopComponent } from './play-synop/play-synop.component';
import { PlayCitComponent } from './play-cit/play-cit.component';
import { RoutingModuleModule } from './routing-module/routing-module.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    CitationsComponent,
    SynopsisComponent,
    PlaySynopComponent,
    PlayCitComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RoutingModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
