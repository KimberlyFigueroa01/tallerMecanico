import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDiagnostico } from './orden-diagnostico';

describe('OrdenDiagnostico', () => {
  let component: OrdenDiagnostico;
  let fixture: ComponentFixture<OrdenDiagnostico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenDiagnostico],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenDiagnostico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
