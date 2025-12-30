import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBatchComponent } from './assign-batch.component';

describe('AssignBatchComponent', () => {
  let component: AssignBatchComponent;
  let fixture: ComponentFixture<AssignBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
