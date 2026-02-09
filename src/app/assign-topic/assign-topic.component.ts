import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-assign-topic",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./assign-topic.component.html",
})
export class AssignTopicComponent implements OnInit {
  /* ================= MASTER ================= */
  batches: any[] = [];
  topics: any[] = [];

  /* ================= CLASS GROUPS ================= */
  classes: any[] = [];

  selectedBatchCode = "";
  isLoading = false;
  isAssigning = false;
  assigningSlotId: string | null = null;

  successMsg = "";
  errorMsg = "";

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
    this.loadTopics();
  }

  /* ================= LOAD BATCHES ================= */
  loadBatches(): void {
    this.api.getAllBatches().subscribe({
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
    this.successMsg = "";
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
              class_id: key, // Unique identifier for the slot
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
              class_links: {}, // Store class links for each slot_id
              selectedTopicId: null,
              topicMedia: [],
              isAssigning: false, // Individual slot loading state
              loadingMedia: false, // Media loading state
              isUpdatingLink: false, // Link update loading state
              editingLinkSlotId: null, // Which slot is being edited
            };
          }

          grouped[key].slot_ids.push(Number(row.slot_id));
          grouped[key].slot_times.push(row.slot_time);
          // Initialize class link for each slot
          grouped[key].class_links[row.slot_id] = row.class_link || "";
        }

        this.classes = Object.values(grouped);
        this.isLoading = false;
      },
      error: () => {
        this.showError("❌ Failed to load class slots");
        this.isLoading = false;
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
      updated_by: "instructor", // You can update this with actual user ID/name
    };

    this.api.updateClassLinkBySlotId(payload).subscribe({
      next: (res: any) => {
        this.showSuccess(`✅ Class link updated successfully for time slot`);
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

    // Extract domain from URL for display
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
    if (this.isAssigning || media.disabled) return; // Prevent toggling during assignment
    media.selected = !media.selected;
  }

  getTopicName(topicId: string): string {
    if (!topicId) return "";
    const topic = this.topics.find((t) => (t.topic_id || t.id) === topicId);
    return topic?.topic_name || "Unknown Topic";
  }

  /* ================= SHOW MESSAGES ================= */

  showSuccess(message: string): void {
    this.successMsg = message;
    this.errorMsg = "";

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      if (this.successMsg === message) {
        this.successMsg = "";
      }
    }, 5000);
  }

  showError(message: string): void {
    this.errorMsg = message;
    this.successMsg = "";

    // Auto-hide error message after 5 seconds
    setTimeout(() => {
      if (this.errorMsg === message) {
        this.errorMsg = "";
      }
    }, 5000);
  }

  clearMessages(): void {
    this.successMsg = "";
    this.errorMsg = "";
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
      slot_ids: slot.slot_ids, // ✅ MULTIPLE SLOT IDS
      topic_id: Number(slot.selectedTopicId),
      media_ids: mediaIds,
    };

    // Set loading states
    slot.isAssigning = true;
    this.isAssigning = true;
    this.assigningSlotId = slot.class_id;

    this.api.assignTopicAndMediaToSlot(payload).subscribe({
      next: (res: any) => {
        const topicName = this.getTopicName(slot.selectedTopicId);
        const mediaCount = mediaIds.length;
        const slotCount = slot.slot_ids.length;

        let successMessage = `✅ Successfully assigned!\n`;
        successMessage += `📅 Date: ${slot.display_date}\n`;
        successMessage += `📚 Topic: ${topicName}\n`;

        if (mediaCount > 0) {
          successMessage += `📁 Media Files: ${mediaCount}\n`;
        }

        if (slotCount > 1) {
          successMessage += `⏰ Time Slots: ${slotCount}`;
        }

        this.showSuccess(successMessage);

        // Optional: Reset the slot selections
        // slot.selectedTopicId = null;
        // slot.topicMedia.forEach((m: any) => m.selected = false);
      },
      error: (err: any) => {
        console.error("Assignment error:", err);
        const errorMessage =
          err.error?.message || "❌ Failed to assign topic & media";
        this.showError(errorMessage);
      },
      complete: () => {
        // Reset loading states
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
