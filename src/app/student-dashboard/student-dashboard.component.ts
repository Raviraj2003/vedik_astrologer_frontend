import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../service/api.service";

type ScheduleTab = "today" | "upcoming" | "all";

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

  /* ================= DATA ================= */
  rawClasses: any[] = [];
  groupedSchedules: {
    date: string;
    classes: any[];
  }[] = [];

  /* ================= STUDY MATERIAL STATE ================= */
  openedSlotId: number | null = null;
  studyTopic: any = null;
  studyMedia: any[] = [];
  isMaterialLoading = false;

  isLoading = true;
  todayStr = "";

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.todayStr = this.formatDate(new Date());
    this.loadSchedule();
  }

  /* ================= LOAD CLASSES ================= */
  /* ================= LOAD CLASSES ================= */
  loadSchedule(): void {
    this.isLoading = true;

    // 🔁 REPLACED API
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

  /* ================= VIEW STUDY MATERIAL ================= */
  /* ================= VIEW STUDY MATERIAL ================= */
  viewStudyMaterials(slot: any): void {
    if (this.openedSlotId === slot.slot_id) {
      this.openedSlotId = null;
      this.studyTopic = null;
      this.studyMedia = [];
      return;
    }

    this.openedSlotId = slot.slot_id;
    this.isMaterialLoading = true;
    this.studyTopic = null;
    this.studyMedia = [];

    // 🔁 REPLACED API
    this.api.getStudentStudyMaterialsFromToken().subscribe({
      next: (res: any) => {
        this.studyTopic = res?.topic || null;
        this.studyMedia = res?.media || [];
        this.isMaterialLoading = false;
      },
      error: () => {
        this.studyTopic = null;
        this.studyMedia = [];
        this.isMaterialLoading = false;
      },
    });
  }

  /* ================= OPEN FILE ================= */
  openFile(path: string): void {
    window.open(path, "_blank");
  }

  /* ================= TAB HELPERS ================= */
  setActiveTab(tab: ScheduleTab): void {
    this.activeTab = tab;
    this.applyFilter();
  }

  getTabLabel(tab: ScheduleTab): string {
    return {
      today: "Today",
      upcoming: "Upcoming",
      all: "All Classes",
    }[tab];
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

    const map = new Map<string, any[]>();

    filtered.forEach((c) => {
      if (!map.has(c.class_date)) {
        map.set(c.class_date, []);
      }
      const [start, end] = c.slot_time?.split(" - ") || ["", ""];

      map.get(c.class_date)!.push({
        ...c,
        start_time: start,
        end_time: end,
        topic: c.topic ?? null,
      });
    });

    this.groupedSchedules = Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, classes]) => ({ date, classes }));
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
}
