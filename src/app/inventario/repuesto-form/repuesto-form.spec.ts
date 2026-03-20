import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepuestoForm } from './repuesto-form';

describe('RepuestoForm', () => {
  let component: RepuestoForm;
  let fixture: ComponentFixture<RepuestoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepuestoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RepuestoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
