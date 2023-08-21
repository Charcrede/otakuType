import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySynopComponent } from './play-synop.component';

describe('PlaySynopComponent', () => {
  let component: PlaySynopComponent;
  let fixture: ComponentFixture<PlaySynopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaySynopComponent]
    });
    fixture = TestBed.createComponent(PlaySynopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
