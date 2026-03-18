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

  // ✅ STANDARDS
  standards: any[] = [];
  selectedStandardId: number | null = null;
  isLoadingStandards = false;

  // ✅ FILTER
  selectedFilterStandardId: number | null = null;
  filteredTopics: any[] = [];
  allTopics: any[] = [];

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

  // Standard colors for visual differentiation
  standardColors: { [key: number]: { bg: string, text: string } } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
  }

  // ===============================
  // 📥 LOAD STANDARDS
  // ===============================
  loadStandards(): void {
    this.isLoadingStandards = true;
    
    this.apiService.getStandards().subscribe({
      next: (response) => {
        if (response.success) {
          this.standards = response.data || [];
          console.log('✅ Standards loaded:', this.standards);
          console.log('Standard IDs:', this.standards.map(s => s.standard_id));
          console.log('Standard Names:', this.standards.map(s => s.standard_name));
          
          this.generateStandardColors();
          this.loadTopics(); // Load topics after standards
        } else {
          this.errorMessage = "Failed to load standards";
        }
        this.isLoadingStandards = false;
      },
      error: (error) => {
        console.error("❌ Error loading standards:", error);
        this.errorMessage = "Failed to load standards. Please try again.";
        this.isLoadingStandards = false;
      },
    });
  }

  // Generate consistent colors for each standard
  generateStandardColors(): void {
    const colors = [
      { bg: '#e6f0ff', text: '#2563eb' }, // Blue
      { bg: '#e6f7e6', text: '#0b5e42' }, // Green
      { bg: '#fee9e7', text: '#a12b2b' }, // Red
      { bg: '#fef3c7', text: '#92400e' }, // Yellow
      { bg: '#f3e8ff', text: '#6b21a8' }, // Purple
      { bg: '#ffe4e6', text: '#9d174d' }, // Pink
      { bg: '#cffafe', text: '#0891b2' }, // Cyan
      { bg: '#ecfdf5', text: '#065f46' }, // Emerald
    ];

    this.standards.forEach((standard, index) => {
      if (standard && standard.standard_id) {
        this.standardColors[standard.standard_id] = colors[index % colors.length];
      }
    });
  }

  // Get standard color
  getStandardColor(standardId: number): string {
    if (!standardId) return '#e6f0ff';
    return this.standardColors[standardId]?.bg || '#e6f0ff';
  }

  // Get standard text color
  getStandardTextColor(standardId: number): string {
    if (!standardId) return '#2563eb';
    return this.standardColors[standardId]?.text || '#2563eb';
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
          this.allTopics = response.data || [];
          console.log('✅ Topics loaded:', this.allTopics);
          console.log('Topic standard_ids:', this.allTopics.map(t => t.standard_id));
          
          // Check if any topics have standard_id
          const topicsWithStandardId = this.allTopics.filter(t => t.standard_id);
          console.log('Topics with standard_id:', topicsWithStandardId.length);
          
          if (topicsWithStandardId.length === 0) {
            console.warn('⚠️ No topics have standard_id assigned!');
          }
          
          // Map standard names to topics
          this.allTopics = this.allTopics.map(topic => {
            const standardName = this.getStandardName(topic.standard_id);
            console.log(`Topic ${topic.id}: standard_id=${topic.standard_id}, mapped name=${standardName}`);
            return {
              ...topic,
              standard_name: standardName
            };
          });
          
          console.log('✅ Topics with standard names:', this.allTopics);
          
          // Reset filter
          this.selectedFilterStandardId = null;
          this.applyFilter();
        } else {
          this.errorMessage = "Failed to load topics";
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error("❌ Error loading topics:", error);
        this.errorMessage = "Failed to load topics. Please try again.";
        this.isLoading = false;
      },
    });
  }

  // ===============================
  // 🔍 FILTER METHODS
  // ===============================
