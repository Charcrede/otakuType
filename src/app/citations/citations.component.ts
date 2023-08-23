import { Component } from '@angular/core';
import { CITATIONS } from '../mockOtaku';
import { Citations } from '../otaku';
import { TypeServiceService } from '../type-service.service';

@Component({
  selector: 'app-citations',
  templateUrl: './citations.component.html',
  styleUrls: ['./citations.component.css']
})
export class CitationsComponent {
  constructor(
    public service : TypeServiceService
  ){}
  citations: Citations[] = CITATIONS;
}
