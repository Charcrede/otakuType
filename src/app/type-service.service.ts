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
  Synopsys: Synopsis[] = SYNOPSIS.sort((a, b)=>a.texte.split("").length - b.texte.split("").length);
  Citations: Citations[] = CITATIONS.sort((a, b)=>a.text.split("").length - b.text.split("").length);
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
  monStockage = localStorage;
  errorsCount: number = 0;
  
  getSynopsis(synop: Synopsis){
    this.selectedSynopsis = synop;
    this.monStockage.setItem("texteSynop", this.selectedSynopsis.texte)
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
    this.monStockage.setItem("texteCit", this.selectedCitation.text)
    let tab3 = this.selectedCitation.text.split(" ");
    let tab4 = [];
    for (let i = 0; i < tab3.length; i++) {
      tab4.push(tab3[i].split(""));
    }
    this.wordCitation = tab4;
    this.imageCitation = this.selectedCitation.url;
  }
}
