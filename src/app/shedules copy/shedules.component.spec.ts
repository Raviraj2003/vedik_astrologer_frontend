import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulesComponent } from './shedules.component';

describe('ShedulesComponent', () => {
  let component: ShedulesComponent;
  let fixture: ComponentFixture<ShedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
