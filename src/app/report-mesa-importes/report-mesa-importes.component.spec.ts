import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMesaImportesComponent } from './report-mesa-importes.component';

describe('ReportMesaImportesComponent', () => {
  let component: ReportMesaImportesComponent;
  let fixture: ComponentFixture<ReportMesaImportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMesaImportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMesaImportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
