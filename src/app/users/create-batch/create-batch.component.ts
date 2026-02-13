import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxCustomModalComponent } from "ngx-custom-modal";
import Swal from "sweetalert2";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-create-batch",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCustomModalComponent,
  ],
  templateUrl: "./create-batch.component.html",
})
export class CreateBatchComponent implements OnInit {
  @ViewChild("addBatchModal") addBatchModal!: NgxCustomModalComponent;

  batchForm!: FormGroup;
  batchList: any[] = []; // All batches from API
  searchText = "";
  loading = false;
  deleteLoading = false;
  standardsList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBatches();
    this.loadStandards();
  }

  initForm(): void {
    this.batchForm = this.fb.group({
      batch_name: ["", Validators.required],
      standard_id: ["", Validators.required],
    });
  }

  loadBatches(): void {
    this.apiService.getAllBatches().subscribe({
      next: (res: any) => {
        // Store all batches
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

  // Get only active batches (is_active === 'Y')
  get activeBatchList(): any[] {
    return this.batchList.filter((batch) => batch.is_active === "Y");
  }

  // Filter active batches based on search text
  get filteredActiveBatchList(): any[] {
    const term = this.searchText.toLowerCase().trim();

    if (!term) {
      return this.activeBatchList;
    }

    return this.activeBatchList.filter(
      (b) =>
        b.batch_name?.toLowerCase().includes(term) ||
        b.standard_name?.toLowerCase().includes(term) ||
        b.batch_code?.toLowerCase().includes(term),
    );
  }

  // Keep this for backward compatibility if needed
  get filteredBatchList(): any[] {
    return this.filteredActiveBatchList;
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
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.message || "Batch created successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        this.addBatchModal.close();
        this.loadBatches(); // Refresh the list
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err?.error?.message || "Failed to create batch",
        });
      },
      complete: () => (this.loading = false),
    });
  }

  confirmDelete(batch: any): void {
    // Determine which field contains the batch code/ID
    const batchCode = batch.batch_code || batch.batch_id;

    if (!batchCode) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Batch code not found",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete batch "${batch.batch_name}". This batch will be hidden from the active list.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.deleteBatch(batchCode, batch.batch_name);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  deleteBatch(batchCode: string, batchName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiService.deleteBatch(batchCode).subscribe({
        next: (res: any) => {
          // Update the local batch list to mark as inactive
          // This provides immediate UI feedback without waiting for the API
          const batchIndex = this.batchList.findIndex(
            (b) => b.batch_code === batchCode || b.batch_id === batchCode,
          );

          if (batchIndex !== -1) {
            // Update the batch status to inactive
            this.batchList[batchIndex].is_active = "N";
          }

          // Alternative: Reload all batches from server
          // this.loadBatches();

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text:
              res.message ||
              `Batch "${batchName}" has been deleted and is now hidden.`,
            timer: 2000,
            showConfirmButton: false,
          });
          resolve();
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: err?.error?.message || "Failed to delete batch",
          });
          reject(err);
        },
      });
    });
  }

  editBatch(batch: any): void {
    // This is a placeholder for edit functionality
    Swal.fire({
      icon: "info",
      title: "Coming Soon",
      text: "Edit functionality will be implemented soon!",
      timer: 2000,
      showConfirmButton: false,
    });
  }
}
