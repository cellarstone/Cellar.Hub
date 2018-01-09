import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenzorBaseInfoComponent } from './base-info.component';

describe('BaseInfoComponent', () => {
  let component: SenzorBaseInfoComponent;
  let fixture: ComponentFixture<SenzorBaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenzorBaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenzorBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
