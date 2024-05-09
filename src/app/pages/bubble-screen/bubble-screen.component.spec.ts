import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleScreenComponent } from './bubble-screen.component';

describe('BubbleScreenComponent', () => {
  let component: BubbleScreenComponent;
  let fixture: ComponentFixture<BubbleScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
