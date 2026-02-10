import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../service/api.service";

type ScheduleTab = "today" | "upcoming" | "all";

interface ClassItem {
  slot_id: number;
  class_date: string;
  slot_time: string;
  subject_name: string;
  topic_name?: string;
  room_no?: string;
  start_time?: string;
  end_time?: string;
  class_link?: string; // Added class_link property
  class_name?: string;
  schedule_id?: number;
}

interface StudyMaterial {
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_path?: string;
  file_size?: number;
}

interface TopicObject {
  name?: string;
  title?: string;
  topic_name?: string;
  topic?: string;
  [key: string]: any;
}

@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.css",
})
export class StudentDashboardComponent implements OnInit {
  /* ================= TABS ================= */
  tabs: ScheduleTab[] = ["today", "upcoming", "all"];
  activeTab: ScheduleTab = "today";

  /* ================= CLASS DATA ================= */
  rawClasses: ClassItem[] = [];
  groupedSchedules: {
    date: string;
    classes: ClassItem[];
  }[] = [];

  /* ================= MODAL FOR STUDY MATERIAL ================= */
  showMaterialModal = false;
  selectedSlot: ClassItem | null = null;
  studyMediaBySlot: { [slotId: number]: StudyMaterial[] } = {};
  studyTopicBySlot: { [slotId: number]: string } = {};
  isMaterialLoading = false;

