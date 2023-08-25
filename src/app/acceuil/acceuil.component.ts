import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  words: string[] = [];
  opacities: number[] = [];
  inputText!: string ;
  space !: string ;
  letters : string[][] = [];
  letter !: string[];
  finalLetter !: string;
  opacities1: number[] = [];

  ngOnInit() {
    this.inputText = "DES SYNOPSIS ET CITATIONS MANGA POUR TESTER VOTRE VITESSE DE SAISIE"; // Remplacez par votre chaîne de caractères
    // this.startAnimation();
    this.words = this.inputText.split(' ');
    for (let i = 0; i < this.words.length; i++) {
      this.letters.push(this.words[i].split(""))
    }
    this.opacities = this.words.map(() => 0);
    this.opacities1 = this.words.map(() => 0);
   

    this.words.forEach((letters, index) => {
      setTimeout(() => {
        this.opacities[index] = 1;
      }, index * 600);
    });

    this.letters.forEach((letter, i)=>{
      setTimeout(() => {
        this.opacities1[i] = 1;
      }, 600);
    })

   
  }
}