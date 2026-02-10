import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-upgrade-student-batch",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./upgrade-student-batch.component.html",
})
export class UpgradeStudentBatchComponent implements OnInit {
  /* ================= MASTER ================= */
  standards: any[] = [];
  batchList: any[] = [];
  studentList: any[] = [];

  /* ================= SELECTION ================= */
  selectedStandardId: number | "" = "";
  selectedBatchCode: string = "";
  selectedStudentCode: string | null = null;

  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
    this.loadStudentsWithBatch();
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.apiService.getStandards().subscribe({
      next: (res: any) => {
        this.standards = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.standards = []),
    });
  }

  /* ================= STANDARD CHANGE ================= */
  onStandardChange(): void {
    this.selectedBatchCode = "";
    this.batchList = [];

    if (!this.selectedStandardId) return;

    this.apiService
      .getBatchesByStandard(Number(this.selectedStandardId))
      .subscribe({
        next: (res: any) => {
          this.batchList = Array.isArray(res?.data) ? res.data : [];
        },
        error: () => (this.batchList = []),
      });
  }

  /* ================= LOAD STUDENTS ================= */
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

  /* ================= UPGRADE ================= */
  upgradeBatch(): void {
    if (!this.selectedStandardId) {
      Swal.fire("Warning", "Please select a standard", "warning");
      return;
    }

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
