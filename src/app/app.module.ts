import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { CitationsComponent } from './citations/citations.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { PlaySynopComponent } from './play-synop/play-synop.component';
import { PlayCitComponent } from './play-cit/play-cit.component';
import { RoutingModuleModule } from './routing-module/routing-module.module';
import { HomeComponent } from './home/home.component';
import { ArcadeComponent } from './arcade/arcade.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    CitationsComponent,
    SynopsisComponent,
    PlaySynopComponent,
    PlayCitComponent,
    HomeComponent,
    ArcadeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RoutingModuleModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
