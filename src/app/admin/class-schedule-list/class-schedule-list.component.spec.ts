import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassScheduleListComponent } from './class-schedule-list.component';

describe('ClassScheduleListComponent', () => {
  let component: ClassScheduleListComponent;
  let fixture: ComponentFixture<ClassScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassScheduleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
