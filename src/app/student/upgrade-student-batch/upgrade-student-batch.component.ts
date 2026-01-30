import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-upgrade-student-batch",
  standalone: true, // keep as-is for now
  imports: [CommonModule, FormsModule],
  templateUrl: "./upgrade-student-batch.component.html",
  styleUrl: "./upgrade-student-batch.component.css",
})
export class UpgradeStudentBatchComponent implements OnInit {
  batchList: any[] = [];
  studentList: any[] = [];

  selectedBatchCode: string = "";
  selectedStudentCode: string | null = null;

  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
    this.loadStudentsWithBatch();
  }

  /* ================= LOAD DATA ================= */

  loadBatches(): void {
    this.apiService.getAllBatches().subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.batchList = []),
    });
  }

  // Students who ALREADY have at least one batch
  loadStudentsWithBatch(): void {
    this.apiService.getAllStudents().subscribe({
      next: (res: any) => {
        this.studentList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.studentList = []),
    });
  }

  /* ================= SELECT STUDENT ================= */

  selectStudent(code: string): void {
    this.selectedStudentCode = code;
  }

  isSelected(code: string): boolean {
    return this.selectedStudentCode === code;
  }

  /* ================= UPGRADE BATCH ================= */

  upgradeBatch(): void {
    if (!this.selectedBatchCode) {
      Swal.fire("Warning", "Please select a batch", "warning");
      return;
    }

    if (!this.selectedStudentCode) {
      Swal.fire("Warning", "Please select ONE student", "warning");
      return;
    }

    this.loading = true;

    const payload = {
      stu_ref_code: this.selectedStudentCode,
      batch_code: this.selectedBatchCode,
    };

    this.apiService.upgradeStudentBatch(payload).subscribe({
      next: (res: any) => {
        Swal.fire(
          "Success",
          res.message || "Student upgraded to new batch successfully",
          "success",
        );
        this.selectedStudentCode = null;
      },
      error: (err) => {
        Swal.fire(
          "Error",
          err?.error?.message || "Batch upgrade failed",
          "error",
        );
      },
      complete: () => (this.loading = false),
    });
  }
}
