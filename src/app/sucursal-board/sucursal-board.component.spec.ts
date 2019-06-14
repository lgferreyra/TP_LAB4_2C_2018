import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalBoardComponent } from './sucursal-board.component';

describe('SucursalBoardComponent', () => {
  let component: SucursalBoardComponent;
  let fixture: ComponentFixture<SucursalBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
