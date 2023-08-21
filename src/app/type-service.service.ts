import { Injectable } from '@angular/core';
import { SYNOPSIS } from './mockOtaku_second';
import { Synopsis } from './otaku';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {

  constructor() { }
  Synopsys: Synopsis[] = SYNOPSIS;
  selectedSynopsis!:Synopsis;
  words!: string[][];
  image!: string;
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

}
