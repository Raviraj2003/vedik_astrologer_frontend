import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTopicComponent } from './assign-topic.component';

describe('AssignTopicComponent', () => {
  let component: AssignTopicComponent;
  let fixture: ComponentFixture<AssignTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTopicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
