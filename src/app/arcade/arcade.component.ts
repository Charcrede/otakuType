import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypeServiceService } from '../type-service.service';
import { ARCADES } from '../mockOtaku';
import { fromEvent, Observable } from 'rxjs';
@Component({
  selector: 'app-arcade',
  templateUrl: './arcade.component.html',
  styleUrls: ['./arcade.component.css']
})
export class ArcadeComponent implements OnInit{
  constructor(public service: TypeServiceService){}
  ArcadeText: string = ARCADES;
  ArcadeTable!: string[][];
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
 play: boolean = true;
 precision: number = 0;
 typeCount = 0;
 min!:number;
 sec!:number;
 seen: boolean = false;
 activeTimer: number = 0;
 errorsTable: number[] = [];
 container!: HTMLElement;
 recommencer: boolean = false;
 intervalId!: any;
 chrono !:number;
 selectedCitation = this.service.selectedCitation;
 ngOnInit(): void {
  
 }
 @ViewChild('texte') texte !: ElementRef;
 typing() {
   if (this.i < this.ArcadeText.split("").length - 1) {
     this.play = true;
     this.container = this.texte.nativeElement;
     this.textInput = document.getElementById("input");
     if (this.textInput) {
       this.userKeydown = fromEvent<InputEvent>(this.textInput, 'input');
        this.sentence = this.ArcadeTable.flat(1);
        console.log(this.sentence);
        
     }
     this.subscription = this.userKeydown.subscribe((e) => {
       this.activeTimer++;
       this.typeCount++;
       if (this.activeTimer === 1) {
         this.timing(this.chrono);
       }
       let newTabSentence = this.entered.split("");
       if (e.inputType === 'insertText') {
         if (this.i <= this.sentence.length) {
           if (this.sentence[this.i] === newTabSentence[this.i]) {
             this.spans[this.i].classList.add("success")
             this.spans[this.i].classList.remove("lose");
             this.errorsTable = [];
             console.log(this.sentence);
             console.log(newTabSentence);
             
             
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
       let sensLettersLength = this.ArcadeText.split("").length;
       this.precision = Math.floor(((sensLettersLength - this.errorsCount) / sensLettersLength) * 100);
       this.subscription.unsubscribe();
       if (newTabSentence.length === this.ArcadeText.length - 1) {
         clearInterval(this.intervalId)
       }
     })
   }
 }
 selectTime(time:number){
  this.chrono = time;
  this.ArcadeTable = this.service.aleatoire(this.ArcadeText);
  setTimeout(() => {
    this.spans = document.querySelectorAll(".lettre");
    this.typing();
    this.textInput?.focus();
  }, 100);
 }
 timing(num:number) {
   this.min = num-1;
   this.sec = 60;
   this.intervalId = setInterval(() => {
     if (this.i > 6 && this.typeCount > this.errorsCount) {
       this.speed = Math.ceil((this.typeCount - (this.errorsCount * 4)) / (this.count / 10));
       if (this.speed < 0) {
         this.speed = 0;
       } else {
         this.speed = this.speed;
       }
     }
    if (this.min >= 0 && this.sec > 0) {
      this.sec--;
      if (this.sec === 0 && this.min>0) {
        this.min--;
        this.sec = 59;
      }
    }else{
      this.count = 0
    }
     this.time = `${this.double(this.min)}:${this.double(this.sec)}`
   }, 1000);
 }
 double(num: number): string {
   if (num > 9) {
     return num.toString();
   } else {
     return `0${num}`
   }
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

}
