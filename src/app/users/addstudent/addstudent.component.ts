import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-addstudent',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css'],
})
export class AddstudentComponent {
  studentForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    // 🧩 Initialize form controls
    this.studentForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone_no: ['', Validators.required],
      role: ['STD'], // default value
    });
  }

  // 🧠 Submit handler
  onSubmit() {
    if (this.studentForm.invalid) {
      this.message = 'Please fill all required fields correctly!';
      return;
    }

    console.log('Submitting:', this.studentForm.value);

    this.apiService.createStudent(this.studentForm.value).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.message = res.message || 'Student added successfully!';
        this.studentForm.reset();
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Failed to add student. Check console for details.';
      },
    });
  }
}
