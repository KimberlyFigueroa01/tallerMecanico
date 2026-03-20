import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalleresList } from './talleres-list';

describe('TalleresList', () => {
  let component: TalleresList;
  let fixture: ComponentFixture<TalleresList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalleresList],
    }).compileComponents();

    fixture = TestBed.createComponent(TalleresList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
