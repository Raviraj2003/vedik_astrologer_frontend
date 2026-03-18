import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-assign-topic",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./assign-topic.component.html",
  styleUrls: ["./assign-topic.component.css"]
})
export class AssignTopicComponent implements OnInit, OnDestroy {
  /* ================= MASTER ================= */
  standards: any[] = [];
  batches: any[] = [];
  topics: any[] = [];

  /* ================= CLASS GROUPS ================= */
  classes: any[] = [];

  selectedStandardId: number | "" = "";
  selectedBatchCode = "";

  isLoading = false;
  isAssigning = false;
  assigningSlotId: string | null = null;

  errorMsg = "";

  /* ================= SUCCESS MODAL ================= */
  showSuccessModal = false;
  private modalTimeout: any;

  /* ================= STORAGE KEYS ================= */
  private readonly STORAGE_KEY = 'assigned_topics';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
    this.loadTopics();
  }

  ngOnDestroy(): void {
    if (this.modalTimeout) {
      clearTimeout(this.modalTimeout);
    }
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.api.getStandards().subscribe({
      next: (res: any) => {
        this.standards = res?.data || [];
      },
      error: () => {
        this.showError("❌ Failed to load standards");
      },
    });
  }

  /* ================= STANDARD CHANGE ================= */
  onStandardChange(): void {
    this.selectedBatchCode = "";
    this.batches = [];
    this.classes = [];

    if (!this.selectedStandardId) return;

    this.api.getBatchesByStandard(Number(this.selectedStandardId)).subscribe({
      next: (res: any) => {
        this.batches = res?.data || [];
      },
      error: () => {
        this.showError("❌ Failed to load batches");
      },
    });
  }

  /* ================= LOAD TOPICS ================= */
  loadTopics(): void {
    this.api.getTopicList().subscribe({
      next: (res: any) => {
        this.topics = res?.data || [];
      },
      error: () => {
        this.showError("❌ Failed to load topics");
      },
    });
  }

  /* ================= LOAD CLASSES ================= */
  onBatchChange(): void {
    this.classes = [];
    this.errorMsg = "";

    if (!this.selectedBatchCode) return;

    this.isLoading = true;

    this.api.getStudentClasses(this.selectedBatchCode).subscribe({
      next: (res: any) => {
        const rows = res?.data || [];
        const grouped: any = {};

        for (const row of rows) {
          const key = `${row.class_date}_${row.schedule_id}`;

          if (!grouped[key]) {
            grouped[key] = {
              class_id: key,
              class_date: row.class_date,
              display_date: new Date(row.class_date).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                },
              ),
              day_name: row.day_name,
              schedule_id: row.schedule_id,
              slot_ids: [],
              slot_times: [],
              class_links: {},
              selectedTopicId: null,
              topicMedia: [],
              isAssigning: false,
              loadingMedia: false,
              isUpdatingLink: false,
              editingLinkSlotId: null,
              assignmentStatus: null, // Track when assignment was made
            };
          }

          grouped[key].slot_ids.push(Number(row.slot_id));
          grouped[key].slot_times.push(row.slot_time);
          grouped[key].class_links[row.slot_id] = row.class_link || "";
        }

        this.classes = Object.values(grouped);
        
        // Restore any previously assigned topics for this batch
        this.restoreAssignedTopics();
        
        this.isLoading = false;
      },
      error: () => {
        this.showError("❌ Failed to load class slots");
        this.isLoading = false;
      },
    });
  }

  /* ================= RESTORE ASSIGNED TOPICS ================= */
  private restoreAssignedTopics(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const assignments = JSON.parse(stored);
        const batchKey = this.selectedBatchCode;
        
        if (assignments[batchKey]) {
          const batchAssignments = assignments[batchKey];
          
          this.classes.forEach((slot: any) => {
            const slotKey = `${slot.class_date}_${slot.schedule_id}`;
            if (batchAssignments[slotKey]) {
              const assignment = batchAssignments[slotKey];
              slot.selectedTopicId = assignment.topicId;
              slot.assignmentStatus = assignment.timestamp;
              
              // If topic is selected, load its media
              if (slot.selectedTopicId) {
                this.loadTopicMediaForSlot(slot, assignment.selectedMediaIds);
              }
            }
          });
        }
      }
    } catch (e) {
      console.error('Error restoring assignments:', e);
    }
  }

  /* ================= SAVE ASSIGNED TOPICS ================= */
  private saveAssignedTopics(slot: any, topicId: number, mediaIds: number[]): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const assignments = stored ? JSON.parse(stored) : {};
      
      const batchKey = this.selectedBatchCode;
      if (!assignments[batchKey]) {
        assignments[batchKey] = {};
      }
      
      const slotKey = `${slot.class_date}_${slot.schedule_id}`;
      assignments[batchKey][slotKey] = {
        topicId: topicId,
        selectedMediaIds: mediaIds,
        timestamp: new Date().toLocaleString()
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assignments));
    } catch (e) {
      console.error('Error saving assignments:', e);
    }
  }

  /* ================= LOAD TOPIC MEDIA FOR SLOT ================= */
  private loadTopicMediaForSlot(slot: any, preselectedMediaIds: number[] = []): void {
    if (!slot.selectedTopicId) return;
    
    slot.loadingMedia = true;
    
    this.api.getTopicMedia(slot.selectedTopicId).subscribe({
      next: (res: any) => {
        slot.topicMedia = (res?.data || []).map((m: any) => ({
          ...m,
          selected: preselectedMediaIds.includes(Number(m.id))
        }));
        slot.loadingMedia = false;
      },
      error: () => {
        this.showError("❌ Failed to load topic media");
        slot.loadingMedia = false;
      },
    });
  }

  /* ================= TOPIC CHANGE PER SLOT ================= */
  onSlotTopicChange(slot: any): void {
    slot.topicMedia = [];
    slot.loadingMedia = true;

    if (!slot.selectedTopicId) {
      slot.loadingMedia = false;
      return;
    }

    this.api.getTopicMedia(slot.selectedTopicId).subscribe({
      next: (res: any) => {
        slot.topicMedia = (res?.data || []).map((m: any) => ({
          ...m,
          selected: false,
        }));
        slot.loadingMedia = false;
      },
      error: () => {
        this.showError("❌ Failed to load topic media");
        slot.loadingMedia = false;
      },
    });
  }

  /* ================= CLASS LINK METHODS ================= */

  // Start editing a specific slot's class link
  startEditLink(slot: any, slotId: number): void {
    slot.editingLinkSlotId = slotId;
  }

  // Cancel editing
  cancelEditLink(slot: any): void {
    slot.editingLinkSlotId = null;
  }

  // Save class link for a specific slot
  saveClassLink(slot: any, slotId: number): void {
    const classLink = slot.class_links[slotId]?.trim();

    if (!classLink) {
      this.showError("⚠️ Please enter a valid class link");
      return;
    }

    slot.isUpdatingLink = true;

    const payload = {
      slot_id: slotId,
      class_link: classLink,
      updated_by: "instructor",
    };

    this.api.updateClassLinkBySlotId(payload).subscribe({
      next: (res: any) => {
        this.showModernSuccessModal();
        slot.editingLinkSlotId = null;
      },
      error: (err: any) => {
        console.error("Class link update error:", err);
        const errorMessage =
          err.error?.message || "❌ Failed to update class link";
        this.showError(errorMessage);
      },
      complete: () => {
        slot.isUpdatingLink = false;
      },
    });
  }

  // Get display text for class link
  getClassLinkDisplayText(link: string): string {
    if (!link) return "No link added";

    try {
      const url = new URL(link);
      return `${url.hostname}${url.pathname.substring(0, 30)}${url.pathname.length > 30 ? "..." : ""}`;
    } catch {
      return link.length > 40 ? link.substring(0, 40) + "..." : link;
    }
  }

  /* ================= HELPER METHODS ================= */

  getSelectedMediaCount(slot: any): number {
    if (!slot.topicMedia || !Array.isArray(slot.topicMedia)) {
      return 0;
    }
    return slot.topicMedia.filter((media: any) => media.selected).length;
  }

  toggleMediaSelection(media: any): void {
    if (this.isAssigning || media.disabled) return;
    media.selected = !media.selected;
  }

  getTopicName(topicId: string): string {
    if (!topicId) return "";
    const topic = this.topics.find((t) => (t.topic_id || t.id) === topicId);
    return topic?.topic_name || "Unknown Topic";
  }

  /* ================= SHOW MESSAGES ================= */

  showError(message: string): void {
    this.errorMsg = message;

    setTimeout(() => {
      if (this.errorMsg === message) {
        this.errorMsg = "";
      }
    }, 5000);
  }

  clearMessages(): void {
    this.errorMsg = "";
  }

  /* ================= MODERN SUCCESS MODAL ================= */
  
  showModernSuccessModal(): void {
    // Clear any existing timeout
    if (this.modalTimeout) {
      clearTimeout(this.modalTimeout);
    }

    // Show modal
    this.showSuccessModal = true;

    // Auto close after 1.5 seconds
    this.modalTimeout = setTimeout(() => {
      this.showSuccessModal = false;
    }, 1500);
  }

  /* ================= ASSIGN TOPIC + MEDIA ================= */
  assignTopicAndMedia(slot: any): void {
    if (!slot.selectedTopicId) {
      this.showError("⚠️ Please select a topic first");
      return;
    }

    // Get selected media IDs
    const mediaIds = (slot.topicMedia || [])
      .filter((m: any) => m.selected)
      .map((m: any) => Number(m.id));

    const payload = {
      batch_code: this.selectedBatchCode,
      slot_ids: slot.slot_ids,
      topic_id: Number(slot.selectedTopicId),
      media_ids: mediaIds,
    };

    // Set loading states
    slot.isAssigning = true;
    this.isAssigning = true;
    this.assigningSlotId = slot.class_id;

    this.api.assignTopicAndMediaToSlot(payload).subscribe({
      next: (res: any) => {
        // Set assignment status
        slot.assignmentStatus = new Date().toLocaleString();
        
        // Save to localStorage to persist after refresh
        this.saveAssignedTopics(slot, Number(slot.selectedTopicId), mediaIds);
        
        // Show modern success modal with just the tick
        this.showModernSuccessModal();
        
        // Keep all selections - NO RESET, NO REFRESH
      },
      error: (err: any) => {
        console.error("Assignment error:", err);
        const errorMessage =
          err.error?.message || "❌ Failed to assign topic & media";
        this.showError(errorMessage);
      },
      complete: () => {
        // Reset loading states but KEEP ALL SELECTIONS
        slot.isAssigning = false;
        this.isAssigning = false;
        this.assigningSlotId = null;
      },
    });
  }

  /* ================= CHECK IF SLOT IS BEING ASSIGNED ================= */
  isSlotAssigning(slot: any): boolean {
    return this.isAssigning && this.assigningSlotId === slot.class_id;
  }

  /* ================= DISABLE CONTROLS CHECK ================= */
  isDisabled(): boolean {
    return this.isAssigning || this.isLoading;
  }
}