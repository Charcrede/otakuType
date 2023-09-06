import { Component, OnInit } from '@angular/core';
import { TypeServiceService } from '../type-service.service';
import { ARCADES } from '../mockOtaku';
@Component({
  selector: 'app-arcade',
  templateUrl: './arcade.component.html',
  styleUrls: ['./arcade.component.css']
})
export class ArcadeComponent implements OnInit{
  constructor(public service: TypeServiceService){}
  ArcadeText: string = ARCADES;
  ArcadeTable!: string[][];
  ngOnInit(): void {
    // this.ArcadeTable = this.service.displayArcade();
    // console.log(this.ArcadeTable);
    this.ArcadeTable = this.service.aleatoire(this.ArcadeText);
  }

}
