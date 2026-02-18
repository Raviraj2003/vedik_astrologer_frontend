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
  isEditMode = false;
  editingTopicId: number | null = null;
  deletingTopicId: number | null = null;

  // ✅ FORM MODEL
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
    this.clearMessages();

    this.apiService.getTopicList().subscribe({
      next: (response) => {
        if (response.success) {
          this.topics = response.data || [];
        } else {
          // Since response doesn't have message property, use a generic message
          this.errorMessage = "Failed to load topics";
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading topics:", error);
        this.errorMessage = "Failed to load topics. Please try again.";
        this.isLoading = false;
      },
    });
  }

  // ===============================
  // 🪟 MODAL HANDLING
  // ===============================
  openModal(): void {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.editingTopicId = null;
    this.resetForm();
    this.clearMessages();
    document.body.style.overflow = "hidden";
  }

  openEditModal(topic: any): void {
    this.isModalOpen = true;
    this.isEditMode = true;
    this.editingTopicId = topic.id;

    // Populate form with existing data
    this.newTopic = {
      topic_name: topic.topic_name || "",
      topic_description: topic.topic_description || "",
    };

    this.clearMessages();
    document.body.style.overflow = "hidden";
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.editingTopicId = null;
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
  // 📤 SUBMIT (Create or Update)
  // ===============================
  onSubmit(): void {
    if (!this.newTopic.topic_name.trim()) {
      this.errorMessage = "Topic name is required";
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    if (this.isEditMode && this.editingTopicId) {
      // 🔄 UPDATE EXISTING TOPIC
      const updateData = {
        id: this.editingTopicId,
        topic_name: this.newTopic.topic_name,
        topic_description: this.newTopic.topic_description || undefined,
      };

      this.apiService.updateTopic(updateData).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage =
              response.message || "Topic updated successfully!";

            // Update the topic in the local array
            const index = this.topics.findIndex(
              (t) => t.id === this.editingTopicId,
            );
            if (index !== -1) {
              this.topics[index] = {
                ...this.topics[index],
                topic_name: this.newTopic.topic_name,
                topic_description: this.newTopic.topic_description,
              };
            }

            setTimeout(() => {
              this.closeModal();
              this.successMessage = ""; // Clear message after modal closes
            }, 1200);
          } else {
            this.errorMessage = response.message || "Failed to update topic";
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error("Error updating topic:", error);
          this.errorMessage = "Something went wrong. Please try again.";
          this.isSubmitting = false;
        },
      });
    } else {
      // ✨ CREATE NEW TOPIC
      const topicData = {
        topic_name: this.newTopic.topic_name,
        topic_description: this.newTopic.topic_description || undefined,
      };

      this.apiService.addTopic(topicData).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage =
              response.message || "Topic added successfully!";
            this.topics.unshift(response.data);

            setTimeout(() => {
              this.closeModal();
              this.successMessage = ""; // Clear message after modal closes
            }, 1200);
          } else {
            this.errorMessage = response.message || "Failed to add topic";
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error("Error adding topic:", error);
          this.errorMessage = "Something went wrong. Please try again.";
          this.isSubmitting = false;
        },
      });
    }
  }

  // ===============================
  // 🗑️ DELETE TOPIC
  // ===============================
  deleteTopic(id: number): void {
    if (confirm("Are you sure you want to delete this topic?")) {
      this.deletingTopicId = id;
      this.clearMessages();

      this.apiService.deleteTopic(id).subscribe({
        next: (response) => {
          if (response.success) {
            // Remove the topic from the local array
            this.topics = this.topics.filter((t) => t.id !== id);

            // Show success message
            this.successMessage =
              response.message || "Topic deleted successfully!";

            // Clear success message after 3 seconds
            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          } else {
            this.errorMessage = response.message || "Failed to delete topic";

            // Clear error message after 3 seconds
            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          }
          this.deletingTopicId = null;
        },
        error: (error) => {
          console.error("Error deleting topic:", error);
          this.errorMessage = "Something went wrong. Please try again.";

          // Clear error message after 3 seconds
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);

          this.deletingTopicId = null;
        },
      });
    }
  }
}
