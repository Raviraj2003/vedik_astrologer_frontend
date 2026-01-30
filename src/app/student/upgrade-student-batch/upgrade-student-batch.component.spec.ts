import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeStudentBatchComponent } from './upgrade-student-batch.component';

describe('UpgradeStudentBatchComponent', () => {
  let component: UpgradeStudentBatchComponent;
  let fixture: ComponentFixture<UpgradeStudentBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradeStudentBatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeStudentBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
