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
        this.errorMsg = "❌ Failed to load batches";
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
        this.errorMsg = "❌ Failed to load topics";
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
              selectedTopicId: null,
              topicMedia: [],
            };
          }

          grouped[key].slot_ids.push(Number(row.slot_id));
          grouped[key].slot_times.push(row.slot_time);
        }

        this.classes = Object.values(grouped);
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = "❌ Failed to load class slots";
        this.isLoading = false;
      },
    });
  }

  /* ================= TOPIC CHANGE PER SLOT ================= */
  onSlotTopicChange(slot: any): void {
    slot.topicMedia = [];

    if (!slot.selectedTopicId) return;

    this.api.getTopicMedia(slot.selectedTopicId).subscribe({
      next: (res: any) => {
        slot.topicMedia = (res?.data || []).map((m: any) => ({
          ...m,
          selected: false,
        }));
      },
      error: () => {
        this.errorMsg = "❌ Failed to load topic media";
      },
    });
  }

  /* ================= HELPER METHODS ================= */

  getSelectedMediaCount(slot: any): number {
    if (!slot.topicMedia || !Array.isArray(slot.topicMedia)) {
      return 0;
    }
    return slot.topicMedia.filter((media: any) => media.selected).length;
  }

  toggleMediaSelection(media: any): void {
    media.selected = !media.selected;
  }

  /* ================= ASSIGN TOPIC + MEDIA ================= */
  assignTopicAndMedia(slot: any): void {
    const mediaIds = (slot.topicMedia || [])
      .filter((m: any) => m.selected)
      .map((m: any) => Number(m.id));

    const payload = {
      batch_code: this.selectedBatchCode,
      slot_ids: slot.slot_ids, // ✅ MULTIPLE SLOT IDS
      topic_id: Number(slot.selectedTopicId),
      media_ids: mediaIds,
    };

    this.api.assignTopicAndMediaToSlot(payload).subscribe({
      next: () => {
        this.successMsg = `✅ Topic & media assigned\nDate: ${slot.display_date}`;
        setTimeout(() => (this.successMsg = ""), 3000);
      },
      error: () => {
        this.errorMsg = "❌ Failed to assign topic & media";
        setTimeout(() => (this.errorMsg = ""), 3000);
      },
    });
  }
}
