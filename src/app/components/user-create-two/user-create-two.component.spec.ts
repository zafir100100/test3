import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateTwoComponent } from './user-create-two.component';

describe('UserCreateTwoComponent', () => {
  let component: UserCreateTwoComponent;
  let fixture: ComponentFixture<UserCreateTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
