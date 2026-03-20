import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenRepuestos } from './orden-repuestos';

describe('OrdenRepuestos', () => {
  let component: OrdenRepuestos;
  let fixture: ComponentFixture<OrdenRepuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenRepuestos],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenRepuestos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
