import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ ADD FormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import Swal from 'sweetalert2';
import { ApiService } from '../../service/api.service';

@Component({
  selector: "app-create-batch",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ✅ REQUIRED for ngModel
    ReactiveFormsModule,
    NgxCustomModalComponent,
  ],
  templateUrl: "./create-batch.component.html",
})
export class CreateBatchComponent implements OnInit {
  @ViewChild("addBatchModal") addBatchModal!: NgxCustomModalComponent;

  batchForm!: FormGroup;
  batchList: any[] = [];
  searchText = "";
  loading = false;
  standardsList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBatches();
    this.loadStandards(); // ✅ ADD
  }

  initForm(): void {
    this.batchForm = this.fb.group({
      batch_name: ["", Validators.required],
      standard_id: ["", Validators.required], // ✅ ADD
    });
  }

  loadBatches(): void {
    this.apiService.getAllBatches().subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => {
        this.batchList = [];
      },
    });
  }

  loadStandards(): void {
    this.apiService.getStandards().subscribe({
      next: (res: any) => {
        this.standardsList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => {
        this.standardsList = [];
      },
    });
  }

  get filteredBatchList(): any[] {
    const term = this.searchText.toLowerCase();
    return this.batchList.filter((b) =>
      b.batch_name.toLowerCase().includes(term),
    );
  }

  openAddBatch(): void {
    this.batchForm.reset();
    this.addBatchModal.open();
  }

  saveBatch(): void {
    if (this.batchForm.invalid) {
      this.batchForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.apiService.createBatch(this.batchForm.value).subscribe({
      next: (res: any) => {
        Swal.fire(
          "Success",
          res.message || "Batch created successfully",
          "success",
        );
        this.addBatchModal.close();
        this.loadBatches();
      },
      error: (err) => {
        Swal.fire(
          "Error",
          err?.error?.message || "Failed to create batch",
          "error",
        );
      },
      complete: () => (this.loading = false),
    });
  }
}
