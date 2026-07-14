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
  // RECEIPTS LIST (main page)
  // ===============================
  receipts: any[] = [];
  loadingReceipts = false;
  publishingId: string | null = null;

  // ===============================
  // SEARCH FILTER (receipts table)
  // ===============================
  searchQuery: string = "";

  // ===============================
  // MODAL STATE
  // ===============================
  showAddModal = false;
  modalStep: "select-student" | "upload-form" = "select-student";

  // Dropdown data (used inside modal)
  standards: any[] = [];
  batches: any[] = [];
  allStudents: any[] = [];
  students: any[] = [];

  // Selected values (modal)
  selectedStandardId: number | null = null;
  selectedBatchCode: string = "";
  selectedStudentCode: string = "";

  // Form fields
  receiptNo = "";
  amount: string = "";
  paymentMode: string = "";
  transactionId: string = "";

  // File upload
  selectedFile: File | null = null;

  // UI state
  loading = false;
  message = "";
  messageType: "success" | "error" | "info" = "info";

  // Loading states for dropdowns
  loadingStandards = false;
  loadingBatches = false;
  loadingStudents = false;

  constructor(private api: ApiService) {}

  // ===============================
  // INIT
  // ===============================
  ngOnInit(): void {
    this.fetchStandards();
    this.fetchAllStudents();
    this.fetchAllReceipts();
  }

  // ===============================
  // FETCH ALL RECEIPTS (LIST)
  // ===============================
  fetchAllReceipts(): void {
    this.loadingReceipts = true;
    this.api.getAllPaymentReceipts().subscribe({
      next: (res) => {
        this.loadingReceipts = false;
        if (res.success) {
          this.receipts = res.data || res.receipts || [];
        } else {
          this.showMessage(res.message || "Failed to load receipts", "error");
        }
      },
      error: (error) => {
        this.loadingReceipts = false;
        console.error("❌ getAllPaymentReceipts error:", error);
        this.showMessage("Failed to load receipts", "error");
      },
    });
  }

  // ===============================
  // FETCH ALL STUDENTS
  // ===============================
  fetchAllStudents(): void {
    this.api.getAllStudents().subscribe({
      next: (res) => {
        if (res.success) {
          this.allStudents = res.data || res.students || [];
        }
      },
      error: (error) => {
        console.error("❌ getAllStudents error:", error);
      },
    });
  }

  // ===============================
  // FETCH STANDARDS
  // ===============================
  fetchStandards(): void {
    this.loadingStandards = true;
    this.api.getStandards().subscribe({
      next: (res) => {
        this.loadingStandards = false;
        if (res.success) {
          this.standards = res.data || [];
        }
      },
      error: () => {
        this.loadingStandards = false;
        this.showMessage("Failed to load standards", "error");
      },
    });
  }

  // ===============================
  // MODAL: FETCH BATCHES BY STANDARD
  // ===============================
  onStandardChange(): void {
    this.batches = [];
    this.students = [];
    this.selectedBatchCode = "";
    this.selectedStudentCode = "";

    if (!this.selectedStandardId) return;

    this.loadingBatches = true;
    this.api.getBatchesByStandard(this.selectedStandardId).subscribe({
      next: (res) => {
        this.loadingBatches = false;
        if (res.success) {
          this.batches = res.data || [];
        }
      },
      error: () => {
        this.loadingBatches = false;
        this.showMessage("Failed to load batches", "error");
      },
    });
  }

  // ===============================
  // MODAL: FETCH STUDENTS BY BATCH
  // ===============================
  onBatchChange(): void {
    this.students = [];
    this.selectedStudentCode = "";

    if (!this.selectedBatchCode) return;

    this.loadingStudents = true;
    this.api.getStudentsByBatch(this.selectedBatchCode).subscribe({
      next: (res) => {
        this.loadingStudents = false;
        if (res.success) {
          this.students = res.data || res.students || [];
          if (this.students.length === 0) {
            this.showMessage("No students found for this batch", "info");
          }
        } else {
          this.showMessage(res.message || "Failed to load students", "error");
        }
      },
      error: () => {
        this.loadingStudents = false;
        this.showMessage("Failed to load students", "error");
      },
    });
  }

  onStudentChange(): void {
    // Selection is enough; details render in the summary card
  }

  // ===============================
  // SEARCH FILTER
  // ===============================
  clearFilters(): void {
    this.searchQuery = "";
  }

  private getStudentByCode(stuRefCode: string): any | undefined {
    return this.allStudents.find((s) => s.stu_ref_code === stuRefCode);
  }

  // ===============================
  // FILTERED RECEIPTS (computed)
  // ===============================
  get filteredReceipts(): any[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.receipts;

    return this.receipts.filter((r) => {
      const studentName = this.getReceiptStudentName(r).toLowerCase();
      const stuCode = (r.stu_ref_code || "").toLowerCase();
      const receiptNo = (r.receipt_no || "").toLowerCase();
      const receiptId = (r.receipt_id || "").toLowerCase();

      return (
        studentName.includes(query) ||
        stuCode.includes(query) ||
        receiptNo.includes(query) ||
        receiptId.includes(query)
      );
    });
  }

  get hasActiveFilters(): boolean {
    return !!this.searchQuery.trim();
  }

  // ===============================
  // MODAL CONTROLS
  // ===============================
  openAddModal(): void {
    this.showAddModal = true;
    this.modalStep = "select-student";
    this.resetSelections();
    this.resetForm();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.modalStep = "select-student";
    this.resetSelections();
    this.resetForm();
  }

  resetSelections(): void {
    this.selectedStandardId = null;
    this.selectedBatchCode = "";
    this.selectedStudentCode = "";
    this.batches = [];
    this.students = [];
  }

  proceedToUploadForm(): void {
    if (!this.selectedStudentCode) {
      this.showMessage("Please select a student first", "error");
      return;
    }
    this.message = "";
    this.modalStep = "upload-form";
  }

  backToStudentSelect(): void {
    this.modalStep = "select-student";
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

  removeFile(event: Event): void {
    event.stopPropagation();
    this.selectedFile = null;
    const fileInput = document.querySelector(
      "input[type='file']",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
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
      this.showMessage("Please fill all required fields", "error");
      return;
    }

    const formData = new FormData();
    formData.append("stu_ref_code", this.selectedStudentCode);
    formData.append("receipt_no", this.receiptNo);
    formData.append("amount", this.amount);
    formData.append("payment_mode", this.paymentMode);
    formData.append("transaction_id", this.transactionId);
    formData.append("batch_code", this.selectedBatchCode);
    formData.append("file", this.selectedFile);

    this.loading = true;
    this.message = "";

    this.api.uploadPaymentReceipt(formData).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.closeAddModal();
          this.fetchAllReceipts();
          this.showMessage(
            "✅ Payment receipt uploaded successfully! Publish it from the list below.",
            "success",
          );
        } else {
          this.showMessage(res.message || "Upload failed", "error");
        }
      },
      error: (error) => {
        this.loading = false;
        this.showMessage(error.error?.message || "Upload failed", "error");
      },
    });
  }

  // ===============================
  // PUBLISH PAYMENT RECEIPT (from list)
  // ===============================
  publishReceipt(receipt: any): void {
    const receiptId = receipt.receipt_id || receipt.id;
    if (!receiptId) {
      this.showMessage("Receipt ID not found", "error");
      return;
    }

    this.publishingId = receiptId;

    this.api.publishPaymentReceipt(receiptId).subscribe({
      next: (res) => {
        this.publishingId = null;
        if (res.success) {
          receipt.is_published = "Y";
          this.showMessage(
            `✅ Receipt ${receipt.receipt_no || receiptId} published — now visible to the student!`,
            "success",
          );
        } else {
          this.showMessage(res.message || "Publish failed", "error");
        }
      },
      error: (error) => {
        this.publishingId = null;
        this.showMessage(error.error?.message || "Publish failed", "error");
      },
    });
  }

  // ===============================
  // HELPERS
  // ===============================
  showMessage(msg: string, type: "success" | "error" | "info" = "info"): void {
    this.message = msg;
    this.messageType = type;
    if (type === "success" || type === "info") {
      setTimeout(() => {
        if (this.message === msg) this.message = "";
      }, 5000);
    }
  }

  getStudentName(): string {
    if (!this.selectedStudentCode) return "";
    const student = this.getStudentByCode(this.selectedStudentCode);
    if (student) {
      return `${student.first_name || ""} ${student.last_name || ""}`.trim();
    }
    return this.selectedStudentCode;
  }

  getStandardName(standardId: number | null): string {
    if (!standardId) return "";
    const standard = this.standards.find((s) => s.standard_id === standardId);
    return standard ? standard.standard_name : "";
  }

  getReceiptStudentName(receipt: any): string {
    const student = this.getStudentByCode(receipt.stu_ref_code);
    if (student) {
      const name = `${student.first_name || ""} ${student.last_name || ""}`.trim();
      if (name) return name;
    }
    return receipt.stu_ref_code || "—";
  }

  // is_published comes back as the string "Y" / "N" from the DB
  isPublished(receipt: any): boolean {
    return (
      receipt.is_published === "Y" ||
      receipt.is_published === true ||
      receipt.is_published === 1
    );
  }

  formatFileSize(size: number): string {
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  }

  get publishedCount(): number {
    return this.filteredReceipts.filter((r) => this.isPublished(r)).length;
  }

  get pendingCount(): number {
    return this.filteredReceipts.length - this.publishedCount;
  }

  // ===============================
  // RESET / REFRESH
  // ===============================
  resetForm(): void {
    this.receiptNo = "";
    this.amount = "";
    this.paymentMode = "";
    this.transactionId = "";
    this.selectedFile = null;

    const fileInput = document.querySelector(
      "input[type='file']",
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }

  refreshData(): void {
    this.fetchStandards();
    this.fetchAllStudents();
    this.fetchAllReceipts();
  }
}