import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmpleadoIngresosComponent } from './report-empleado-ingresos.component';

describe('ReportEmpleadoIngresosComponent', () => {
  let component: ReportEmpleadoIngresosComponent;
  let fixture: ComponentFixture<ReportEmpleadoIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEmpleadoIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmpleadoIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
