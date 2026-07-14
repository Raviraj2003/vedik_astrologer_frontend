import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

import { NgxCustomModalComponent } from "ngx-custom-modal";
import Swal from "sweetalert2";
import { ApiService } from "../../service/api.service";

type TabType = "INDIVIDUAL" | "BATCH";

@Component({
  selector: "app-addstudent",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCustomModalComponent,
  ],
  templateUrl: "./addstudent.component.html",
})
export class AddStudentComponent implements OnInit {
  @ViewChild("addStudentModal") addStudentModal!: NgxCustomModalComponent;
  @ViewChild("viewStudentModal") viewStudentModal!: NgxCustomModalComponent;

  studentForm!: FormGroup;

  studentList: any[] = [];
  filteredStudentList: any[] = [];
  batchList: any[] = [];
  selectedStudent: any = null;
  studentDetailsLoading = false;

  searchText = "";
  loading = false;
  isDeleting = false;
  showDeleteModal = false;
  studentToDelete: any = null;

  // Filter properties
  nameFilter: string = '';
  batchFilter: string = '';
  uniqueBatchList: string[] = [];

  // Sort properties
  sortField: string = 'first_name';
  sortDirection: 'asc' | 'desc' = 'asc';

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  activeTab: TabType = "BATCH";
  tabs: TabType[] = ["BATCH", "INDIVIDUAL"];
  
