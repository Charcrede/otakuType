import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TypeServiceService } from '../type-service.service';
import { NgModel, NgForm, ControlContainer } from '@angular/forms';
import { keyframes } from '@angular/animations';
import { fromEvent, Observable, TimeoutConfig } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-play-synop',
    templateUrl: './play-synop.component.html',
    styleUrls: ['./play-synop.component.css']
})
export class PlaySynopComponent implements OnInit, AfterViewInit {
    sentence!: string[];
    entered!: string;
    i: number = 0;
    count: number = 0;
    u: number = 0;
    errorsCount: number = 0;
    spans!: any;
    selectInput: boolean = false;
    recommencer: boolean = false;
    lose: boolean = false;
    autoPause: number = 0;
    success: boolean = false;
    play: boolean = true;
    textInput!: HTMLElement | null;
    userKeydown!: Observable<InputEvent>;
    subscription!: any;
    speed: number = 0;
    errorsTable: number[] = [];
    time: string = "00:00";
    precision: number = 0;
    container!: HTMLElement;
    typeCount = 0;
    intervalId!: any;
    seeInput = true;
    selectedSynopsis = this.service.selectedSynopsis;
    activeTimer: number = 0;
    constructor(public service: TypeServiceService) { }
    ngOnInit(): void {
        this.service.verifySynop();
        this.selectedSynopsis = this.service.selectedSynopsis;
        this.recommencer = false;
        setTimeout(() => {
            this.spans = document.querySelectorAll(".lettre");
            this.typing();
            this.textInput?.focus();
        }, 100);
    }
    dir() {
        console.dir(this.textInput)
    }
    ngAfterViewInit() {
        this.textInput?.focus();
    }
    @ViewChild('texte') texte !: ElementRef;
    typing() {
        // if (this.i < this.selectedSynopsis.texte.split("").length-100) {
        this.play = true;
        this.autoPause = 0;
        this.container = this.texte.nativeElement;
        this.textInput = document.getElementById("input");
        if (this.textInput && this.selectedSynopsis) {
            this.userKeydown = fromEvent<InputEvent>(this.textInput, 'input');
            this.sentence = this.selectedSynopsis.texte.split("");
        }
        this.subscription = this.userKeydown.subscribe((e) => {
            this.typeCount++;
            this.activeTimer++;
            if (this.activeTimer === 1) {
                this.timing();
            }
            let newTabSentence = this.entered.split("");
            if (e.inputType === 'insertText') {
                if (this.i <= this.sentence.length) {
                    if (this.sentence[this.i] === newTabSentence[this.i]) {
                        this.errorsTable = [];
                        this.spans[this.i].classList.add("success")
                        this.spans[this.i].classList.remove("lose")
                    } else {
                        this.spans[this.i].classList.add("lose", "retry")
                        this.spans[this.i].classList.remove("success")
                        this.errorsCount++;
                        this.errorsTable.push(this.errorsCount);
                        if (this.errorsTable.length >= 15) {
                            this.recommencer = true;
                            clearInterval(this.intervalId);
                        }
                    }

                    if (this.u > 0) {
                        this.spans[this.u].classList.remove("current");
                    }
                    this.i++;
                    this.u++;

                }
                if ((this.spans[this.i].offsetTop + ((this.spans[this.i].offsetHeight) * 2) > this.container.offsetHeight) && this.spans[this.i].offsetTop > this.spans[this.i - 1].offsetTop) {
                    this.container.scrollTop = this.container.scrollTop + this.spans[this.i].offsetHeight + 22;

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
            this.precision = Math.floor(((sensLettersLength - this.errorsCount) / sensLettersLength) * 100);
            this.subscription.unsubscribe();
            if (newTabSentence.length >= this.selectedSynopsis.texte.length) {
                clearInterval(this.intervalId);
                this.seeInput = false;
                // this.recommencer = true;
            }
        })
        // }else{this.seeInput =false}
    }
    timing() {
        let min: number;
        let sec: number;
        this.intervalId = setInterval(() => {
        if (this.i > 4) {
            this.speed = Math.ceil( (this.entered.split("").length * 60) / (this.count * 5));
            if (this.speed < 0) {
                this.speed = 0;
            } else {
                this.speed = this.speed;
            }
        }
            this.count++;
            this.autoPause++;
            if (this.autoPause >= 5) {
                this.pause();
            }
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
        this.errorsTable = [];
        this.container.scrollTop = 0;
        this.speed = 0;
        this.precision = 0;
        this.i = 0;
        this.selectedSynopsis = this.service.selectedSynopsis;
        this.activeTimer = 0;
        this.u = 0;
        this.entered = "";
        this.errorsCount = 0;
        this.seeInput = true;
        this.count = 0;
        this.typeCount = 0;
        this.subscription.unsubscribe();
        this.service.verifySynop();
        this.selectedSynopsis = this.service.selectedSynopsis;
        this.recommencer = false;
        this.play = true;
        setTimeout(() => {
            this.spans = document.querySelectorAll(".lettre");
            this.typing();
            this.textInput?.focus();
        }, 100);
    }
    commencer() {
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
        this.typeCount = 0;
        this.subscription.unsubscribe();
        this.service.verifySynop();
        this.selectedSynopsis = this.service.selectedSynopsis;
        this.recommencer = false;
        this.play = true;
        this.activeTimer = 0;
        setTimeout(() => {
            this.spans = document.querySelectorAll(".lettre");
            this.textInput?.focus();
        }, 75);
    }
    pause() {
        if (this.i < this.selectedSynopsis.texte.split("").length - 1) {
            clearInterval(this.intervalId);
            this.activeTimer = 0;
            this.textInput?.focus();
            this.play = false;
        }
    }
}
