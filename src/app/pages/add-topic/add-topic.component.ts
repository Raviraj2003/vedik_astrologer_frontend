import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-add-topic",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-topic.component.html",
  styleUrls: ["./add-topic.component.css"],
})
export class AddTopicComponent implements OnInit {
  isModalOpen = false;

  // ✅ FORM MODEL (ONLY REQUIRED FIELDS)
  newTopic = {
    topic_name: "",
    topic_description: "",
  };

  topics: any[] = [];
  isLoading = false;
  isSubmitting = false;

  successMessage = "";
  errorMessage = "";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTopics();
  }

  // ===============================
  // 📥 LOAD TOPICS
  // ===============================
  loadTopics(): void {
    this.isLoading = true;

    this.apiService.getTopicList().subscribe({
      next: (response) => {
        if (response.success) {
          this.topics = response.data || [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading topics:", error);
        this.errorMessage = "Failed to load topics.";
        this.isLoading = false;
      },
    });
  }

  // ===============================
  // 🪟 MODAL HANDLING
  // ===============================
  openModal(): void {
    this.isModalOpen = true;
    this.resetForm();
    this.clearMessages();
    document.body.style.overflow = "hidden";
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
    this.clearMessages();
    document.body.style.overflow = "auto";
  }

  // ===============================
  // 🔄 HELPERS
  // ===============================
  resetForm(): void {
    this.newTopic = {
      topic_name: "",
      topic_description: "",
    };
  }

  clearMessages(): void {
    this.successMessage = "";
    this.errorMessage = "";
  }

  // ===============================
  // 📤 SUBMIT
  // ===============================
  onSubmit(): void {
    if (!this.newTopic.topic_name.trim()) {
      this.errorMessage = "Topic name is required";
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    const topicData = {
      topic_name: this.newTopic.topic_name,
      topic_description: this.newTopic.topic_description || undefined,
      // created_by ❌ DO NOT SEND (take from token)
    };

    this.apiService.addTopic(topicData).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = response.message || "Topic added successfully!";
          this.topics.unshift(response.data);

          setTimeout(() => {
            this.closeModal();
          }, 1200);
        } else {
          this.errorMessage = response.message || "Failed to add topic";
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error("Error adding topic:", error);
        this.errorMessage = "Something went wrong. Try again.";
        this.isSubmitting = false;
      },
    });
  }
}
