import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateBannerComponent } from './authenticate-banner.component';

describe('AuthenticateBannerComponent', () => {
  let component: AuthenticateBannerComponent;
  let fixture: ComponentFixture<AuthenticateBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticateBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
