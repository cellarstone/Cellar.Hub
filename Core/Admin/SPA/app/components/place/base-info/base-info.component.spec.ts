import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceBaseInfoComponent } from './base-info.component';

describe('BaseInfoComponent', () => {
  let component: PlaceBaseInfoComponent;
  let fixture: ComponentFixture<PlaceBaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceBaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
