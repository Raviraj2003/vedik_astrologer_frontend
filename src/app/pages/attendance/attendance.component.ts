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
  selectedDate: string = ""; // New date filter

  /* ================= DATA ================= */
  attendanceList: any[] = [];
  filteredAttendanceList: any[] = []; // Filtered list based on date
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStandards();
    // Set today's date as default
    this.setTodayDate();
  }

  /* ================= SET TODAY'S DATE ================= */
  setTodayDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    this.selectedDate = `${year}-${month}-${day}`;
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
    this.filteredAttendanceList = [];

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
      this.filteredAttendanceList = [];
      return;
    }

    this.loading = true;

    this.api.getAttendanceByBatch(this.selectedBatch).subscribe({
      next: (res: any) => {
        this.attendanceList = res?.success ? res.data || [] : [];
        this.applyDateFilter(); // Apply date filter after loading data
        this.loading = false;
      },
      error: (err) => {
        console.error("Attendance fetch failed", err);
        this.loading = false;
      },
    });
  }

  /* ================= DATE FILTER ================= */
  onDateChange(): void {
    this.applyDateFilter();
  }

  applyDateFilter(): void {
    if (!this.selectedDate) {
      this.filteredAttendanceList = [...this.attendanceList];
      return;
    }

    this.filteredAttendanceList = this.attendanceList.filter((record) => {
      // Extract date part from class_date (assuming format YYYY-MM-DD or similar)
      const recordDate = this.extractDate(record.class_date);
      return recordDate === this.selectedDate;
    });
  }

  extractDate(dateString: string): string {
    if (!dateString) return "";

    // Handle different date formats
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  }

  clearDateFilter(): void {
    this.setTodayDate();
    this.applyDateFilter();
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
      this.filteredAttendanceList.map((i) => i.student_id || i.email),
    );
    return unique.size;
  }

  getTotalRecords(): number {
    return this.filteredAttendanceList.length;
  }

  exportAttendance(): void {
    if (this.filteredAttendanceList.length === 0) return;

    const headers = [
      "Student Name",
      "Email",
      "Class Date",
      "Slot Time",
      "Status",
      "Marked At",
    ];

    const rows = this.filteredAttendanceList.map((a) => [
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
    const dateSuffix = this.selectedDate ? `_${this.selectedDate}` : "";
    link.download = `attendance_${this.selectedBatch}${dateSuffix}_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  }

  getUniqueDates(): string[] {
    const dates = this.attendanceList.map((record) =>
      this.extractDate(record.class_date),
    );
    return [...new Set(dates)]
      .filter((d) => d)
      .sort()
      .reverse();
  }
}
