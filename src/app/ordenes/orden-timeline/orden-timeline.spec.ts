import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenTimeline } from './orden-timeline';

describe('OrdenTimeline', () => {
  let component: OrdenTimeline;
  let fixture: ComponentFixture<OrdenTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
