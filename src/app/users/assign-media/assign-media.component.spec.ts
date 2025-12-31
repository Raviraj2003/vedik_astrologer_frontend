import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMediaComponent } from './assign-media.component';

describe('AssignMediaComponent', () => {
  let component: AssignMediaComponent;
  let fixture: ComponentFixture<AssignMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignMediaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
