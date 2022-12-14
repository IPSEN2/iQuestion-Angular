import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTokenComponent } from './request-token.component';

describe('RequestTokenComponent', () => {
  let component: RequestTokenComponent;
  let fixture: ComponentFixture<RequestTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
