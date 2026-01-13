import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pat } from './pat';

describe('Pat', () => {
  let component: Pat;
  let fixture: ComponentFixture<Pat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
