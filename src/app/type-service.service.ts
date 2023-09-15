import { Injectable, OnInit } from '@angular/core';
import { SYNOPSIS } from './mockOtaku_second';
import { Citations, Synopsis } from './otaku';
import { ARCADES, CITATIONS } from "./mockOtaku";
import { NgModel } from '@angular/forms'
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService implements OnInit{

  constructor() { }
  ngOnInit(): void {
    this.aleatoire(this.ArcadeTexte);
  }
  ArcadeTexte:string = ARCADES;
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
  listeRandom : string[] = [];
  ArcadeTable: string[][] = [];
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
  // displayArcade(){
  //   let tab1 = this.aleatoire(this.ArcadeTexte);
  //   let tab2 = [];
  //   for (let i = 0; i < tab1.length; i++) {
  //     tab2.push(tab1[i].split(""));
  //   }
  //   return this.ArcadeTable = tab2;
  // }
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
    if (this.selectedSIndice<this.Synopsys.length-1) {
      this.selectedSynopsis = this.Synopsys[this.selectedSIndice++];
      this.getSynopsis(this.selectedSIndice);
    }else{
      this.selectedSynopsis = this.Synopsys[this.selectedSIndice];
      this.getSynopsis(this.selectedSIndice);
    }
  }
  prevSynopsis() {
    if (this.selectedSIndice>0) {
      this.selectedSynopsis = this.Synopsys[this.selectedSIndice--];
      this.getSynopsis(this.selectedSIndice);
    }else{
      this.selectedSynopsis = this.Synopsys[this.selectedSIndice];
      this.getSynopsis(this.selectedSIndice);
    }
  }
  previousSynopsis() {
    this.selectedSynopsis = this.Synopsys[this.selectedSIndice--];
    this.getSynopsis(this.selectedSIndice);
  }
  nextCitation() {
    if (this.selectedCIndice<this.Citations.length-1) {
      this.selectedCitation = this.Citations[this.selectedCIndice++];
      this.getCitations(this.selectedCIndice);
    }else{
      this.selectedCitation = this.Citations[this.selectedCIndice];
      this.getCitations(this.selectedCIndice);
    }
  }
  prevCitation() {
    if (this.selectedCIndice>0) {
      this.selectedCitation = this.Citations[this.selectedCIndice--];
      this.getCitations(this.selectedCIndice);
    }else{
      this.selectedCitation = this.Citations[this.selectedCIndice];
      this.getCitations(this.selectedCIndice);
    }
  }
  previousCitation() {
    this.selectedCitation = this.Citations[this.selectedCIndice--];
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
  aleatoire(str:string) {
    let listeCop: string[][] = [] ;
    let finalTab: string[][] = [] ;
    let tab = this.ArcadeTexte.split(" ");
    tab.forEach((el, u) => {
        listeCop.push(el.split(""));
      });
      for (let i = listeCop.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (listeCop.length));
        // [listeCop[i], listeCop[j]] = [listeCop[j], listeCop[i]];
          finalTab.push(listeCop[j]);
          this.ArcadeTable.push(listeCop[j]);
          finalTab.push([' ']);
          listeCop.splice(j,1);
      }
      return finalTab;
  }
}
