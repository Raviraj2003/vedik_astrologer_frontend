import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../service/api.service";

interface StudentMedia {
  ref_code: string;
  file_name: string;
  file_type: string;
  file_path: string;
  title: string;
  description: string;
  created_at: string;
}

@Component({
  selector: "app-student-study-materials",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./student-study-materials.component.html",
  styleUrl: "./student-study-materials.component.css",
})
export class StudentStudyMaterialsComponent implements OnInit {
  materials: StudentMedia[] = [];
  isLoading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.api.getStudentStudyMaterials().subscribe({
      next: (res) => {
        this.materials = res.data || [];

        this.isLoading = false;
      },
      error: (err) => {
        console.error("Failed to load study materials", err);
        this.isLoading = false;
      },
    });
  }

  getFileType(type: string): "PDF" | "IMAGE" | "VIDEO" | "OTHER" {
    if (type.includes("pdf")) return "PDF";
    if (type.includes("image")) return "IMAGE";
    if (type.includes("video")) return "VIDEO";
    return "OTHER";
  }
}
