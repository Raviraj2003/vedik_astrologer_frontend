import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { NgxCustomModalComponent } from 'ngx-custom-modal';
import Swal from 'sweetalert2';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-addstudent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCustomModalComponent
  ],
  templateUrl: './addstudent.component.html',
})
export class AddStudentComponent implements OnInit {

  @ViewChild('addStudentModal') addStudentModal!: NgxCustomModalComponent;
  @ViewChild('viewStudentModal') viewStudentModal!: NgxCustomModalComponent;

  studentForm!: FormGroup;

  studentList: any[] = [];
  filteredStudentList: any[] = [];
  batchList: any[] = [];
  selectedStudent: any = null;

  searchText = '';
  loading = false;

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  activeTab: 'INDIVIDUAL' | 'BATCH' = 'INDIVIDUAL';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInitialData();
  }

  /* ================= LOAD BATCHES → STUDENTS ================= */
  loadInitialData(): void {
    this.apiService.getAllBatches().subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
        this.getAllStudents();
      },
      error: () => {
        this.batchList = [];
        this.getAllStudents();
      }
    });
  }

  /* ================= FORM ================= */
  initForm(): void {
    this.studentForm = this.fb.group(
      {
        student_code: [''],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [''],
        confirm_password: [''],
        phone_no: ['', Validators.required],
        is_in_batch: [false],
      },
      { validators: this.passwordMatchValidator }
    );

    this.studentForm.get('is_in_batch')?.valueChanges.subscribe((checked) => {
      const ctrl = this.studentForm.get('batch_code');
      if (checked) {
        ctrl?.setValidators([Validators.required]);
      } else {
        ctrl?.clearValidators();
        ctrl?.setValue('');
      }
      ctrl?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const p = control.get('password')?.value;
    const c = control.get('confirm_password')?.value;
    if (!p && !c) return null;
    return p === c ? null : { passwordMismatch: true };
  }

  /* ================= STUDENTS + BATCH NAME MAP ================= */
  getAllStudents(): void {
    this.apiService.getAllStudents().subscribe((res: any) => {
      if (res?.success && Array.isArray(res.data)) {

        this.studentList = res.data.map((s: any) => {
          const batch = this.batchList.find(
            b => b.batch_code === s.batch_code
          );

          return {
            ...s,
            batch_name: batch?.batch_name || ''
          };
        });

        this.searchStudents();
      }
    });
  }

  /* ================= FILTER ================= */
  searchStudents(): void {
    const term = this.searchText.toLowerCase();

    this.filteredStudentList = this.studentList.filter(s => {
      const matchesTab =
        this.activeTab === 'BATCH'
          ? s.is_in_batch === 'Y'
          : s.is_in_batch !== 'Y';

      const matchesSearch =
        (s.first_name + s.last_name + s.email + s.phone_no)
          .toLowerCase()
          .includes(term);

      return matchesTab && matchesSearch;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredStudentList.length / this.itemsPerPage);
  }

  get paginatedStudents(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudentList.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  switchTab(tab: 'INDIVIDUAL' | 'BATCH'): void {
    this.activeTab = tab;
    this.searchText = '';
    this.searchStudents();
  }

  /* ================= MODALS ================= */
  openAddStudent(student: any = null): void {
    this.initForm();
    if (student) {
      this.studentForm.patchValue({
        ...student,
        is_in_batch: student.is_in_batch === 'Y'
      });
    }
    this.addStudentModal.open();
  }

  viewStudent(student: any): void {
    this.selectedStudent = student;
    this.viewStudentModal.open();
  }

  /* ================= SAVE ================= */
  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const v = this.studentForm.value;

    const payload: any = {
      ...v,
      is_in_batch: v.is_in_batch ? 'Y' : 'N',
      batch_code: v.is_in_batch ? v.batch_code : null
    };

    delete payload.confirm_password;

    const apiCall = v.student_code
      ? this.apiService.adminUpdateStudentDetails(payload)
      : this.apiService.addstudent(payload);

    apiCall.subscribe({
      next: (res: any) => {
        Swal.fire('Success', res.message || 'Student saved', 'success');
        this.addStudentModal.close();
        this.loadInitialData();
      },
      error: () => Swal.fire('Error', 'Failed to save student', 'error'),
      complete: () => (this.loading = false),
    });
  }
}