  // Store the mapping between user_code and student details
  studentDetailsMap: Map<string, any> = new Map();
  // Store batch assignments mapping - now storing array of batches
  batchAssignmentsMap: Map<string, any[]> = new Map();
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) { }

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
      },
    });
  }

  /* ================= FORM ================= */
  initForm(): void {
    this.studentForm = this.fb.group(
      {
        student_code: [""],
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [""],
        confirm_password: [""],
        phone_no: [
          "",
          [
            Validators.required,
            Validators.pattern("^[0-9]{10}$"),
          ],
        ],
        is_in_batch: [true],
        batch_code: [""],
      },
      { validators: this.passwordMatchValidator },
    );

    this.studentForm.get("is_in_batch")?.valueChanges.subscribe((checked) => {
      const ctrl = this.studentForm.get("batch_code");

      if (!checked) {
        ctrl?.clearValidators();
        ctrl?.setValue("");
      }

      ctrl?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const p = control.get("password")?.value;
    const c = control.get("confirm_password")?.value;
    if (!p && !c) return null;
    return p === c ? null : { passwordMismatch: true };
  }

  /* ================= GET ALL STUDENTS ================= */
  getAllStudents(): void {
    // First fetch the student batch assignments
    this.apiService.getStudentBatchAssignments().subscribe({
      next: (batchRes: any) => {
        console.log('Student batch assignments:', batchRes);
        
        // Create a map of stu_ref_code to batches array
        if (batchRes?.success && Array.isArray(batchRes.data)) {
          batchRes.data.forEach((assignment: any) => {
            if (assignment.stu_ref_code && assignment.batches) {
              this.batchAssignmentsMap.set(assignment.stu_ref_code, assignment.batches);
            }
          });
        }
        console.log('Batch assignments map:', this.batchAssignmentsMap);
        
        // Now fetch student details
        this.apiService.getAllStudentDetails().subscribe({
          next: (detailsRes: any) => {
            console.log('Student details from API:', detailsRes);
            
            // Create a map of user_ref_code to student details
            if (detailsRes?.success && Array.isArray(detailsRes.data)) {
              detailsRes.data.forEach((d: any) => {
                if (d.user_ref_code) {
                  this.studentDetailsMap.set(d.user_ref_code, d);
                }
              });
            }
            console.log('Student details map:', this.studentDetailsMap);
            
            // Now fetch the basic student list
            this.apiService.getAllStudents().subscribe({
              next: (res: any) => {
                console.log('Student list from API:', res);
                
                if (res?.success && Array.isArray(res.data)) {
                  this.studentList = res.data.map((s: any) => {
                    // Get the user_code from the student data
                    const userCode = s.user_code || s.stu_ref_code;
                    console.log(`Processing student: ${userCode}`);
                    
                    // Check if we have additional details for this student
                    const additionalDetails = this.studentDetailsMap.get(userCode);
                    console.log(`Additional details for ${userCode}:`, additionalDetails);
                    
                    // Check if we have batch assignments for this student
                    const batches = this.batchAssignmentsMap.get(s.stu_ref_code) || [];
                    console.log(`Batches for ${s.stu_ref_code}:`, batches);
                    
                    // Get the first batch name for display (or comma separated if multiple)
                    const batchNames = batches.map((b: any) => b.batch_name).filter(Boolean);
                    const displayBatchName = batchNames.length > 0 ? batchNames.join(', ') : '';
                    
                    // Find batch from batchList if no assignment found
                    const batchFromList = this.batchList.find(
                      (b) => b.batch_code === s.batch_code,
                    );
                    
                    // Build the student object with all fields
                    const student = {
                      // Basic fields from getAllStudents
                      user_code: s.user_code || '',
                      stu_ref_code: s.stu_ref_code || '',
                      first_name: s.first_name || '',
                      last_name: s.last_name || '',
                      email: s.email || '',
                      phone_no: s.phone_no || '',
                      is_in_batch: s.is_in_batch || 'N',
                      batch_code: s.batch_code || '',
                      student_type: s.student_type || '',
                      is_active: s.is_active || 'Y',
                      created_at: s.created_at || null,
                      updated_at: s.updated_at || null,
                      // Use batch names from assignments or from batch list
                      batch_name: displayBatchName || batchFromList?.batch_name || '',
                      batches: batches || [],
                      batch_count: batches.length || 0,
                      
                      // Additional fields from getAllStudentDetails if available
                      name: additionalDetails?.name || `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.email || 'Unknown',
                      contact_number: additionalDetails?.contact_number || s.phone_no || 'Not provided',
                      address: additionalDetails?.address || 'Not provided',
                      birth_date: additionalDetails?.birth_date || null,
                      birth_time: additionalDetails?.birth_time || 'Not provided',
                      qualification: additionalDetails?.qualification || 'Not provided',
                      class_mode: additionalDetails?.class_mode || 'Not specified',
                      whatsapp_group: additionalDetails?.whatsapp_group || 'Not specified',
                      studied_astrology: additionalDetails?.studied_astrology || 'N',
                      computer_knowledge: additionalDetails?.computer_knowledge || 'N',
                      user_ref_code: additionalDetails?.user_ref_code || s.user_code || '',
                    };
                    
                    console.log(`Final student object for ${userCode}:`, student);
                    return student;
                  });

                  // Sort the student list alphabetically by first_name
                  this.sortStudentList();

                  console.log('Final student list:', this.studentList);
                  this.updateUniqueBatchList();
                  this.applyFilters();
                }
              },
              error: (error) => {
                console.error('Error fetching student list:', error);
                this.studentList = [];
                this.applyFilters();
              }
            });
          },
          error: (error) => {
            console.error('Error fetching student details:', error);
            // Fallback: Use only the basic student data with batch assignments
            this.apiService.getAllStudents().subscribe({
              next: (res: any) => {
                if (res?.success && Array.isArray(res.data)) {
                  this.studentList = res.data.map((s: any) => {
                    const batches = this.batchAssignmentsMap.get(s.stu_ref_code) || [];
                    const batchNames = batches.map((b: any) => b.batch_name).filter(Boolean);
                    const displayBatchName = batchNames.length > 0 ? batchNames.join(', ') : '';
                    const batchFromList = this.batchList.find(
                      (b) => b.batch_code === s.batch_code,
                    );
                    
                    return {
                      user_code: s.user_code || '',
                      stu_ref_code: s.stu_ref_code || '',
                      first_name: s.first_name || '',
                      last_name: s.last_name || '',
                      email: s.email || '',
                      phone_no: s.phone_no || '',
                      is_in_batch: s.is_in_batch || 'N',
                      batch_code: s.batch_code || '',
                      student_type: s.student_type || '',
                      is_active: s.is_active || 'Y',
                      created_at: s.created_at || null,
                      updated_at: s.updated_at || null,
                      batch_name: displayBatchName || batchFromList?.batch_name || '',
                      batches: batches || [],
                      batch_count: batches.length || 0,
                      name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.email || 'Unknown',
                      contact_number: s.phone_no || 'Not provided',
                      address: 'Not provided',
                      birth_date: null,
                      birth_time: 'Not provided',
                      qualification: 'Not provided',
                      class_mode: 'Not specified',
                      whatsapp_group: 'Not specified',
                      studied_astrology: 'N',
                      computer_knowledge: 'N',
                      user_ref_code: s.user_code || '',
                    };
                  });
                  this.sortStudentList();
                  this.updateUniqueBatchList();
                  this.applyFilters();
                }
              },
              error: (err) => {
                console.error('Error fetching basic student list:', err);
                this.studentList = [];
                this.applyFilters();
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Error fetching batch assignments:', error);
        // Fallback: Continue without batch assignments
        this.getAllStudentsWithoutBatchAssignments();
      }
    });
  }

  /* ================= GET ALL STUDENTS WITHOUT BATCH ASSIGNMENTS (FALLBACK) ================= */
  getAllStudentsWithoutBatchAssignments(): void {
    this.apiService.getAllStudentDetails().subscribe({
      next: (detailsRes: any) => {
        if (detailsRes?.success && Array.isArray(detailsRes.data)) {
          detailsRes.data.forEach((d: any) => {
            if (d.user_ref_code) {
              this.studentDetailsMap.set(d.user_ref_code, d);
            }
          });
        }
        
        this.apiService.getAllStudents().subscribe({
          next: (res: any) => {
            if (res?.success && Array.isArray(res.data)) {
              this.studentList = res.data.map((s: any) => {
                const userCode = s.user_code || s.stu_ref_code;
                const additionalDetails = this.studentDetailsMap.get(userCode);
                const batch = this.batchList.find(
                  (b) => b.batch_code === s.batch_code,
                );
                
                return {
                  user_code: s.user_code || '',
                  stu_ref_code: s.stu_ref_code || '',
                  first_name: s.first_name || '',
                  last_name: s.last_name || '',
                  email: s.email || '',
                  phone_no: s.phone_no || '',
                  is_in_batch: s.is_in_batch || 'N',
                  batch_code: s.batch_code || '',
                  student_type: s.student_type || '',
                  is_active: s.is_active || 'Y',
                  created_at: s.created_at || null,
                  updated_at: s.updated_at || null,
                  batch_name: batch?.batch_name || '',
                  batches: [],
                  batch_count: 0,
                  name: additionalDetails?.name || `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.email || 'Unknown',
                  contact_number: additionalDetails?.contact_number || s.phone_no || 'Not provided',
                  address: additionalDetails?.address || 'Not provided',
                  birth_date: additionalDetails?.birth_date || null,
                  birth_time: additionalDetails?.birth_time || 'Not provided',
                  qualification: additionalDetails?.qualification || 'Not provided',
                  class_mode: additionalDetails?.class_mode || 'Not specified',
                  whatsapp_group: additionalDetails?.whatsapp_group || 'Not specified',
                  studied_astrology: additionalDetails?.studied_astrology || 'N',
                  computer_knowledge: additionalDetails?.computer_knowledge || 'N',
                  user_ref_code: additionalDetails?.user_ref_code || s.user_code || '',
                };
              });
              this.sortStudentList();
              this.updateUniqueBatchList();
              this.applyFilters();
            }
          },
          error: (err) => {
            console.error('Error fetching student list:', err);
            this.studentList = [];
            this.applyFilters();
          }
        });
      },
      error: (error) => {
        console.error('Error fetching student details:', error);
        this.apiService.getAllStudents().subscribe({
          next: (res: any) => {
            if (res?.success && Array.isArray(res.data)) {
              this.studentList = res.data.map((s: any) => {
                const batch = this.batchList.find(
                  (b) => b.batch_code === s.batch_code,
                );
                return {
                  user_code: s.user_code || '',
                  stu_ref_code: s.stu_ref_code || '',
                  first_name: s.first_name || '',
                  last_name: s.last_name || '',
                  email: s.email || '',
                  phone_no: s.phone_no || '',
                  is_in_batch: s.is_in_batch || 'N',
                  batch_code: s.batch_code || '',
                  student_type: s.student_type || '',
                  is_active: s.is_active || 'Y',
                  created_at: s.created_at || null,
                  updated_at: s.updated_at || null,
                  batch_name: batch?.batch_name || '',
                  batches: [],
                  batch_count: 0,
                  name: `${s.first_name || ''} ${s.last_name || ''}`.trim() || s.email || 'Unknown',
                  contact_number: s.phone_no || 'Not provided',
                  address: 'Not provided',
                  birth_date: null,
                  birth_time: 'Not provided',
                  qualification: 'Not provided',
                  class_mode: 'Not specified',
                  whatsapp_group: 'Not specified',
                  studied_astrology: 'N',
                  computer_knowledge: 'N',
                  user_ref_code: s.user_code || '',
                };
              });
              this.sortStudentList();
              this.updateUniqueBatchList();
              this.applyFilters();
            }
          },
          error: (err) => {
            console.error('Error fetching student list:', err);
            this.studentList = [];
            this.applyFilters();
          }
        });
      }
    });
  }

  /* ================= SORT STUDENT LIST ================= */
  sortStudentList(): void {
    this.studentList.sort((a, b) => {
      const aName = (a.first_name || '').toLowerCase();
      const bName = (b.first_name || '').toLowerCase();
      
      if (this.sortDirection === 'asc') {
        return aName.localeCompare(bName);
      } else {
        return bName.localeCompare(aName);
      }
    });
  }

  /* ================= TOGGLE SORT ================= */
  toggleSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortStudentList();
    this.applyFilters();
  }

  /* ================= APPLY FILTERS ================= */
  applyFilters(): void {
    const nameTerm = this.nameFilter?.toLowerCase() || '';
    const batchTerm = this.batchFilter?.toLowerCase() || '';
    const searchTerm = this.searchText?.toLowerCase() || '';

    this.filteredStudentList = this.studentList.filter((s) => {
      // Tab filter
      const matchesTab =
        this.activeTab === "BATCH"
          ? s.is_in_batch === "Y"
          : s.is_in_batch !== "Y";

      // Name filter - search in first_name, last_name, and full name
      const fullName = `${s.first_name || ''} ${s.last_name || ''}`.toLowerCase();
      const matchesName = !nameTerm || 
        fullName.includes(nameTerm) || 
        (s.first_name?.toLowerCase() || '').includes(nameTerm) ||
        (s.last_name?.toLowerCase() || '').includes(nameTerm) ||
        (s.name?.toLowerCase() || '').includes(nameTerm);

      // Batch filter - check if student has the selected batch
      let matchesBatch = true;
      if (batchTerm) {
        // Check if student has batches
        if (s.batches && s.batches.length > 0) {
          // Check if any batch matches the filter
          matchesBatch = s.batches.some((b: any) => 
            b.batch_name?.toLowerCase().includes(batchTerm) ||
            b.batch_code?.toLowerCase().includes(batchTerm)
          );
        } else {
          // If no batches and filter is not empty, don't match
          matchesBatch = false;
        }
      }

      // Search text filter (existing)
      const searchText = (s.first_name + s.last_name + s.email + s.phone_no + s.name)
        .toLowerCase();
      const matchesSearch = !searchTerm || searchText.includes(searchTerm);

      return matchesTab && matchesName && matchesBatch && matchesSearch;
    });

    // Reset pagination
    this.currentPage = 1;
    this.totalPages = Math.ceil(
      this.filteredStudentList.length / this.itemsPerPage,
    );
  }

  /* ================= UPDATE UNIQUE BATCH LIST ================= */
  updateUniqueBatchList(): void {
    const batchSet = new Set<string>();
    this.studentList.forEach((s) => {
      if (s.batches && s.batches.length > 0) {
        s.batches.forEach((b: any) => {
          if (b.batch_name) {
            batchSet.add(b.batch_name);
          }
        });
      } else if (s.batch_name) {
        batchSet.add(s.batch_name);
      }
    });
    this.uniqueBatchList = Array.from(batchSet).sort();
  }

  /* ================= CLEAR FILTERS ================= */
  clearFilters(): void {
    this.nameFilter = '';
    this.batchFilter = '';
    this.searchText = '';
    this.applyFilters();
  }

  /* ================= SEARCH STUDENTS ================= */
  searchStudents(): void {
    this.applyFilters();
  }

  get paginatedStudents(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudentList.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  switchTab(tab: TabType): void {
    this.activeTab = tab;
    this.searchText = "";
    this.nameFilter = "";
    this.batchFilter = "";
    this.applyFilters();
  }

  /* ================= MODALS ================= */
  openAddStudent(student: any = null): void {
    this.initForm();

    if (student) {
      this.studentForm.patchValue({
        stu_ref_code: student.stu_ref_code || student.user_code,
        student_code: student.stu_ref_code || student.user_code,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        phone_no: student.phone_no,
        is_in_batch: student.is_in_batch === "Y",
        batch_code: student.batch_code || ""
      });
    } else {
      this.loading = false;
    }

    this.addStudentModal.open();
  }

  /* ================= VIEW STUDENT DETAILS ================= */
  viewStudent(student: any): void {
    this.studentDetailsLoading = false;
    
    this.selectedStudent = {
      name: student.name || `${student.first_name || ''} ${student.last_name || ''}`.trim() || 'Unknown',
      email: student.email || 'Not provided',
      contact_number: student.contact_number || student.phone_no || 'Not provided',
      phone_no: student.phone_no || student.contact_number || 'Not provided',
      address: student.address || 'Not provided',
      birth_date: student.birth_date || null,
      birth_time: student.birth_time || 'Not provided',
      qualification: student.qualification || 'Not provided',
      class_mode: student.class_mode || 'Not specified',
      whatsapp_group: student.whatsapp_group || 'Not specified',
      studied_astrology: student.studied_astrology || 'N',
      computer_knowledge: student.computer_knowledge || 'N',
      user_ref_code: student.user_ref_code || student.user_code || student.stu_ref_code || 'N/A',
      stu_ref_code: student.stu_ref_code || student.user_code || 'N/A',
      user_code: student.user_code || student.stu_ref_code || 'N/A',
      first_name: student.first_name || '',
      last_name: student.last_name || '',
      batch_name: student.batch_name || '',
      batch_code: student.batch_code || '',
      is_in_batch: student.is_in_batch || 'N',
      student_type: student.student_type || '',
      created_at: student.created_at || null,
      updated_at: student.updated_at || null,
      batches: student.batches || [],
      batch_count: student.batch_count || 0,
    };
    
    this.viewStudentModal.open();
  }
  
  /* ================= CLOSE VIEW MODAL ================= */
  closeViewModal(): void {
    this.viewStudentModal.close();
    this.selectedStudent = null;
  }

  /* ================= SHOW BATCH DETAILS ================= */
  showBatchDetails(student: any): void {
    const batches = student.batches || [];
    
    if (batches.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Batch Assigned',
        text: 'This student is not assigned to any batch.',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }
    
    const studentName = `${student.first_name || ''} ${student.last_name || ''}`.trim() || student.email || 'Unknown';
    
    let batchListHTML = '';
    batches.forEach((batch: any, index: number) => {
      const isLast = index === batches.length - 1;
      batchListHTML += `
        <div class="flex items-center justify-between ${!isLast ? 'border-b border-gray-200 dark:border-gray-700 pb-2 mb-2' : ''}">
          <span class="text-sm text-gray-600 dark:text-gray-400">Batch ${index + 1}</span>
          <div class="text-right">
            <span class="text-sm font-semibold text-green-700 dark:text-green-300">${batch.batch_name || 'N/A'}</span>
            ${batch.batch_code ? `<br><span class="text-xs font-mono text-gray-500 dark:text-gray-400">Code: ${batch.batch_code}</span>` : ''}
          </div>
        </div>
      `;
    });
    
    Swal.fire({
      icon: 'success',
      title: '📚 Batch Information',
      html: `
        <div class="text-left">
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">Student:</span>
              <span class="text-sm font-semibold text-gray-800 dark:text-white">${studentName}</span>
            </div>
          </div>
          <div class="space-y-2">
            ${batchListHTML}
          </div>
          <div class="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
            Total Batches: ${batches.length}
          </div>
        </div>
      `,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: '✅ Close',
      showCloseButton: true,
      width: '450px',
    });
  }

  /* ================= DELETE STUDENT ================= */
  confirmDelete(student: any): void {
    this.studentToDelete = student;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.studentToDelete = null;
    this.isDeleting = false;
  }

  deleteStudent(): void {
    if (!this.studentToDelete) return;
    
    this.isDeleting = true;
    const userRefCode = this.studentToDelete.user_ref_code || this.studentToDelete.user_code || this.studentToDelete.stu_ref_code;
    
    this.apiService.deleteStudentDetails(userRefCode).subscribe({
      next: (res: any) => {
        this.isDeleting = false;
        if (res?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: res.message || 'Student deleted successfully',
            confirmButtonColor: '#3b82f6',
          });
          this.closeDeleteModal();
          this.loadInitialData();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res?.message || 'Failed to delete student',
            confirmButtonColor: '#3b82f6',
          });
        }
      },
      error: (error) => {
        this.isDeleting = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error?.error?.message || 'Failed to delete student',
          confirmButtonColor: '#3b82f6',
        });
      }
    });
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
      stu_ref_code: v.student_code,
      first_name: v.first_name,
      last_name: v.last_name,
      email: v.email,
      phone_no: v.phone_no,
      password: v.password,
      is_in_batch: v.is_in_batch ? "Y" : "N",
    };

    delete payload.confirm_password;

    if (!payload.password) {
      delete payload.password;
    }

    const apiCall = v.student_code
      ? this.apiService.editStudent(payload)
      : this.apiService.addstudent(payload);

    apiCall.subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message || "Student saved",
          confirmButtonColor: '#3b82f6',
        });
        this.addStudentModal.close();
        this.loadInitialData();
        this.loading = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save student',
          confirmButtonColor: '#3b82f6',
        });
        this.loading = false;
      },
    });
  }
}