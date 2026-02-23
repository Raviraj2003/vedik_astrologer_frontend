// batch-student-list.component.ts
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-batch-student-list",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./batch-student-list.component.html",
  styleUrl: "./batch-student-list.component.css",
})
export class BatchStudentListComponent implements OnInit {
  // Standards
  standards: any[] = [];
  selectedStandardId: number | null = null;
  standardsLoading = false;
  standardsError = "";

  // Batches
  batches: any[] = [];
  selectedBatchCode: string | null = null;
  batchesLoading = false;
  batchesError = "";

  // Students
  students: any[] = [];
  filteredStudents: any[] = [];
  studentsLoading = false;
  studentsError = "";
  studentCount = 0;

  // Search
  searchTerm: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStandards();
  }

  // ======================================
  // FETCH STANDARDS
  // ======================================
  fetchStandards(): void {
    this.standardsLoading = true;
    this.standardsError = "";

    this.apiService.getStandards().subscribe({
      next: (response) => {
        if (response.success) {
          this.standards = response.data;
        } else {
          this.standardsError = response.message || "Failed to fetch standards";
        }
        this.standardsLoading = false;
      },
      error: (error) => {
        console.error("Error fetching standards:", error);
        this.standardsError = this.getErrorMessage(error);
        this.standardsLoading = false;
      },
    });
  }

  // ======================================
  // FETCH BATCHES BY STANDARD
  // ======================================
  onStandardChange(): void {
    if (!this.selectedStandardId) {
      this.batches = [];
      this.selectedBatchCode = null;
      this.students = [];
      this.filteredStudents = [];
      this.searchTerm = "";
      return;
    }

    this.fetchBatchesByStandard(this.selectedStandardId);
  }

  fetchBatchesByStandard(standardId: number): void {
    this.batchesLoading = true;
    this.batchesError = "";
    this.selectedBatchCode = null;
    this.students = [];
    this.filteredStudents = [];
    this.searchTerm = "";

    this.apiService.getBatchesByStandard(standardId).subscribe({
      next: (response) => {
        if (response.success) {
          this.batches = response.data;
        } else {
          this.batchesError = "Failed to fetch batches";
        }
        this.batchesLoading = false;
      },
      error: (error) => {
        console.error("Error fetching batches:", error);
        this.batchesError = this.getErrorMessage(error);
        this.batchesLoading = false;
      },
    });
  }

  // ======================================
  // FETCH STUDENTS BY BATCH
  // ======================================
  onBatchChange(): void {
    if (!this.selectedBatchCode) {
      this.students = [];
      this.filteredStudents = [];
      this.searchTerm = "";
      return;
    }

    this.fetchStudentsByBatch(this.selectedBatchCode);
  }

  fetchStudentsByBatch(batchCode: string): void {
    this.studentsLoading = true;
    this.studentsError = "";
    this.searchTerm = "";

    this.apiService.getStudentsByBatch(batchCode).subscribe({
      next: (response) => {
        if (response.success) {
          this.students = response.data;
          this.filteredStudents = [...this.students];
          this.studentCount = response.count || response.data.length;
        } else {
          this.studentsError = "Failed to fetch students";
        }
        this.studentsLoading = false;
      },
      error: (error) => {
        console.error("Error fetching students:", error);
        this.studentsError = this.getErrorMessage(error);
        this.studentsLoading = false;
      },
    });
  }

  // Add this method to your component class
  getBatchPlaceholder(): string {
    if (!this.selectedStandardId) {
      return "Select standard first";
    }

    if (this.batchesLoading) {
      return "Loading batches...";
    }

    if (!this.batchesLoading && this.batches.length === 0) {
      return "No batches available for this standard";
    }

    return "-- Select Batch --";
  }

  // ======================================
  // FILTER STUDENTS BY SEARCH TERM
  // ======================================
  filterStudents(): void {
    if (!this.searchTerm.trim()) {
      this.filteredStudents = [...this.students];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredStudents = this.students.filter((student) => {
      return (
        student.student_name?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term) ||
        student.stu_ref_code?.toLowerCase().includes(term) ||
        student.phone_no?.toLowerCase().includes(term)
      );
    });
  }

  // ======================================
  // UTILITY FUNCTIONS
  // ======================================
  getTotalBatches(): number {
    return this.batches?.length || 0;
  }

  getInitials(name: string): string {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }

  getBatchName(batchCode: string): string {
    const batch = this.batches.find((b) => b.batch_code === batchCode);
    return batch ? batch.batch_name : "Unknown";
  }

  getStandardName(standardId: number): string {
    const standard = this.standards.find((s) => s.standard_id === standardId);
    return standard ? standard.standard_name : "Unknown";
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // ======================================
  // ACTION FUNCTIONS
  // ======================================
  exportStudentList(): void {
    if (this.filteredStudents.length === 0) return;

    // Create CSV content
    const headers = [
      "Student Name",
      "Reference Code",
      "Email",
      "Phone Number",
      "Joined Date",
    ];
    const csvData = this.filteredStudents.map((student) => [
      student.student_name,
      student.stu_ref_code,
      student.email,
      student.phone_no || "N/A",
      this.formatDate(student.joined_at),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `students_${this.getBatchName(this.selectedBatchCode || "")}_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  resetSelection(): void {
    this.selectedStandardId = null;
    this.selectedBatchCode = null;
    this.batches = [];
    this.students = [];
    this.filteredStudents = [];
    this.searchTerm = "";
    this.studentCount = 0;
  }

  clearSearch(): void {
    this.searchTerm = "";
    this.filterStudents();
  }

  refreshData(): void {
    this.fetchStandards();
    if (this.selectedStandardId) {
      this.fetchBatchesByStandard(this.selectedStandardId);
    }
    if (this.selectedBatchCode) {
      this.fetchStudentsByBatch(this.selectedBatchCode);
    }
  }

  viewStudentDetails(student: any): void {
    // Implement view student details functionality
    console.log("Viewing student:", student);
    // You can navigate to student details page or open a modal
  }

  // ======================================
  // ERROR HANDLING
  // ======================================
  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return "Cannot connect to server. Please check your internet connection.";
    } else if (error.status === 401) {
      return "Unauthorized. Please login again.";
    } else if (error.status === 404) {
      return "API endpoint not found. Please check the URL.";
    } else if (error.status === 500) {
      return "Server error. Please try again later.";
    } else {
      return error.error?.message || "An unexpected error occurred.";
    }
  }
}
