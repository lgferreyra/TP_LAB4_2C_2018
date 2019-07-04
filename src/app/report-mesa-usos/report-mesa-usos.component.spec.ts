import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMesaUsosComponent } from './report-mesa-usos.component';

describe('ReportMesaUsosComponent', () => {
  let component: ReportMesaUsosComponent;
  let fixture: ComponentFixture<ReportMesaUsosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMesaUsosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMesaUsosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
