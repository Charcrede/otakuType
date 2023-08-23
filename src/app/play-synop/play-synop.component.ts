import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypeServiceService } from '../type-service.service';
import { NgModel, NgForm, ControlContainer } from '@angular/forms';
import { keyframes } from '@angular/animations';
import { fromEvent, Observable } from 'rxjs';

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
  textInput!: HTMLElement | null;
  userKeydown!:Observable<InputEvent>;
  subscription!:any;
  selectedSynopsis = this.service.selectedSynopsis;
  constructor(public service: TypeServiceService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
        this.typing();
    }, 100);
  }
  @ViewChild('texte') texte !: ElementRef;
 
    scrollToBottom() {
        const container = this.texte.nativeElement;
        container.scrollTop+=10;
        console.log(container.scrollTop);
        console.log(container.scrollHeight);
    }
    typing() {
      const container = this.texte.nativeElement;
      this.textInput = document.getElementById("input");
      if (this.textInput && this.selectedSynopsis) {
        this.userKeydown = fromEvent<InputEvent>(this.textInput, 'input');
      this.sentence = this.selectedSynopsis.texte.split("");
    }
    this.subscription = this.userKeydown.subscribe((e) => {
      let newTabSentence = this.entered.split("");
      if (e.inputType ==='insertText') {
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
        if (this.spans[this.i].offsetTop+this.spans[this.i].offsetHeight > container.offsetHeight) {
          container.scrollTop = this.spans[this.i].offsetHeight;
          console.log(container.scrollTop + "scroll top");
          console.log(this.spans[this.i].offsetTop + "offset top");
          
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
      this.subscription.unsubscribe();
    })
  }
  // delete() {
    typingTry(){
      
    }
  // }
  // letters: string[] = this.service.selectedSynopsis.texte?.split(" ");
}
