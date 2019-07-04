import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPedidoVentasComponent } from './report-pedido-ventas.component';

describe('ReportPedidoVentasComponent', () => {
  let component: ReportPedidoVentasComponent;
  let fixture: ComponentFixture<ReportPedidoVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPedidoVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPedidoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
