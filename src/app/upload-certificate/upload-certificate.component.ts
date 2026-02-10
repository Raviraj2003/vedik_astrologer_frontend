import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-upload-certificate",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./upload-certificate.component.html",
  styleUrl: "./upload-certificate.component.css",
})
export class UploadCertificateComponent implements OnInit {
  // ===============================
  // STATE
  // ===============================

  students: any[] = [];
  selectedStudentCode: string = "";

  certificateNo = "";
  courseName = "";
  batchCode = ""; // 🔒 hidden from UI, used internally
  selectedFile: File | null = null;

  uploadedCertificateId: string | null = null;
  loading = false;
  message = "";

  // NEW: Add this property for modal
  showSuccessModal = false;

  constructor(private api: ApiService) {}

  // ===============================
  // INIT
  // ===============================

  ngOnInit(): void {
    this.fetchStudents();
  }

  // ===============================
  // FETCH ALL STUDENTS
  // ===============================

  fetchStudents(): void {
    this.api.getAllStudents().subscribe({
      next: (res) => {
        if (res.success) {
          this.students = res.data || res.students || [];
        }
      },
      error: () => {
        this.message = "Failed to load students";
      },
    });
  }

  // ===============================
  // STUDENT CHANGE → AUTO BATCH
  // ===============================

  onStudentChange(): void {
    // NEW: Reset form when student changes
    this.resetForm();

    const selectedStudent = this.students.find(
      (s) => s.user_code === this.selectedStudentCode,
    );

    if (!selectedStudent) {
      this.batchCode = "";
      return;
    }

    if (!selectedStudent.batch_code) {
      this.batchCode = "";
      this.message = "⚠️ Selected student is not assigned to any batch";
      return;
    }

    this.batchCode = selectedStudent.batch_code;
    this.message = "";
  }

  // ===============================
  // FILE SELECT
  // ===============================

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // ===============================
  // UPLOAD CERTIFICATE
  // ===============================

  uploadCertificate(): void {
    if (
      !this.selectedStudentCode ||
      !this.certificateNo ||
      !this.selectedFile
    ) {
      this.message = "Please fill all required fields";
      return;
    }

    if (!this.batchCode) {
      this.message = "Selected student has no batch assigned";
      return;
    }

    const formData = new FormData();
    formData.append("user_code", this.selectedStudentCode);
    formData.append("certificate_no", this.certificateNo);
    formData.append("course_name", this.courseName);
    formData.append("batch_code", this.batchCode); // 🔒 internal only
    formData.append("file", this.selectedFile);

    this.loading = true;
    this.message = "";

    this.api.uploadStudentCertificate(formData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.uploadedCertificateId = res.certificate_id;
          this.message = "Certificate uploaded successfully";
        } else {
          this.message = res.message || "Upload failed";
        }
      },
      error: () => {
        this.loading = false;
        this.message = "Upload failed";
      },
    });
  }

  // ===============================
  // PUBLISH CERTIFICATE
  // ===============================

  publishCertificate(): void {
    if (!this.uploadedCertificateId) return;

    this.loading = true;
    this.message = "";

    this.api.publishStudentCertificate(this.uploadedCertificateId).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          // NEW: Show success modal instead of just message
          this.showSuccessModal = true;
          // Keep the existing message for backward compatibility
          this.message = "Certificate published successfully";
        } else {
          this.message = res.message || "Publish failed";
        }
      },
      error: () => {
        this.loading = false;
        this.message = "Publish failed";
      },
    });
  }

  clearMessage() {
    this.message = "";
  }

  // ===============================
  // NEW METHODS FOR MODAL & FORM RESET
  // ===============================

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  resetForm(): void {
    // Clear form fields
    this.certificateNo = "";
    this.courseName = "";
    this.selectedFile = null;
    this.uploadedCertificateId = null;
    this.message = "";

    // Clear file input if exists
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }

  // Optional: Method to close modal and reset form
  closeModalAndReset(): void {
    this.showSuccessModal = false;
    this.resetForm();
  }
}
