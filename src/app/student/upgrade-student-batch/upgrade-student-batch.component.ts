import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import Swal from "sweetalert2";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-upgrade-student-batch",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./upgrade-student-batch.component.html",
})
export class UpgradeStudentBatchComponent implements OnInit, OnDestroy {
  /* ================= MASTER DATA ================= */
  standards: any[] = [];
  batchList: any[] = [];
  studentList: any[] = [];

  /* ================= SELECTION STATE ================= */
  selectedStandardId: number | string = "";
  selectedBatchCode: string = "";
  selectedStudentCodes: string[] = []; // Array for multiple student selection

  /* ================= UI STATE ================= */
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
    this.loadAllStudents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.apiService.getStandards()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.standards = Array.isArray(res?.data) ? res.data : [];
        },
        error: () => {
          this.standards = [];
        },
      });
  }

  /* ================= STANDARD CHANGE ================= */
  onStandardChange(): void {
    // Reset dependent selections
    this.selectedBatchCode = "";
    this.batchList = [];

    if (!this.selectedStandardId) return;

    this.apiService
      .getBatchesByStandard(Number(this.selectedStandardId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.batchList = Array.isArray(res?.data) ? res.data : [];
        },
        error: () => {
          this.batchList = [];
          Swal.fire("Error", "Failed to load batches", "error");
        },
      });
  }

  /* ================= LOAD ALL STUDENTS ================= */
  loadAllStudents(): void {
    this.apiService.getAllStudents()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.studentList = Array.isArray(res?.data) ? res.data : [];
        },
        error: () => {
          this.studentList = [];
        },
      });
  }

  /* ================= TOGGLE STUDENT SELECTION (Multiple) ================= */
  toggleStudentSelection(code: string): void {
    const index = this.selectedStudentCodes.indexOf(code);
    if (index === -1) {
      // Add to selection
      this.selectedStudentCodes.push(code);
    } else {
      // Remove from selection
      this.selectedStudentCodes.splice(index, 1);
    }
  }

  /* ================= SELECT ALL STUDENTS ================= */
  selectAllStudents(): void {
    this.selectedStudentCodes = this.studentList.map(s => s.stu_ref_code);
  }

  /* ================= DESELECT ALL STUDENTS ================= */
  deselectAllStudents(): void {
    this.selectedStudentCodes = [];
  }

  /* ================= CHECK IF STUDENT IS SELECTED ================= */
  isSelected(code: string): boolean {
    return this.selectedStudentCodes.includes(code);
  }

  /* ================= UPGRADE BATCH FOR MULTIPLE STUDENTS ================= */
  upgradeBatch(): void {
    // Validation
    if (!this.selectedStandardId) {
      Swal.fire("Incomplete Selection", "Please select a standard first", "warning");
      return;
    }

    if (!this.selectedBatchCode) {
      Swal.fire("Incomplete Selection", "Please select a batch to upgrade to", "warning");
      return;
    }

    if (this.selectedStudentCodes.length === 0) {
      Swal.fire("Incomplete Selection", "Please select at least one student to upgrade", "warning");
      return;
    }

    // Prevent multiple submissions
    if (this.loading) return;

    // Confirmation dialog for multiple students
    Swal.fire({
      title: `Upgrade ${this.selectedStudentCodes.length} Student(s)?`,
      text: `This will add the batch "${this.selectedBatchCode}" to ${this.selectedStudentCodes.length} selected student(s). Their existing batches will remain unchanged.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Upgrade",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        this.processBatchUpgrade();
      }
    });
  }

  /* ================= PROCESS BATCH UPGRADE ================= */
  processBatchUpgrade(): void {
    this.loading = true;

    // Create an array of promises/observables for each student
    const upgradeRequests = this.selectedStudentCodes.map(studentCode => {
      const payload = {
        stu_ref_code: studentCode,
        batch_code: this.selectedBatchCode,
      };
      return this.apiService.upgradeStudentBatch(payload).toPromise();
    });

    // Execute all upgrades in parallel
    Promise.all(upgradeRequests)
      .then((results) => {
        const successCount = results.filter(r => r?.success !== false).length;
        const failedCount = this.selectedStudentCodes.length - successCount;

        if (failedCount === 0) {
          Swal.fire({
            icon: "success",
            title: "Batch Upgraded Successfully!",
            text: `${successCount} student(s) have been upgraded to ${this.selectedBatchCode}`,
            confirmButtonColor: "#3b82f6",
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Partial Success",
            text: `${successCount} student(s) upgraded, ${failedCount} failed. Please check and try again.`,
            confirmButtonColor: "#3b82f6",
          });
        }

        // Reset selection after successful upgrade
        this.selectedStudentCodes = [];
        
        // Refresh student list to show updated batch info
        this.loadAllStudents();
      })
      .catch((error) => {
        console.error("Upgrade error:", error);
        Swal.fire({
          icon: "error",
          title: "Upgrade Failed",
          text: error?.message || "Failed to upgrade students. Please try again.",
          confirmButtonColor: "#3b82f6",
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }
}