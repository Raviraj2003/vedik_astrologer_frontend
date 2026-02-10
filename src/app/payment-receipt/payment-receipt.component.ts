import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-payment-receipt",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./payment-receipt.component.html",
  styleUrl: "./payment-receipt.component.css",
})
export class PaymentReceiptComponent implements OnInit {
  // ===============================
  // STATE
  // ===============================

  students: any[] = [];
  selectedStudentCode: string = "";

  receiptNo = "";
  amount: string = "";
  paymentMode: string = "";
  transactionId: string = "";

  batchCode = ""; // hidden (auto)
  selectedFile: File | null = null;

  uploadedReceiptId: string | null = null;

  loading = false;
  message = "";

  // NEW: Modal property
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
  // STUDENT CHANGE (RESET PAGE)
  // ===============================

  onStudentChange(): void {
    const selectedStudent = this.students.find(
      (s) => s.user_code === this.selectedStudentCode,
    );

    this.batchCode = selectedStudent?.batch_code || "";

    // 🔄 RESET FORM STATE
    this.resetForm();
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
  // UPLOAD PAYMENT RECEIPT
  // ===============================

  uploadReceipt(): void {
    if (
      !this.selectedStudentCode ||
      !this.receiptNo ||
      !this.amount ||
      !this.paymentMode ||
      !this.transactionId ||
      !this.selectedFile
    ) {
      this.message = "Please fill all required fields";
      return;
    }

    const formData = new FormData();
    formData.append("user_code", this.selectedStudentCode);
    formData.append("receipt_no", this.receiptNo);
    formData.append("amount", this.amount);
    formData.append("payment_mode", this.paymentMode);
    formData.append("transaction_id", this.transactionId);
    formData.append("batch_code", this.batchCode); // 🔒 hidden
    formData.append("file", this.selectedFile);

    this.loading = true;
    this.message = "";

    this.api.uploadPaymentReceipt(formData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.uploadedReceiptId = res.receipt_id;
          this.message = "Payment receipt uploaded successfully";
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
  // PUBLISH PAYMENT RECEIPT
  // ===============================

  publishReceipt(): void {
    if (!this.uploadedReceiptId) return;

    this.loading = true;
    this.message = "";

    this.api.publishPaymentReceipt(this.uploadedReceiptId).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          // Show success modal
          this.showSuccessModal = true;
          this.message = "Payment receipt published successfully";
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

  // ===============================
  // NEW METHODS
  // ===============================

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }

  resetForm(): void {
    this.receiptNo = "";
    this.amount = "";
    this.paymentMode = "";
    this.transactionId = "";
    this.selectedFile = null;
    this.uploadedReceiptId = null;
    this.message = "";

    // Clear file input
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }

  closeModalAndReset(): void {
    this.showSuccessModal = false;
    this.resetForm();
  }
}
