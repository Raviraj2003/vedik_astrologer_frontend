import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-assign-batch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-batch.component.html',
})
export class AssignBatchComponent implements OnInit {

  batchList: any[] = [];
  studentList: any[] = [];

  selectedBatchCode = '';
  selectedStudents: Set<string> = new Set();

  loading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
    this.loadEligibleStudents();
  }

  /* ================= LOAD DATA ================= */

  loadBatches(): void {
    this.apiService.getAllBatches().subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.batchList = [])
    });
  }

  loadEligibleStudents(): void {
    this.apiService.getEligibleBatchStudents().subscribe({
      next: (res: any) => {
        this.studentList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.studentList = [])
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

  /* ================= ASSIGN ================= */

  assignBatch(): void {
    if (!this.selectedBatchCode) {
      Swal.fire('Warning', 'Please select a batch', 'warning');
      return;
    }

    if (this.selectedStudents.size === 0) {
      Swal.fire('Warning', 'Please select at least one student', 'warning');
      return;
    }

    this.loading = true;

    const payload = {
      batch_code: this.selectedBatchCode,
      student_ref_codes: Array.from(this.selectedStudents)
    };

    this.apiService.assignStudentsToBatch(payload).subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.message || 'Students assigned successfully', 'success');
        this.selectedStudents.clear();
        this.loadEligibleStudents();
      },
      error: (err) => {
        Swal.fire('Error', err?.error?.message || 'Assignment failed', 'error');
      },
      complete: () => (this.loading = false)
    });
  }
}
