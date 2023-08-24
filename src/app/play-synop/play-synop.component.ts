import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypeServiceService } from '../type-service.service';
import { NgModel, NgForm, ControlContainer } from '@angular/forms';
import { keyframes } from '@angular/animations';
import { fromEvent, Observable, TimeoutConfig } from 'rxjs';

@Component({
  selector: 'app-play-synop',
  templateUrl: './play-synop.component.html',
  styleUrls: ['./play-synop.component.css']
})
export class PlaySynopComponent implements OnInit {
  sentence!: string[];
  entered!: string;
  i: number = 0;
  count: number = 0;
  u: number = 0;
  errorsCount: number = 0;
  spans!: any;
  lose: boolean = false;
  success: boolean = false;
  textInput!: HTMLElement | null;
  userKeydown!: Observable<InputEvent>;
  subscription!: any;
  speed: number = 0;
  time: string = "00:00";
  precision: number = 0;
  typeCount = 0;
  intervalId!: any;
  selectedSynopsis = this.service.selectedSynopsis;
  constructor(public service: TypeServiceService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
      this.typing();
    }, 100);
  }
  @ViewChild('texte') texte !: ElementRef;
  typing() {
    if (this.i < this.selectedSynopsis.texte.split("").length-1) {
      const container = this.texte.nativeElement;
      this.textInput = document.getElementById("input");
      if (this.textInput && this.selectedSynopsis) {
        this.userKeydown = fromEvent<InputEvent>(this.textInput, 'input');
        this.sentence = this.selectedSynopsis.texte.split("");
      }
      this.subscription = this.userKeydown.subscribe((e) => {
        this.typeCount++
        if (this.typeCount === 1) {
          this.timing();
        }
        let newTabSentence = this.entered.split("");
        if (e.inputType === 'insertText') {
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
          if ((this.spans[this.i].offsetTop + ((this.spans[this.i].offsetHeight * 2)) > container.offsetHeight) && this.spans[this.i].offsetTop > this.spans[this.i - 1].offsetTop) {
            container.scrollTop = container.scrollTop + this.spans[this.i].offsetHeight + 25;
            console.log(container.scrollTop);
            console.log(this.spans[this.i].offsetHeight + 25);
            
          }
          this.spans[this.u].classList.add("current");
        }
        else if (e.inputType === 'deleteContentBackward') {
          if (this.i > 0 && this.u > 0) {
            this.u--;
            this.i--;
            this.spans[this.u].classList.add("current");
            this.spans[this.u + 1].classList.remove("current");
            this.spans[this.i].classList.remove("success");
            this.spans[this.i].classList.remove("lose");
          }
        }
        let sensLettersLength = this.selectedSynopsis.texte.split("").length;
        let entersWordsLength = this.entered.split("").length;
        this.precision = Math.floor(((sensLettersLength - this.errorsCount) / sensLettersLength) * 100);
        this.subscription.unsubscribe();
        if (newTabSentence.length === this.selectedSynopsis.texte.length - 1) {
          clearInterval(this.intervalId)
        }
      })
    }
  }
  timing() {
    let min: number;
    let sec: number;
    this.intervalId = setInterval(() => {
      if (this.i > 6 && this.typeCount > this.errorsCount) {
        this.speed = Math.ceil((this.typeCount - (this.errorsCount * 4)) / (this.count / 10));
      }
      else{
        this.speed = 0;
      }
      this.count++;
      sec = this.count - min * 60;
      min = Math.floor(this.count / 60);
      this.time = `${this.double(min)}:${this.double(sec)}`
    }, 1000);
  }
  double(num: number): string {
    if (num > 9) {
      return num.toString();
    } else {
      return `0${num}`
    }
  }
}
