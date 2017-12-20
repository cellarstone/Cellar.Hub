import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowCliComponent } from './cli.component';

describe('WorkflowCliComponent', () => {
  let component: WorkflowCliComponent;
  let fixture: ComponentFixture<WorkflowCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
