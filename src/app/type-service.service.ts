import { Injectable } from '@angular/core';
import { SYNOPSIS } from './mockOtaku_second';
import { Citations, Synopsis } from './otaku';
import { CITATIONS } from "./mockOtaku";
import { NgModel } from '@angular/forms'
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor() { }
  Synopsys: Synopsis[] = SYNOPSIS.sort((a, b) => a.texte.split("").length - b.texte.split("").length);
  Citations: Citations[] = CITATIONS.sort((a, b) => a.text.split("").length - b.text.split("").length);
  selectedSynopsis!: Synopsis;
  selectedSIndice!: number;
  selectedCIndice!: number;
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

  getSynopsis(indice: number) {
    this.selectedSIndice = indice;
    this.selectedSynopsis = this.Synopsys[this.selectedSIndice]
    this.monStockage.setItem("Synop", JSON.stringify(this.selectedSIndice))
    let tab1 = this.selectedSynopsis.texte.split(" ");
    let tab2 = [];
    for (let i = 0; i < tab1.length; i++) {
      tab2.push(tab1[i].split(""));
    }
    this.words = tab2;
    this.image = this.selectedSynopsis.url;
  }

  getCitations(indice: number) {
    this.selectedCIndice = indice;
    this.selectedCitation = this.Citations[this.selectedCIndice];
    this.monStockage.setItem("Cit", JSON.stringify(this.selectedCIndice))
    let tab3 = this.selectedCitation.text.split(" ");
    let tab4 = [];
    for (let i = 0; i < tab3.length; i++) {
      tab4.push(tab3[i].split(""));
    }
    this.wordCitation = tab4;
    this.imageCitation = this.selectedCitation.url;
  }
  nextSynopsis() {
    this.selectedSynopsis = this.Synopsys[this.selectedSIndice++];
    this.getSynopsis(this.selectedSIndice);
  }
  nextCitation() {
    this.selectedCitation = this.Citations[this.selectedCIndice++];
    this.getCitations(this.selectedCIndice);
  }
  verifySynop() {
    let str = (this.monStockage.getItem("Synop"));
    if (str) {
      this.selectedSIndice = JSON.parse(str);
      this.getSynopsis(JSON.parse(str))
    }
  }
  verifyCit() {
    let str = (this.monStockage.getItem("Cit"));
    if (str) {
      this.selectedCIndice = JSON.parse(str);
      this.getCitations(JSON.parse(str))
    }
  }
}
