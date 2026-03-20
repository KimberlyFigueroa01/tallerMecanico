import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerDetail } from './taller-detail';

describe('TallerDetail', () => {
  let component: TallerDetail;
  let fixture: ComponentFixture<TallerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallerDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(TallerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
