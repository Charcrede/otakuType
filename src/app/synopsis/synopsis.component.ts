import { Component } from '@angular/core';
import { SYNOPSIS } from '../mockOtaku_second';
import { Synopsis } from '../otaku';
import { TypeServiceService } from '../type-service.service';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.css']
})
export class SynopsisComponent {
  constructor(public service: TypeServiceService){};
  synopsis: Synopsis[] = SYNOPSIS;
}
