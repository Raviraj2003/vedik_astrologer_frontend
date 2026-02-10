import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-attendance",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./attendance.component.html",
  styleUrl: "./attendance.component.css",
})
export class AttendanceComponent implements OnInit {
  /* ================= MASTER ================= */
  standards: any[] = [];
  batches: any[] = [];

  /* ================= SELECTION ================= */
  selectedStandardId: number | "" = "";
  selectedBatch: string = "";

  /* ================= DATA ================= */
  attendanceList: any[] = [];
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStandards();
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.api.getStandards().subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.standards = res.data || [];
        }
      },
      error: (err) => {
        console.error("Failed to load standards", err);
      },
    });
  }

  /* ================= STANDARD CHANGE ================= */
  onStandardChange(): void {
    this.selectedBatch = "";
    this.batches = [];
    this.attendanceList = [];

    if (!this.selectedStandardId) return;

    this.api.getBatchesByStandard(Number(this.selectedStandardId)).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.batches = res.data || [];
        }
      },
      error: (err) => {
        console.error("Failed to load batches", err);
      },
    });
  }

  /* ================= BATCH CHANGE ================= */
  onBatchChange(): void {
    if (!this.selectedBatch) {
      this.attendanceList = [];
      return;
    }

    this.loading = true;

    this.api.getAttendanceByBatch(this.selectedBatch).subscribe({
      next: (res: any) => {
        this.attendanceList = res?.success ? res.data || [] : [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Attendance fetch failed", err);
        this.loading = false;
      },
    });
  }

  /* ================= HELPERS ================= */
  formatDate(dateString: string): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  refreshData(): void {
    if (this.selectedBatch) {
      this.onBatchChange();
    }
  }

  getTotalStudents(): number {
    const unique = new Set(
      this.attendanceList.map((i) => i.student_id || i.email),
    );
    return unique.size;
  }

  exportAttendance(): void {
    if (this.attendanceList.length === 0) return;

    const headers = [
      "Student Name",
      "Email",
      "Class Date",
      "Slot Time",
      "Status",
      "Marked At",
    ];

    const rows = this.attendanceList.map((a) => [
      `"${a.first_name || ""} ${a.last_name || ""}"`,
      `"${a.email || ""}"`,
      `"${a.class_date || ""}"`,
      `"${a.slot_time || ""}"`,
      `"${a.attendance_status || "PRESENT"}"`,
      `"${a.marked_at || ""}"`,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${this.selectedBatch}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  }
}
