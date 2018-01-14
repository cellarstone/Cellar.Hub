import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendtowebsocketComponent } from './sendtowebsocket.component';

describe('SendtowebsocketComponent', () => {
  let component: SendtowebsocketComponent;
  let fixture: ComponentFixture<SendtowebsocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendtowebsocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendtowebsocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
