import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../service/api.service';

type ScheduleTab = 'all' | 'today' | 'upcoming';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

  tabs: ScheduleTab[] = ['all', 'today', 'upcoming'];
  activeTab: ScheduleTab = 'all';

  schedules: any[] = [];
  filteredSchedules: any[] = [];

  isLoading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadSchedule();
  }

  loadSchedule(): void {
    this.api.getStudentClassSchedule().subscribe({
      next: (res: any) => {
        this.schedules = res.schedule || [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Schedule load failed', err);
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: ScheduleTab): void {
    this.activeTab = tab;
    this.applyFilter();
  }

  getTabLabel(tab: ScheduleTab): string {
    return {
      all: 'All Classes',
      today: 'Today',
      upcoming: 'Upcoming'
    }[tab];
  }

  applyFilter(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.activeTab === 'today') {
      this.filteredSchedules = this.schedules.filter(s => {
        const from = new Date(s.from_date);
        const to = new Date(s.to_date);
        return today >= from && today <= to;
      });
    }
    else if (this.activeTab === 'upcoming') {
      this.filteredSchedules = this.schedules.filter(s => {
        const from = new Date(s.from_date);
        return from > today;
      });
    }
    else {
      this.filteredSchedules = this.schedules;
    }
  }
}
