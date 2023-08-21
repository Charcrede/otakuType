import { Component } from '@angular/core';
import { TypeServiceService } from '../type-service.service';

@Component({
  selector: 'app-play-synop',
  templateUrl: './play-synop.component.html',
  styleUrls: ['./play-synop.component.css']
})
export class PlaySynopComponent {
  constructor(public service: TypeServiceService){};
  
  // letters: string[] = this.service.selectedSynopsis.texte?.split(" ");
}
