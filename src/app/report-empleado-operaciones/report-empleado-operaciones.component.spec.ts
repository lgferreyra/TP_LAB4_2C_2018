import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmpleadoOperacionesComponent } from './report-empleado-operaciones.component';

describe('ReportEmpleadoOperacionesComponent', () => {
  let component: ReportEmpleadoOperacionesComponent;
  let fixture: ComponentFixture<ReportEmpleadoOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEmpleadoOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmpleadoOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
