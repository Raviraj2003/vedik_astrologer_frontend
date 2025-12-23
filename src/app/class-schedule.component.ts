import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-class-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-schedule.component.html',
})
export class ClassScheduleComponent {

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  form = {
    class_name: '',
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

  constructor(private api: ApiService) {}

  // ADD NEW DAY
  addSchedule() {
    this.form.schedules.push({
      day_name: '',
      start_time: '',
      end_time: '',
      slot_interval: 30,
    });
  }

  // REMOVE DAY
  removeSchedule(index: number) {
    this.form.schedules.splice(index, 1);
  }

  // SUBMIT
  submit() {
    if (!this.form.class_name || !this.form.from_date || !this.form.to_date) {
      alert('Please fill all required fields');
      return;
    }

    this.api.saveClassSchedule(this.form).subscribe({
      next: () => {
        alert('Class schedule saved successfully');
        this.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to save schedule');
      },
    });
  }

  resetForm() {
    this.form = {
      class_name: '',
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
