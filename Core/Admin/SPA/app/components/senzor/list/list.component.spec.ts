import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenzorListComponent } from './list.component';

describe('ListComponent', () => {
  let component: SenzorListComponent;
  let fixture: ComponentFixture<SenzorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenzorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenzorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
