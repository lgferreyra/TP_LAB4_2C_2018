import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMesaFacturacionComponent } from './report-mesa-facturacion.component';

describe('ReportMesaFacturacionComponent', () => {
  let component: ReportMesaFacturacionComponent;
  let fixture: ComponentFixture<ReportMesaFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMesaFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMesaFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
