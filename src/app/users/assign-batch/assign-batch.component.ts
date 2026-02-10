import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-assign-batch",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./assign-batch.component.html",
})
export class AssignBatchComponent implements OnInit {
  /* ================= STATE ================= */

  standardsList: any[] = [];
  batchList: any[] = [];
  studentList: any[] = [];

  selectedStandardId: number | "" = "";
  selectedBatchCode = "";

  selectedStudents: Set<string> = new Set();
  loading = false;

  constructor(private apiService: ApiService) {}

  /* ================= INIT ================= */

  ngOnInit(): void {
    this.loadStandards();
    this.loadEligibleStudents();
  }

  /* ================= LOAD DATA ================= */

  loadStandards(): void {
    this.apiService.getStandards().subscribe({
      next: (res: any) => {
        this.standardsList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.standardsList = []),
    });
  }

  onStandardChange(): void {
    this.selectedBatchCode = "";
    this.batchList = [];

    if (!this.selectedStandardId) {
      return;
    }

    this.apiService.getBatchesByStandard(this.selectedStandardId).subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => {
        this.batchList = [];
      },
    });
  }

  loadEligibleStudents(): void {
    this.apiService.getEligibleBatchStudents().subscribe({
      next: (res: any) => {
        this.studentList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.studentList = []),
    });
  }

  /* ================= SELECT STUDENTS ================= */

  toggleStudent(code: string): void {
    this.selectedStudents.has(code)
      ? this.selectedStudents.delete(code)
      : this.selectedStudents.add(code);
  }

  isSelected(code: string): boolean {
    return this.selectedStudents.has(code);
  }

  areAllSelected(): boolean {
    return (
      this.studentList.length > 0 &&
      this.selectedStudents.size === this.studentList.length
    );
  }

  toggleSelectAll(): void {
    if (this.areAllSelected()) {
      this.selectedStudents.clear();
    } else {
      this.studentList.forEach((student) => {
        this.selectedStudents.add(student.stu_ref_code);
      });
    }
  }

  getSelectedCount(): number {
    return this.selectedStudents.size;
  }

  /* ================= ASSIGN ================= */

  assignBatch(): void {
    if (!this.selectedStandardId) {
      Swal.fire("Warning", "Please select a standard", "warning");
      return;
    }

    if (!this.selectedBatchCode) {
      Swal.fire("Warning", "Please select a batch", "warning");
      return;
    }

    if (this.selectedStudents.size === 0) {
      Swal.fire("Warning", "Please select at least one student", "warning");
      return;
    }

    this.loading = true;

    const studentCodes = Array.from(this.selectedStudents);
    let completed = 0;
    let failed = 0;

    studentCodes.forEach((stu_ref_code) => {
      const payload = {
        stu_ref_code,
        batch_code: this.selectedBatchCode,
      };

      this.apiService.upgradeStudentBatch(payload).subscribe({
        next: () => {
          completed++;
          if (completed + failed === studentCodes.length) {
            this.finishAssignment(completed, failed);
          }
        },
        error: (err) => {
          failed++;
          if (completed + failed === studentCodes.length) {
            Swal.fire(
              "Error",
              err?.error?.message || "Assignment failed",
              "error",
            );
            this.loading = false;
          }
        },
      });
    });
  }

  finishAssignment(completed: number, failed: number): void {
    this.loading = false;

    if (failed === 0) {
      Swal.fire("Success", "All students assigned successfully", "success");
    } else {
      Swal.fire(
        "Warning",
        `${completed} assigned, ${failed} failed`,
        "warning",
      );
    }

    this.selectedStudents.clear();
    this.loadEligibleStudents();
  }
}
