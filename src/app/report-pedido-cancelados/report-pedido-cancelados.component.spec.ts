import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPedidoCanceladosComponent } from './report-pedido-cancelados.component';

describe('ReportPedidoCanceladosComponent', () => {
  let component: ReportPedidoCanceladosComponent;
  let fixture: ComponentFixture<ReportPedidoCanceladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPedidoCanceladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPedidoCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
