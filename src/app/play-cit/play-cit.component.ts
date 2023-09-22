import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { TypeServiceService } from '../type-service.service';

@Component({
  selector: 'app-play-cit',
  templateUrl: './play-cit.component.html',
  styleUrls: ['./play-cit.component.css']
})
export class PlayCitComponent implements OnInit {
  sentence!: string[];
  entered!: string;
  i: number = 0;
  autoPause: number = 0;
  count: number = 0;
  u: number = 0;
  seeInput = true;
  errorsCount: number = 0;
  spans!: any;
  lose: boolean = false;
  success: boolean = false;
  textInput!: HTMLElement | null;
  userKeydown!: Observable<InputEvent>;
  subscription!: any;
  speed: number = 0;
  time: string = "00:00";
  play: boolean = true;
  precision: number = 0;
  typeCount = 0;
  seen: boolean = false;
  activeTimer: number = 0;
  errorsTable: number[] = [];
  container!: HTMLElement;
  recommencer: boolean = false;
  intervalId!: any;
  // errorsTable : number[] = [];
  // container!: HTMLElement;
  // recommencer: boolean = false;
  selectedCitation = this.service.selectedCitation;
  constructor(public service: TypeServiceService) { }
  ngOnInit(): void {
    this.service.verifyCit();
    this.selectedCitation = this.service.selectedCitation;
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
      this.typing();
      this.textInput?.focus();
    }, 100);
  }
  @ViewChild('texte') texte !: ElementRef;
  typing() {
    if (this.i < this.selectedCitation.text.split("").length - 1) {
      this.play = true;
      this.autoPause = 0;
      this.container = this.texte.nativeElement;
      this.textInput = document.getElementById("input");
      if (this.textInput && this.selectedCitation) {
        this.userKeydown = fromEvent<InputEvent>(this.textInput, 'input');
        this.sentence = this.selectedCitation.text.split("");
      }
      this.subscription = this.userKeydown.subscribe((e) => {
        this.activeTimer++;
        this.typeCount++;
        if (this.activeTimer === 1) {
          this.timing();
        }
        let newTabSentence = this.entered.split("");
        if (e.inputType === 'insertText') {
          if (this.i <= this.sentence.length) {
            if (this.sentence[this.i] === newTabSentence[this.i]) {
              this.spans[this.i].classList.add("success")
              this.spans[this.i].classList.remove("lose");
              this.errorsTable = [];
            } else {
              this.spans[this.i].classList.add("lose", "retry")
              this.spans[this.i].classList.remove("success")
              this.errorsCount++;
              this.errorsTable.push(this.errorsCount);
              if (this.errorsTable.length >= 15) {
                this.recommencer = true;
              }
            }

            if (this.u > 0) {
              this.spans[this.u].classList.remove("current");
            }
            this.i++;
            this.u++;

          }
          if ((this.spans[this.i].offsetTop + ((this.spans[this.i].offsetHeight * 2)) > this.container.offsetHeight) && this.spans[this.i].offsetTop > this.spans[this.i - 1].offsetTop) {
            this.container.scrollTop = this.container.scrollTop + this.spans[this.i].offsetHeight + 25;
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
        let sensLettersLength = this.selectedCitation.text.split("").length;
        this.precision = Math.floor(((sensLettersLength - this.errorsCount) / sensLettersLength) * 100);
        this.subscription.unsubscribe();
        if (newTabSentence.length >= this.selectedCitation.text.length) {
          clearInterval(this.intervalId);
          this.seeInput = false;
      }
      })
    }else{this.seeInput = false}
  }
  timing() {
    let min: number;
    let sec: number;
    this.intervalId = setInterval(() => {
      this.autoPause++;
      if (this.i > 4) {
        this.speed = Math.ceil( (this.entered.split("").length * 60) / (this.count * 5));
        if (this.speed < 0) {
          this.speed = 0;
        } else {
          this.speed = this.speed;
        }
      }
      if (this.autoPause >= 5) {
        this.pause();
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
  restart() {
    clearInterval(this.intervalId);
    this.errorsTable = [];
    this.container.scrollTop = 0;
    this.speed = 0;
    this.precision = 0;
    this.i = 0;
    this.u = 0;
    this.entered = "";
    this.errorsCount = 0;
    this.seeInput = true;
    this.count = 0;
    this.typeCount =0;
    this.subscription.unsubscribe();
    this.service.verifyCit();
    this.selectedCitation = this.service.selectedCitation;
    this.recommencer = false;
    this.play = true;
    this.activeTimer = 0;
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
      this.typing();
      this.textInput?.focus();
    }, 100);
  }
  commencer() {
    clearInterval(this.intervalId);
    this.errorsTable = [];
    this.play = true;
    this.container.scrollTop = 0;
    this.speed = 0;
    this.precision = 0;
    this.i = 0;
    this.u = 0;
    this.entered = "";
    this.errorsCount = 0;
    this.seeInput = true;
    this.count = 0;
    this.typeCount = 0;
    this.subscription.unsubscribe();
    this.service.verifyCit();
    this.selectedCitation = this.service.selectedCitation;
    this.recommencer = false;
    this.activeTimer = 0;
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
      this.textInput?.focus();
    }, 100);
  }
  pause() {
    if (this.i < this.selectedCitation.text.split("").length - 1) {
      clearInterval(this.intervalId);
      this.activeTimer = 0;
      this.textInput?.focus();
      this.play = false;
    }
  }
}
