import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoHistorial } from './vehiculo-historial';

describe('VehiculoHistorial', () => {
  let component: VehiculoHistorial;
  let fixture: ComponentFixture<VehiculoHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoHistorial],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoHistorial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
