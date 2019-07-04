import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMesaComentariosComponent } from './report-mesa-comentarios.component';

describe('ReportMesaComentariosComponent', () => {
  let component: ReportMesaComentariosComponent;
  let fixture: ComponentFixture<ReportMesaComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMesaComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMesaComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
