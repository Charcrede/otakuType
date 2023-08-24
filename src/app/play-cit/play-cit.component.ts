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
  u: number = 0;
  errorsCount: number = 0;
  spans!: any;
  lose: boolean = false;
  success: boolean = false;
  textInput!: HTMLElement | null;
  userKeydown!: Observable<InputEvent>;
  subscription!: any;
  selectedCitation = this.service.selectedCitation;
  // selectedCitation = this.service.selectedCitation;
  constructor(public service: TypeServiceService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.spans = document.querySelectorAll(".lettre");
      this.typing();
    }, 100);
  }
  @ViewChild('texte') text !: ElementRef;
  typing() {
    const container = this.text.nativeElement;
    this.textInput = document.getElementById("input");
    if (this.textInput && this.selectedCitation) {
      this.userKeydown = fromEvent<InputEvent>(this.textInput, 'input');
      this.sentence = this.selectedCitation.text.split("");
    }
    this.subscription = this.userKeydown.subscribe((e) => {
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
          container.scrollTop = container.scrollTop + this.spans[this.i].offsetHeight + 25.75;
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
}
