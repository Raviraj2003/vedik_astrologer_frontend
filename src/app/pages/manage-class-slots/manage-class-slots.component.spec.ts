import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassSlotsComponent } from './manage-class-slots.component';

describe('ManageClassSlotsComponent', () => {
  let component: ManageClassSlotsComponent;
  let fixture: ComponentFixture<ManageClassSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageClassSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClassSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
