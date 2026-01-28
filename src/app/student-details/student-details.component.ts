import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-student-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./student-details.component.html",
})
export class StudentDetailsComponent implements OnInit {
  studentForm!: FormGroup;
  successMessage = "";
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      full_name: ["", Validators.required],
      phone_no: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      birth_date: ["", Validators.required],
      birth_time: ["", Validators.required],
      whatsapp_group: ["", Validators.required], // ALL | BATCH | NONE
      qualification: ["", Validators.required],
      studied_astrology: ["", Validators.required], // Y | N
      computer_knowledge: ["", Validators.required], // Y | N
      class_mode: ["", Validators.required], // OFFLINE | LAPTOP | MOBILE
      fees: [null],
      certificate_marksheet_code: [""],
      marks_obtained: [null, [Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.errorMessage = "Please fill all required fields.";
      this.successMessage = "";
      return;
    }

    this.apiService.updateStudentDetails(this.studentForm.value).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || "Details saved successfully";
        this.errorMessage = "";
      },
      error: (err) => {
        this.errorMessage = err.error?.message || "Something went wrong";
        this.successMessage = "";
      },
    });
  }
}
