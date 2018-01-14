import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetoprometheusComponent } from './savetoprometheus.component';

describe('SavetoprometheusComponent', () => {
  let component: SavetoprometheusComponent;
  let fixture: ComponentFixture<SavetoprometheusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavetoprometheusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavetoprometheusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
