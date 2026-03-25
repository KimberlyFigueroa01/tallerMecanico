import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesList } from './notificaciones-list';

describe('NotificacionesList', () => {
  let component: NotificacionesList;
  let fixture: ComponentFixture<NotificacionesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionesList],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
