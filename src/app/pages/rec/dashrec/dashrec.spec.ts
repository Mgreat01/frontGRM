import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashrec } from './dashrec';

describe('Dashrec', () => {
  let component: Dashrec;
  let fixture: ComponentFixture<Dashrec>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashrec]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashrec);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
