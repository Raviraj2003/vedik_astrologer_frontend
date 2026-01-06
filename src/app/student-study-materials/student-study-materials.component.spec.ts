import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStudyMaterialsComponent } from './student-study-materials.component';

describe('StudentStudyMaterialsComponent', () => {
  let component: StudentStudyMaterialsComponent;
  let fixture: ComponentFixture<StudentStudyMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentStudyMaterialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStudyMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
