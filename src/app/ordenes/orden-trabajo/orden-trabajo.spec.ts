import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTrabajo } from './orden-trabajo';

describe('OrdenTrabajo', () => {
  let component: OrdenTrabajo;
  let fixture: ComponentFixture<OrdenTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenTrabajo],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
