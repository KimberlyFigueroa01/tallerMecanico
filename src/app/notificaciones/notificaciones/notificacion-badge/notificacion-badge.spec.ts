import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionBadge } from './notificacion-badge';

describe('NotificacionBadge', () => {
  let component: NotificacionBadge;
  let fixture: ComponentFixture<NotificacionBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacionBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
