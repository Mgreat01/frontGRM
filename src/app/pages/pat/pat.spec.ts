import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRdvComponent } from './pat';

describe('Pat', () => {
  let component: PatientRdvComponent;
  let fixture: ComponentFixture<PatientRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRdvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
