import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashad } from './dashad';

describe('Dashad', () => {
  let component: Dashad;
  let fixture: ComponentFixture<Dashad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
