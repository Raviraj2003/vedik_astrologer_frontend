import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../service/api.service'; // ✅ import your service

interface WorkingDay {
  day: string;
  startTime: string;
  endTime: string;
  slots: string[];
  slotInterval?: number;
}

@Component({
  selector: 'app-shedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shedules.component.html',
})
export class ShedulesComponent {
  store: any;
  fromDate: string = '';
  toDate: string = '';
  slotDuration: number = 45;
  bufferTime: number = 15;

  workingHours: WorkingDay[] = [
    { day: 'Monday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
    { day: 'Tuesday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
    { day: 'Wednesday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
    { day: 'Thursday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
    { day: 'Friday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
    { day: 'Saturday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
    { day: 'Sunday', startTime: '', endTime: '', slots: [], slotInterval: 45 },
  ];

  constructor(public storeData: Store<any>, private api: ApiService) {
    this.storeData.select((d) => d.index).subscribe((d) => {
      this.store = d;
    });
  }

  copyFromPrevious(index: number) {
    if (index === 0) return;
    const prev = this.workingHours[index - 1];
    const current = this.workingHours[index];
    current.startTime = prev.startTime;
    current.endTime = prev.endTime;
    current.slotInterval = prev.slotInterval;
    this.updateSlots(current);
  }

  updateSlots(day: WorkingDay) {
    if (day.startTime && day.endTime) {
      day.slots = this.generateSlots(
        day.startTime,
        day.endTime,
        day.slotInterval || this.slotDuration,
        this.bufferTime
      );
    } else {
      day.slots = [];
    }
  }

  updateAllSlots() {
    this.workingHours.forEach((d) => {
      if (d.startTime && d.endTime) this.updateSlots(d);
    });
  }

  private generateSlots(start: string, end: string, duration: number, buffer: number): string[] {
    const slots: string[] = [];
    const startDate = this.convertToDate(start);
    const endDate = this.convertToDate(end);
    let current = new Date(startDate);

    while (true) {
      const slotEnd = new Date(current);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);
      if (slotEnd > endDate) break;

      const startStr = this.formatTime(current);
      const endStr = this.formatTime(slotEnd);
      slots.push(`${startStr} - ${endStr}`);

      current.setMinutes(current.getMinutes() + duration + buffer);
    }
    return slots;
  }

  private convertToDate(time: string): Date {
    const [h, m] = time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  private formatTime(date: Date): string {
    let h = date.getHours();
    let m: any = date.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    if (m < 10) m = '0' + m;
    return `${h}:${m} ${ampm}`;
  }

  clearDay(index: number) {
    this.workingHours[index].startTime = '';
    this.workingHours[index].endTime = '';
    this.workingHours[index].slots = [];
  }

  saveSchedule() {
  if (!this.fromDate || !this.toDate) {
    alert('⚠️ Please select From & To dates');
    return;
  }

  const payload = {
    from_date: this.fromDate,
    to_date: this.toDate,
    schedules: this.workingHours
      .filter(d => d.slots.length > 0)
      .map(d => ({
        day_name: d.day,
        slots: d.slots   // ✅ THIS IS WHAT BACKEND NEEDS
      })),
  };

  console.log('📦 FINAL PAYLOAD:', payload);

  this.api.saveSchedules(payload).subscribe({
    next: (res) => {
      console.log('✅ Saved:', res);
      alert('✅ Schedule saved successfully!');
    },
    error: (err) => {
      console.error('❌ Error:', err);
      alert('❌ Failed to save schedule');
    },
  });
}

cancel() {
  // You can decide what "Cancel" should do
  // For now, let's just reset everything
  if (confirm('Are you sure you want to cancel changes?')) {
    this.fromDate = '';
    this.toDate = '';
    this.workingHours.forEach((d) => {
      d.startTime = '';
      d.endTime = '';
      d.slots = [];
    });
    alert('❌ Changes cleared.');
  }
}


}
