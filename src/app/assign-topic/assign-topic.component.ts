import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-assign-topic",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./assign-topic.component.html",
  styleUrl: "./assign-topic.component.css",
})
export class AssignTopicComponent implements OnInit {
  // 🔹 Data
  batches: any[] = [];
  classes: any[] = [];

  // 🔹 Selected values
  selectedBatchCode = "";
  isLoading = false;

  successMsg = "";
  errorMsg = "";

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  /* ================================
     LOAD ALL BATCHES
  ================================= */
  loadBatches(): void {
    this.api.getAllBatches().subscribe({
      next: (res: any) => {
        this.batches = res.data || [];
      },
      error: () => {
        this.errorMsg = "Failed to load batches";
      },
    });
  }

  /* ================================
     WHEN BATCH SELECTED
  ================================= */
  onBatchChange(): void {
    this.classes = [];
    this.successMsg = "";
    this.errorMsg = "";

    if (!this.selectedBatchCode) return;

    this.isLoading = true;

    // 👉 reuse student classes API (admin can use it too)
    this.api.getStudentClasses(this.selectedBatchCode).subscribe({
      next: (res: any) => {
        this.classes = res.data || [];
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = "Failed to load class slots";
        this.isLoading = false;
      },
    });
  }

  /* ================================
     UPDATE TOPIC
  ================================= */
  updateTopic(c: any): void {
    this.successMsg = "";
    this.errorMsg = "";

    if (!c.topic || !c.class_date || !c.schedule_id) {
      this.errorMsg = "⚠️ Please enter a topic before saving.";
      return;
    }

    this.api
      .updateClassTopicByDate({
        schedule_id: c.schedule_id,
        class_date: c.class_date,
        topic: c.topic,
      })
      .subscribe({
        next: () => {
          const formattedDate = new Date(c.class_date).toLocaleDateString(
            "en-IN",
            { day: "2-digit", month: "short", year: "numeric" },
          );

          this.successMsg = `✅ Topic updated successfully.
Batch: ${this.selectedBatchCode} • Date: ${formattedDate}`;

          // Auto clear message after 3 seconds (recommended)
          setTimeout(() => {
            this.successMsg = "";
          }, 3000);
        },
        error: () => {
          this.errorMsg = `❌ Failed to update topic.
Please try again or check your connection.`;

          setTimeout(() => {
            this.errorMsg = "";
          }, 4000);
        },
      });
  }
}
