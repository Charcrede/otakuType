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

  ngOnInit() {
    this.inputText = "DES SYNOPSIS ET CITATIONS MANGA POUR TESTER VOTRE VITESSE DE SAISIE"; // Remplacez par votre chaîne de caractères
    // this.startAnimation();
    this.words = this.inputText.split(' ');
    this.opacities = this.words.map(() => 0);

    this.words.forEach((word, index) => {
      setTimeout(() => {
        this.opacities[index] = 1;
        this.space = " ";
      }, index * 700);
    });
  }

}
