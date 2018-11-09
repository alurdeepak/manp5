import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbineInfoComponent } from './turbine-info.component';

describe('TurbineInfoComponent', () => {
  let component: TurbineInfoComponent;
  let fixture: ComponentFixture<TurbineInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurbineInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurbineInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
