import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetail } from './orden-detail';

describe('OrdenDetail', () => {
  let component: OrdenDetail;
  let fixture: ComponentFixture<OrdenDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdenDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
