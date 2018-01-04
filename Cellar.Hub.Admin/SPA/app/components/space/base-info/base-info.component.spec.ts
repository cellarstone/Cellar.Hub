import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceBaseInfoComponent } from './base-info.component';

describe('SpaceBaseInfoComponent', () => {
  let component: SpaceBaseInfoComponent;
  let fixture: ComponentFixture<SpaceBaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceBaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
