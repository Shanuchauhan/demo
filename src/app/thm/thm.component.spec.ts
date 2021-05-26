import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThmComponent } from './thm.component';

describe('ThmComponent', () => {
  let component: ThmComponent;
  let fixture: ComponentFixture<ThmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
