import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSupportedNewComponent } from './not-supported-new.component';

describe('NotSupportedNewComponent', () => {
  let component: NotSupportedNewComponent;
  let fixture: ComponentFixture<NotSupportedNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotSupportedNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotSupportedNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
