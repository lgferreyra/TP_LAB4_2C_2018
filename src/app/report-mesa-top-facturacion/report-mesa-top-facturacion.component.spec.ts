import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMesaTopFacturacionComponent } from './report-mesa-top-facturacion.component';

describe('ReportMesaTopFacturacionComponent', () => {
  let component: ReportMesaTopFacturacionComponent;
  let fixture: ComponentFixture<ReportMesaTopFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMesaTopFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMesaTopFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