applyFilter(): void {
  console.log('🔍 Applying filter with standard:', this.selectedFilterStandardId);
  console.log('All topics count:', this.allTopics.length);
  
  if (!this.allTopics.length) {
    console.warn('No topics to filter');
    this.filteredTopics = [];
    this.topics = [];
    return;
  }
  
  if (this.selectedFilterStandardId) {
    // Convert to number to ensure type matching
    const filterId = Number(this.selectedFilterStandardId);
    console.log('Filtering for standard_id:', filterId);
    
    const availableIds = [...new Set(this.allTopics.map(t => t.standard_id))];
    console.log('Available standard_ids in topics:', availableIds);
    
    this.filteredTopics = this.allTopics.filter(topic => {
      const topicId = Number(topic.standard_id);
      const match = topicId === filterId;
      console.log(`Topic ${topic.id}: standard_id=${topicId}, filter=${filterId}, match=${match}`);
      return match;
    });
    
    console.log(`Found ${this.filteredTopics.length} matching topics`);
  } else {
    console.log('No filter, showing all topics');
    this.filteredTopics = [...this.allTopics];
  }
  
  this.topics = [...this.filteredTopics];
  console.log('📊 Final topics to display:', this.topics.length);
}
  filterByStandard(standardId: number): void {
    console.log('🔍 Filtering by standard:', standardId);
    this.selectedFilterStandardId = standardId;
    this.applyFilter();
  }

  clearFilter(): void {
    console.log('🧹 Clearing filter');
    this.selectedFilterStandardId = null;
    this.applyFilter();
  }

  getTopicCountByStandard(standardId: number): number {
    if (!standardId || !this.allTopics.length) return 0;
    return this.allTopics.filter(topic => topic.standard_id === standardId).length;
  }

  // ===============================
  // 🪟 MODAL HANDLING
  // ===============================
  openModal(): void {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.editingTopicId = null;
    this.selectedStandardId = null;
    this.resetForm();
    this.clearMessages();
    document.body.style.overflow = "hidden";
  }

  openEditModal(topic: any): void {
    this.isModalOpen = true;
    this.isEditMode = true;
    this.editingTopicId = topic.id;

    this.newTopic = {
      topic_name: topic.topic_name || "",
      topic_description: topic.topic_description || "",
    };
    
    this.selectedStandardId = topic.standard_id || null;

    this.clearMessages();
    document.body.style.overflow = "hidden";
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isEditMode = false;
    this.editingTopicId = null;
    this.selectedStandardId = null;
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

  getStandardName(standardId: number): string {
    if (!standardId) {
      return 'No Standard';
    }
    
    // Convert to number if it's a string
    const id = typeof standardId === 'string' ? parseInt(standardId, 10) : standardId;
    
    const standard = this.standards.find(s => s && s.standard_id === id);
    
    if (standard) {
      return standard.standard_name;
    }
    
    // If standard not found, return the ID with a prefix
    console.warn(`Standard not found for ID: ${id}`);
    return `Standard ${id}`;
  }

  // ===============================
  // 📤 SUBMIT (Create or Update)
  // ===============================
  onSubmit(): void {
    if (!this.newTopic.topic_name.trim()) {
      this.errorMessage = "Topic name is required";
      return;
    }

    if (!this.selectedStandardId) {
      this.errorMessage = "Please select a standard";
      return;
    }

    this.isSubmitting = true;
    this.clearMessages();

    if (this.isEditMode && this.editingTopicId) {
      const updateData = {
        id: this.editingTopicId,
        topic_name: this.newTopic.topic_name,
        topic_description: this.newTopic.topic_description || undefined,
        standard_id: this.selectedStandardId
      };

      this.apiService.updateTopic(updateData).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = response.message || "Topic updated successfully!";

            const index = this.allTopics.findIndex(t => t.id === this.editingTopicId);
            if (index !== -1) {
              this.allTopics[index] = {
                ...this.allTopics[index],
                topic_name: this.newTopic.topic_name,
                topic_description: this.newTopic.topic_description,
                standard_id: this.selectedStandardId,
                standard_name: this.getStandardName(this.selectedStandardId!)
              };
            }

            this.applyFilter();

            setTimeout(() => {
              this.closeModal();
              this.successMessage = "";
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
      const topicData = {
        topic_name: this.newTopic.topic_name,
        topic_description: this.newTopic.topic_description || undefined,
        standard_id: this.selectedStandardId
      };

      this.apiService.addTopic(topicData).subscribe({
        next: (response) => {
          if (response.success) {
            this.successMessage = response.message || "Topic added successfully!";
            
            const newTopic = {
              ...response.data,
              standard_name: this.getStandardName(this.selectedStandardId!)
            };
            
            this.allTopics.unshift(newTopic);
            this.applyFilter();

            setTimeout(() => {
              this.closeModal();
              this.successMessage = "";
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
            this.allTopics = this.allTopics.filter(t => t.id !== id);
            this.applyFilter();

            this.successMessage = response.message || "Topic deleted successfully!";

            setTimeout(() => {
              this.successMessage = "";
            }, 3000);
          } else {
            this.errorMessage = response.message || "Failed to delete topic";

            setTimeout(() => {
              this.errorMessage = "";
            }, 3000);
          }
          this.deletingTopicId = null;
        },
        error: (error) => {
          console.error("Error deleting topic:", error);
          this.errorMessage = "Something went wrong. Please try again.";

          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);

          this.deletingTopicId = null;
        },
      });
    }
  }
}