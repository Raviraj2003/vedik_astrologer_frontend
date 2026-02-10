import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCertificateComponent } from './upload-certificate.component';

describe('UploadCertificateComponent', () => {
  let component: UploadCertificateComponent;
  let fixture: ComponentFixture<UploadCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
