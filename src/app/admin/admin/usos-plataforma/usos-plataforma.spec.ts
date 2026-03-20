import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsosPlataforma } from './usos-plataforma';

describe('UsosPlataforma', () => {
  let component: UsosPlataforma;
  let fixture: ComponentFixture<UsosPlataforma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsosPlataforma],
    }).compileComponents();

    fixture = TestBed.createComponent(UsosPlataforma);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
