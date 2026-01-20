import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';

type ScheduleTab = 'today' | 'all' | 'upcoming';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

  tabs: ScheduleTab[] = ['today', 'all', 'upcoming'];
  activeTab: ScheduleTab = 'today';

  schedules: any[] = [];
  filteredSchedules: any[] = [];

  // ✅ DATE-WISE GROUPED DATA
  groupedSchedules: { date: string; classes: any[] }[] = [];

  isLoading = true;

  private weekDays = [
    'Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.api.getStudentClassSchedule().subscribe({
      next: (res: any) => {
        this.schedules = res.schedule || [];
        this.expandAndGroup();
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  setActiveTab(tab: ScheduleTab): void {
    this.activeTab = tab;
    this.expandAndGroup();
  }

  getTabLabel(tab: ScheduleTab): string {
    return {
      today: 'Today',
      all: 'All Classes',
      upcoming: 'Upcoming'
    }[tab];
  }

  /* ------------------------------------
     EXPAND + GROUP DATE-WISE
  ------------------------------------ */
  expandAndGroup(): void {
    const todayStr = new Date().toISOString().split('T')[0];
    const occurrences: any[] = [];

    this.schedules.forEach(s => {
      const from = new Date(s.from_date);
      const to = new Date(s.to_date);

      from.setHours(0, 0, 0, 0);
      to.setHours(0, 0, 0, 0);

      const targetDay = this.weekDays.indexOf(s.day_name);
      if (targetDay === -1) return;

      const current = new Date(from);

      while (current <= to) {
        if (current.getDay() === targetDay) {
          const dateStr = current.toISOString().split('T')[0];

          if (
            this.activeTab === 'today' && dateStr !== todayStr ||
            this.activeTab === 'upcoming' && dateStr <= todayStr
          ) {
            current.setDate(current.getDate() + 1);
            continue;
          }

          occurrences.push({
            ...s,
            class_date: dateStr
          });
        }
        current.setDate(current.getDate() + 1);
      }
    });

    // ✅ GROUP BY DATE
    const map = new Map<string, any[]>();

    occurrences.forEach(o => {
      if (!map.has(o.class_date)) {
        map.set(o.class_date, []);
      }
      map.get(o.class_date)!.push(o);
    });

    // ✅ CONVERT TO ARRAY (SORTED)
    this.groupedSchedules = Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, classes]) => ({ date, classes }));
  }
}
