import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecteurCedCommissionComponent } from './directeur-ced-commission.component';

describe('DirecteurCedCommissionComponent', () => {
  let component: DirecteurCedCommissionComponent;
  let fixture: ComponentFixture<DirecteurCedCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirecteurCedCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirecteurCedCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
