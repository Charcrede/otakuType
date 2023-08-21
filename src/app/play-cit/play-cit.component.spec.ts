import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayCitComponent } from './play-cit.component';

describe('PlayCitComponent', () => {
  let component: PlayCitComponent;
  let fixture: ComponentFixture<PlayCitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayCitComponent]
    });
    fixture = TestBed.createComponent(PlayCitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
