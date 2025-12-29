import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-class-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-schedule.component.html',
})
export class ClassScheduleComponent implements OnInit {

  // Days dropdown
  days: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Batch list
  batchList: any[] = [];

  // Form model
  form: any = {
    class_name: '',
    batch_code: '',
    topic: '',
    from_date: '',
    to_date: '',
    schedules: [
      {
        day_name: '',
        start_time: '',
        end_time: '',
        slot_interval: 30,
      },
    ],
  };

  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  /* ================= LOAD BATCHES ================= */
  loadBatches(): void {
    this.api.getAllBatches().subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
      },
      error: (err) => {
        console.error('Get batches error:', err);
        this.batchList = [];
      },
    });
  }

  /* ================= ADD DAY ================= */
  addSchedule(): void {
    this.form.schedules.push({
      day_name: '',
      start_time: '',
      end_time: '',
      slot_interval: 30,
    });
  }

  /* ================= REMOVE DAY ================= */
  removeSchedule(index: number): void {
    if (this.form.schedules.length > 1) {
      this.form.schedules.splice(index, 1);
    }
  }

  /* ================= VALIDATION ================= */
  isFormValid(): boolean {
    if (
      !this.form.class_name ||
      !this.form.batch_code ||
      !this.form.from_date ||
      !this.form.to_date
    ) {
      return false;
    }

    return this.form.schedules.every((s: any) =>
      s.day_name && s.start_time && s.end_time && s.slot_interval
    );
  }

  /* ================= SUBMIT ================= */
  submit(): void {
    if (!this.isFormValid()) {
      alert('Please fill all required fields');
      return;
    }

    this.loading = true;

    const payload = {
      class_name: this.form.class_name,
      batch_code: this.form.batch_code,
      topic: this.form.topic,
      from_date: this.form.from_date,
      to_date: this.form.to_date,
      schedules: this.form.schedules,
    };

    this.api.saveClassSchedule(payload).subscribe({
      next: () => {
        alert('Class schedule saved successfully');
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.message || 'Failed to save schedule');
        this.loading = false;
      },
    });
  }

  /* ================= RESET ================= */
  resetForm(): void {
    this.form = {
      class_name: '',
      batch_code: '',
      topic: '',
      from_date: '',
      to_date: '',
      schedules: [
        {
          day_name: '',
          start_time: '',
          end_time: '',
          slot_interval: 30,
        },
      ],
    };
  }
}
