import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPedidoDemoradosComponent } from './report-pedido-demorados.component';

describe('ReportPedidoDemoradosComponent', () => {
  let component: ReportPedidoDemoradosComponent;
  let fixture: ComponentFixture<ReportPedidoDemoradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPedidoDemoradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPedidoDemoradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
