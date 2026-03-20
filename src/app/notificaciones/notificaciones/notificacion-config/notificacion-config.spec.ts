import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionConfig } from './notificacion-config';

describe('NotificacionConfig', () => {
  let component: NotificacionConfig;
  let fixture: ComponentFixture<NotificacionConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
