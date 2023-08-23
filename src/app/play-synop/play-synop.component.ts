import { Component, OnInit } from '@angular/core';
import { TypeServiceService } from '../type-service.service';
import { NgModel, NgForm } from '@angular/forms';
import { keyframes } from '@angular/animations';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-play-synop',
  templateUrl: './play-synop.component.html',
  styleUrls: ['./play-synop.component.css']
})
export class PlaySynopComponent implements OnInit {
  sentence!: string[];
  entered!: string;
  i: number = 0;
  u: number = 0;
  errorsCount: number = 0;
  spans!: any;
  lose: boolean = false;
  success: boolean = false;
  selectedSynopsis = this.service.selectedSynopsis;
  constructor(public service: TypeServiceService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
    }, 1000);
  }
  ;
  typing() {
    let textInput: HTMLElement | null = document.getElementById("input");
    this.sentence = this.selectedSynopsis.texte.split("");
    let userKeyDown = fromEvent<InputEvent>(textInput!, 'input');
    userKeyDown.subscribe((e) => {
      console.log(e);
      
      if (e.data) {
        let newTabSentence = this.entered.split("");
        if (this.i <= this.sentence.length) {
        if (this.sentence[this.i] === newTabSentence[this.i]) {
          this.spans[this.i].classList.add("success")
          this.spans[this.i].classList.remove("lose")
        } else {
          this.spans[this.i].classList.add("lose", "retry")
          this.spans[this.i].classList.remove("success")
          this.errorsCount++;
        }

        if (this.u > 0) {
          this.spans[this.u].classList.remove("current");
        }
        this.i++;
        this.u++;
      }
      this.spans[this.u].classList.add("current");
    }
  })

  }
  delete() {
    this.u--;
    this.i--;
    this.spans[this.u].classList.add("current");
    this.spans[this.u + 1].classList.remove("current");
    this.spans[this.u + 2].classList.remove("current");
    this.spans[this.i].classList.remove("success");
    this.spans[this.i].classList.remove("lose");
  }
  // letters: string[] = this.service.selectedSynopsis.texte?.split(" ");
}
