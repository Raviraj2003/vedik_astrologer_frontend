import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
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
    this.studentForm = this.fb.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm_password: ['', Validators.required],
        phone_no: ['', Validators.required],
        role: ['STD'],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // 🔐 Password match validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.message = 'Please fix the errors before submitting.';
      return;
    }

    const payload = { ...this.studentForm.value };
    delete payload.confirm_password; // ❌ Do not send confirm password

    this.apiService.createStudent(payload).subscribe({
      next: (res) => {
        this.message = res.message || 'Student added successfully!';
        this.studentForm.reset({ role: 'STD' });
      },
      error: () => {
        this.message = 'Failed to add student.';
      },
    });
  }
}
