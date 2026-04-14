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
  standards: any[] = [];
  batches: any[] = [];
  topics: any[] = [];
  classes: any[] = [];

  selectedStandardId: number | "" = "";
  selectedBatchCode = "";

  isLoading = false;
  isAssigning = false;
  assigningSlotId: string | null = null;

  errorMsg = "";

  showSuccessModal = false;
  private modalTimeout: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
    this.loadTopics();
  }

  ngOnDestroy(): void {
    if (this.modalTimeout) clearTimeout(this.modalTimeout);
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.api.getStandards().subscribe({
      next: (res: any) => (this.standards = res?.data || []),
      error: () => this.showError("❌ Failed to load standards"),
    });
  }

  /* ================= STANDARD CHANGE ================= */
  onStandardChange(): void {
    this.selectedBatchCode = "";
    this.batches = [];
    this.classes = [];

    if (!this.selectedStandardId) return;

    this.api.getBatchesByStandard(Number(this.selectedStandardId)).subscribe({
      next: (res: any) => (this.batches = res?.data || []),
      error: () => this.showError("❌ Failed to load batches"),
    });
  }

  /* ================= LOAD TOPICS ================= */
  loadTopics(): void {
    this.api.getTopicList().subscribe({
      next: (res: any) => (this.topics = res?.data || []),
      error: () => this.showError("❌ Failed to load topics"),
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
              display_date: new Date(row.class_date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
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
              assignmentStatus: null,
            };
          }

          grouped[key].slot_ids.push(Number(row.slot_id));
          grouped[key].slot_times.push(row.slot_time);
          grouped[key].class_links[row.slot_id] = row.class_link || "";
        }

        this.classes = Object.values(grouped);

        // ✅ LOAD ASSIGNED DATA FROM API
        this.loadAssignedData();

        this.isLoading = false;
      },
      error: () => {
        this.showError("❌ Failed to load class slots");
        this.isLoading = false;
      },
    });
  }

  /* ================= LOAD ASSIGNED DATA ================= */
  private loadAssignedData(): void {
    if (!this.selectedBatchCode) return;

    this.api.getAssignedDataByBatch(this.selectedBatchCode).subscribe({
      next: (res: any) => {
        const assignedData = res.data || [];

        this.classes.forEach((slot: any) => {
          const matchedSlots = assignedData.filter((a: any) =>
            slot.slot_ids.includes(a.slot_id)
          );

          if (matchedSlots.length > 0) {
            const first = matchedSlots[0];

            // ✅ Restore topic
            slot.selectedTopicId = first.topic_id;

            // ✅ Restore class links
            matchedSlots.forEach((m: any) => {
              slot.class_links[m.slot_id] = m.class_link || "";
            });

            // ✅ Restore media selection
            if (first.topic_id) {
              this.api.getTopicMedia(first.topic_id).subscribe({
                next: (mediaRes: any) => {
                  slot.topicMedia = (mediaRes.data || []).map((m: any) => ({
                    ...m,
                    selected: matchedSlots.some((ms: any) =>
                      ms.media.some((mm: any) => mm.media_id === m.id)
                    ),
                  }));
                },
              });
            }
          }
        });
      },
      error: () => console.error("Failed to load assigned data"),
    });
  }

  /* ================= TOPIC CHANGE ================= */
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

  /* ================= CLASS LINK ================= */
  startEditLink(slot: any, slotId: number): void {
    slot.editingLinkSlotId = slotId;
  }

  cancelEditLink(slot: any): void {
    slot.editingLinkSlotId = null;
  }

  saveClassLink(slot: any, slotId: number): void {
    const classLink = slot.class_links[slotId]?.trim();

    if (!classLink) {
      this.showError("⚠️ Please enter a valid class link");
      return;
    }

    slot.isUpdatingLink = true;

    this.api.updateClassLinkBySlotId({
      slot_id: slotId,
      class_link: classLink,
      updated_by: "instructor",
    }).subscribe({
      next: () => {
        this.showModernSuccessModal();
        slot.editingLinkSlotId = null;
      },
      error: () => this.showError("❌ Failed to update class link"),
      complete: () => (slot.isUpdatingLink = false),
    });
  }

  getClassLinkDisplayText(link: string): string {
    if (!link) return "No link added";
    try {
      const url = new URL(link);
      return `${url.hostname}${url.pathname.substring(0, 30)}`;
    } catch {
      return link;
    }
  }

  /* ================= HELPERS ================= */
  getSelectedMediaCount(slot: any): number {
    return slot.topicMedia?.filter((m: any) => m.selected).length || 0;
  }

  toggleMediaSelection(media: any): void {
    if (this.isAssigning) return;
    media.selected = !media.selected;
  }

  /* ================= ERROR ================= */
  showError(message: string): void {
    this.errorMsg = message;
    setTimeout(() => (this.errorMsg = ""), 5000);
  }

  /* ================= SUCCESS ================= */
  showModernSuccessModal(): void {
    if (this.modalTimeout) clearTimeout(this.modalTimeout);
    this.showSuccessModal = true;
    this.modalTimeout = setTimeout(() => {
      this.showSuccessModal = false;
    }, 1500);
  }

  /* ================= ASSIGN ================= */
  assignTopicAndMedia(slot: any): void {
    if (!slot.selectedTopicId) {
      this.showError("⚠️ Please select a topic first");
      return;
    }

    const mediaIds = (slot.topicMedia || [])
      .filter((m: any) => m.selected)
      .map((m: any) => Number(m.id));

    const payload = {
      batch_code: this.selectedBatchCode,
      slot_ids: slot.slot_ids,
      topic_id: Number(slot.selectedTopicId),
      media_ids: mediaIds,
    };

    slot.isAssigning = true;
    this.isAssigning = true;

    this.api.assignTopicAndMediaToSlot(payload).subscribe({
      next: () => {
        slot.assignmentStatus = new Date().toLocaleString();
        this.showModernSuccessModal();
      },
      error: () => this.showError("❌ Failed to assign topic & media"),
      complete: () => {
        slot.isAssigning = false;
        this.isAssigning = false;
      },
    });
  }

  isDisabled(): boolean {
    return this.isAssigning || this.isLoading;
  }
}