  isLoading = true;
  todayStr = "";

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.todayStr = this.formatDate(new Date());
    this.loadSchedule();
  }

  /* ================= LOAD CLASSES ================= */
  loadSchedule(): void {
    this.isLoading = true;

    this.api.getStudentClassesFromToken().subscribe({
      next: (res: any) => {
        this.rawClasses = res?.data || [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: () => {
        this.rawClasses = [];
        this.groupedSchedules = [];
        this.isLoading = false;
      },
    });
  }

  /* ================= CHECK IF CLASS HAS LINK ================= */
  hasClassLink(slot: ClassItem): boolean {
    return !!(
      slot.class_link &&
      slot.class_link.trim() !== "" &&
      slot.class_link !== "null"
    );
  }

  /* ================= JOIN CLASS ================= */
  joinClass(slot: ClassItem): void {
    if (this.hasClassLink(slot)) {
      // Open class link in new tab
      window.open(slot.class_link, "_blank");

      // Optional: Track join event
      this.trackClassJoin(slot);
    }
  }

  /* ================= TRACK CLASS JOIN (OPTIONAL) ================= */
  private trackClassJoin(slot: ClassItem): void {
    console.log("Joining class:", {
      slot_id: slot.slot_id,
      class_date: slot.class_date,
      time: new Date().toISOString(),
    });

    // You can add API call here to track attendance
    // this.api.trackClassAttendance(slot.slot_id).subscribe(...)
  }

  /* ================= GET CLASS LINK DISPLAY TEXT ================= */
  getClassLinkDisplay(link: string | undefined): string {
    if (!link) return "No link available";

    try {
      const url = new URL(link);
      // For Google Meet links
      if (url.hostname.includes("meet.google.com")) {
        return "Google Meet: " + url.pathname.replace("/", "");
      }
      // For other links, show domain
      const displayPath = url.pathname.length > 20 ? "..." : url.pathname;
      return url.hostname + displayPath;
    } catch {
      // If not a valid URL, truncate it
      return link.length > 40 ? link.substring(0, 40) + "..." : link;
    }
  }

  /* ================= VIEW STUDY MATERIAL ================= */
  viewStudyMaterials(slot: ClassItem): void {
    this.selectedSlot = slot;
    const slotId = slot.slot_id;

    // Reset the modal state
    this.showMaterialModal = true;
    this.isMaterialLoading = true;

    // Clear any previous data for this slot to force reload
    delete this.studyMediaBySlot[slotId];
    delete this.studyTopicBySlot[slotId];

    this.api.getStudentStudyMaterialsFromToken({ slot_id: slotId }).subscribe({
      next: (res: any) => {
        console.log("Study materials API response:", res);

        // Extract topic from the response - handle object case
        let topic = "No topic specified";

        if (res) {
          // Check different possible structures
          if (typeof res.topic === "string") {
            topic = res.topic;
          } else if (res.topic && typeof res.topic === "object") {
            const topicObj = res.topic as TopicObject;
            topic =
              topicObj.name ||
              topicObj.title ||
              topicObj.topic_name ||
              topicObj.topic ||
              JSON.stringify(res.topic);
          } else if (res.data?.topic) {
            if (typeof res.data.topic === "string") {
              topic = res.data.topic;
            } else if (typeof res.data.topic === "object") {
              const dataTopicObj = res.data.topic as TopicObject;
              topic =
                dataTopicObj.name ||
                dataTopicObj.title ||
                dataTopicObj.topic_name ||
                dataTopicObj.topic ||
                JSON.stringify(res.data.topic);
            }
          } else if (res.data?.topic_name) {
            topic = res.data.topic_name;
          } else if (res.topic_name) {
            topic = res.topic_name;
          }
        }

        // If still no topic, use the slot's topic name
        if (topic === "No topic specified" && this.selectedSlot?.topic_name) {
          topic = this.selectedSlot.topic_name;
        }

        this.studyTopicBySlot[slotId] = topic;
        console.log("Extracted topic:", topic);

        // Extract media from the response
        let media: StudyMaterial[] = [];

        if (res?.media && Array.isArray(res.media)) {
          media = res.media;
        } else if (res?.data?.media && Array.isArray(res.data.media)) {
          media = res.data.media;
        } else if (res?.data && Array.isArray(res.data)) {
          media = res.data;
        } else if (res && Array.isArray(res)) {
          media = res;
        }

        this.studyMediaBySlot[slotId] = media;
        console.log("Extracted media:", media);

        this.isMaterialLoading = false;
      },
      error: (error) => {
        console.error("Error loading study materials:", error);

        // Fallback to slot's topic name if available
        const fallbackTopic =
          this.selectedSlot?.topic_name ||
          "Failed to load topic. Please try again.";

        this.studyTopicBySlot[slotId] = fallbackTopic;
        this.studyMediaBySlot[slotId] = [];
        this.isMaterialLoading = false;
      },
    });
  }

  /* ================= CLOSE MODAL ================= */
  closeModal(): void {
    this.showMaterialModal = false;
    this.selectedSlot = null;
  }

  /* ================= OPEN FILE ================= */
  openFile(path: string | undefined): void {
    if (path) {
      window.open(path, "_blank");
    } else {
      console.warn("No file path provided");
    }
  }

  /* ================= TAB HANDLERS ================= */
  setActiveTab(tab: ScheduleTab): void {
    this.activeTab = tab;
    this.applyFilter();
  }

  getTabLabel(tab: ScheduleTab): string {
    const labels = {
      today: "Today",
      upcoming: "Upcoming",
      all: "All Classes",
    };
    return labels[tab];
  }

  /* ================= FILTER + GROUP ================= */
  applyFilter(): void {
    let filtered = [...this.rawClasses];

    if (this.activeTab === "today") {
      filtered = filtered.filter((c) => c.class_date === this.todayStr);
    }

    if (this.activeTab === "upcoming") {
      filtered = filtered.filter((c) => c.class_date > this.todayStr);
    }

    const map = new Map<string, ClassItem[]>();

    filtered.forEach((c) => {
      if (!map.has(c.class_date)) {
        map.set(c.class_date, []);
      }

      const [start, end] = c.slot_time?.split(" - ") || ["", ""];

      map.get(c.class_date)!.push({
        ...c,
        start_time: start,
        end_time: end,
      });
    });

    this.groupedSchedules = Array.from(map.entries()).map(
      ([date, classes]) => ({ date, classes }),
    );
  }

  /* ================= DATE FORMAT ================= */
  private formatDate(d: Date): string {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  /* ================= GET FILE ICON ================= */
  getFileIcon(mimeType: string | undefined): string {
    if (!mimeType) return "📎";

    const mime = mimeType.toLowerCase();
    if (mime.includes("pdf")) return "📄";
    if (mime.includes("image")) return "🖼️";
    if (mime.includes("video")) return "🎬";
    if (mime.includes("audio")) return "🎵";
    if (mime.includes("word") || mime.includes("doc")) return "📝";
    if (mime.includes("excel") || mime.includes("sheet")) return "📊";
    if (mime.includes("powerpoint") || mime.includes("ppt")) return "📽️";
    if (mime.includes("text") || mime.includes("txt")) return "📃";
    return "📎";
  }

  /* ================= GET CURRENT TOPIC ================= */
  getCurrentTopic(): string {
    if (!this.selectedSlot) return "No topic specified";

    const slotId = this.selectedSlot.slot_id;
    const topic = this.studyTopicBySlot[slotId];

    // Ensure topic is a string, not an object
    if (topic && typeof topic === "object") {
      const topicObj = topic as unknown as TopicObject;
      return (
        topicObj.name ||
        topicObj.title ||
        topicObj.topic_name ||
        JSON.stringify(topic)
      );
    }

    return topic || this.selectedSlot.topic_name || "No topic specified";
  }

  /* ================= GET CURRENT MEDIA ================= */
  getCurrentMedia(): StudyMaterial[] {
    if (!this.selectedSlot) return [];

    const slotId = this.selectedSlot.slot_id;
    return this.studyMediaBySlot[slotId] || [];
  }

  /* ================= FORMAT FILE SIZE ================= */
  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return "Size unknown";

    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  }
}
