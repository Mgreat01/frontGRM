import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashmdc } from './dashmdc';

describe('Dashmdc', () => {
  let component: Dashmdc;
  let fixture: ComponentFixture<Dashmdc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashmdc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashmdc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
