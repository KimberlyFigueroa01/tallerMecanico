import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionForm } from './notificacion-form';

describe('NotificacionForm', () => {
  let component: NotificacionForm;
  let fixture: ComponentFixture<NotificacionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
