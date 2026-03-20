import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTaller } from './register-taller';

describe('RegisterTaller', () => {
  let component: RegisterTaller;
  let fixture: ComponentFixture<RegisterTaller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterTaller],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterTaller);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
