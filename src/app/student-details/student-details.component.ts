import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  templateUrl: './student-details.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class StudentDetailsComponent implements OnInit {
  studentForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    // Build the student update form
    this.studentForm = this.fb.group({
      batch_name: ['', Validators.required],
      fees: ['', [Validators.required, Validators.min(0)]],
      certificate_marksheet_code: ['', Validators.required],
      marks_obtained: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  // Submit updated details
  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
      return;
    }

    this.apiService.updateStudentDetails(this.studentForm.value).subscribe({
      next: (response: any) => {
        this.successMessage = response.message || 'Student details updated successfully!';
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error updating details:', error);
        this.errorMessage = error.error?.message || 'Failed to update student details.';
        this.successMessage = '';
      },
    });
  }
}
