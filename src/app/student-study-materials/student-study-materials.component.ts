import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";

interface StudentMedia {
  ref_code: string;
  file_name: string;
  file_type: string;
  file_path: string;
  title: string;
  description: string;
  created_at: string;
  batch_code: string;
}

interface Batch {
  batch_code: string;
  batch_name: string;
}

@Component({
  selector: "app-student-study-materials",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./student-study-materials.component.html",
  styleUrl: "./student-study-materials.component.css",
})
export class StudentStudyMaterialsComponent implements OnInit {
  isLoading = true;

  // 🔹 batches
  batchList: Batch[] = [];
  selectedBatchCode: string = "";

  // 🔹 materials
  materials: StudentMedia[] = [];
  filteredMaterials: StudentMedia[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  /* ================= LOAD BATCHES ================= */

  loadBatches(): void {
    this.api.getAllBatches().subscribe({
      next: (res) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];

        // select first batch by default
        if (this.batchList.length > 0) {
          this.selectedBatchCode = this.batchList[0].batch_code;
          this.loadMaterials();
        }
      },
      error: () => {
        this.batchList = [];
        this.isLoading = false;
      },
    });
  }

  /* ================= LOAD MATERIALS ================= */

  loadMaterials(): void {
    this.api.getStudentStudyMaterials().subscribe({
      next: (res) => {
        this.materials = res.data || [];
        this.filterByBatch();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  /* ================= FILTER ================= */

  filterByBatch(): void {
    this.filteredMaterials = this.materials.filter(
      (m) => m.batch_code === this.selectedBatchCode,
    );
  }

  /* ================= FILE TYPE ================= */

  getFileType(type: string): "PDF" | "IMAGE" | "VIDEO" | "OTHER" {
    if (type?.includes("pdf")) return "PDF";
    if (type?.includes("image")) return "IMAGE";
    if (type?.includes("video")) return "VIDEO";
    return "OTHER";
  }
}
