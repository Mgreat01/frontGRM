import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rgst } from './rgst';

describe('Rgst', () => {
  let component: Rgst;
  let fixture: ComponentFixture<Rgst>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rgst]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rgst);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
