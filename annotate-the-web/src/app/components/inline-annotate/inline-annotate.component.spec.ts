import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineAnnotateComponent } from './inline-annotate.component';

describe('InlineAnnotateComponent', () => {
  let component: InlineAnnotateComponent;
  let fixture: ComponentFixture<InlineAnnotateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineAnnotateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineAnnotateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
