import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmptyComponent } from './main-empty.component';

describe('MainEmptyComponent', () => {
  let component: MainEmptyComponent;
  let fixture: ComponentFixture<MainEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
