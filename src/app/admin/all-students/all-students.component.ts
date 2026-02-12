import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-all-students",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./all-students.component.html",
  styleUrl: "./all-students.component.css",
})
export class AllStudentsComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  loading: boolean = false;
  errorMessage: string = "";
  successMessage: string = "";
  selectedStudent: any = null;

  // Delete functionality
  showDeleteModal: boolean = false;
  studentToDelete: any = null;
  isDeleting: boolean = false;

  // Search functionality
  searchTerm: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    this.loading = true;
    this.errorMessage = "";

    this.apiService.getAllStudentDetails().subscribe({
      next: (res) => {
        this.students = res.data || [];
        this.filteredStudents = [...this.students];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Failed to load students. Please try again.";
        this.loading = false;
      },
    });
  }

  filterStudents() {
    if (!this.searchTerm.trim()) {
      this.filteredStudents = [...this.students];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredStudents = this.students.filter(
      (student) =>
        (student.user_ref_code &&
          student.user_ref_code.toLowerCase().includes(term)) ||
        (student.name && student.name.toLowerCase().includes(term)) ||
        (student.email && student.email.toLowerCase().includes(term)) ||
        (student.contact_number && student.contact_number.includes(term)),
    );
  }

  viewStudentDetails(student: any) {
    this.selectedStudent = student;
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.selectedStudent = null;
    document.body.style.overflow = "auto";
  }

  // Delete methods
  confirmDelete(student: any) {
    this.studentToDelete = student;
    this.showDeleteModal = true;
    document.body.style.overflow = "hidden";
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.studentToDelete = null;
    this.isDeleting = false;
    document.body.style.overflow = "auto";
  }

  deleteStudent() {
    if (!this.studentToDelete?.user_ref_code) {
      this.errorMessage = "Cannot delete student: Missing user reference code";
      return;
    }

    this.isDeleting = true;

    this.apiService
      .deleteStudentDetails(this.studentToDelete.user_ref_code)
      .subscribe({
        next: (res) => {
          this.isDeleting = false;

          if (res.success) {
            // Remove student from arrays
            this.students = this.students.filter(
              (s) => s.user_ref_code !== this.studentToDelete.user_ref_code,
            );
            this.filteredStudents = this.filteredStudents.filter(
              (s) => s.user_ref_code !== this.studentToDelete.user_ref_code,
            );

            // Show success message
            this.successMessage =
              res.message ||
              `Student ${this.studentToDelete.user_ref_code} deleted successfully`;

            // Close delete modal
            this.closeDeleteModal();

            // Also close details modal if it was open with the same student
            if (
              this.selectedStudent?.user_ref_code ===
              this.studentToDelete.user_ref_code
            ) {
              this.closeModal();
            }

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
              this.successMessage = "";
            }, 5000);
          } else {
            this.errorMessage = res.message || "Failed to delete student";
          }
        },
        error: (err) => {
          console.error("Error deleting student:", err);
          this.isDeleting = false;
          this.errorMessage =
            err.error?.message || "Failed to delete student. Please try again.";
        },
      });
  }
}
