import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMecanicos } from './reporte-mecanicos';

describe('ReporteMecanicos', () => {
  let component: ReporteMecanicos;
  let fixture: ComponentFixture<ReporteMecanicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteMecanicos],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteMecanicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
