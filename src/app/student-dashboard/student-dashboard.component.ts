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
  tabs: ScheduleTab[] = ["today", "upcoming", "all"];
  activeTab: ScheduleTab = "today";

  /** 🔹 Raw slot-wise data from API */
  rawClasses: any[] = [];

  /** 🔹 Grouped for UI */
  groupedSchedules: { date: string; classes: any[] }[] = [];

  isLoading = true;
  todayStr = "";

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.todayStr = this.formatDate(new Date());
    this.loadSchedule();
  }

  /* ======================================
     LOAD STUDENT CLASSES (SLOT-BASED API)
  ====================================== */
  loadSchedule(): void {
    const batchCode = "BAT9296"; // ⚠️ later: derive from logged-in student

    this.isLoading = true;

    this.api.getStudentClasses(batchCode).subscribe({
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

  /* ======================================
     TAB CHANGE
  ====================================== */
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

  /* ======================================
     FILTER + GROUP BY DATE
  ====================================== */
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
      map.get(c.class_date)!.push(c);
    });

    this.groupedSchedules = Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, classes]) => ({ date, classes }));
  }

  /* ======================================
     SAFE DATE FORMATTER (YYYY-MM-DD)
  ====================================== */
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
