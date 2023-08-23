import { Injectable } from '@angular/core';
import { SYNOPSIS } from './mockOtaku_second';
import { Citations, Synopsis } from './otaku';
import { CITATIONS } from "./mockOtaku";
import { NgModel } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor() { }
  Synopsys: Synopsis[] = SYNOPSIS;
  Citations: Citations[] = CITATIONS;
  selectedSynopsis!: Synopsis;
  selectedCitation!: Citations;
  words!: string[][];
  wordCitation!: string[][];
  image!: string;
  imageCitation!: string;
  sentence!: string[];
  entered!: any;
  i: number = 0;
  u: number = 0;
  errorsCount: number = 0;
  
  getSynopsis(synop: Synopsis){
    this.selectedSynopsis = synop;
    let tab1 = this.selectedSynopsis.texte.split(" ");
    let tab2 = [];
    for (let i = 0; i < tab1.length; i++) {
      tab2.push(tab1[i].split(""));
    }
    this.words = tab2;
    this.image = this.selectedSynopsis.url;
  }
  
  getCitations(citation: Citations){
    this.selectedCitation = citation;
    let tab3 = this.selectedCitation.text.split(" ");
    let tab4 = [];
    for (let i = 0; i < tab3.length; i++) {
      tab4.push(tab3[i].split(""));
    }
    this.wordCitation = tab4;
    this.imageCitation = this.selectedCitation.url;
  }
}
