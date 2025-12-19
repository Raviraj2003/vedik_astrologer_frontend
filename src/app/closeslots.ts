import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-closeslots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './closeslots.html',
})
export class CloseslotsComponent {
  loading = false;

  // ================= ACTIVATE =================
  activateDate = '';
  activateSlotTime = '';
  deactivatedSlots: any[] = [];

  // ================= DEACTIVATE =================
  deactivateDate = '';
  deactivateSlotTime = '';
  activeSlots: any[] = [];

  constructor(private api: ApiService) {}

  // ================= LOAD ACTIVE =================
  loadActiveSlots() {
    if (!this.deactivateDate) return;

    this.api.getSlotsByDate(this.deactivateDate).subscribe({
      next: (res: any) => {
        this.activeSlots = res?.slots ?? [];
      },
      error: () => alert('❌ Failed to load active slots'),
    });
  }

  // ================= LOAD DEACTIVATED =================
  loadDeactivatedSlots() {
    if (!this.activateDate) return;

    this.api.getDeactivatedSlotsByDate(this.activateDate).subscribe({
      next: (res: any) => {
        this.deactivatedSlots = res?.slots ?? [];
      },
      error: () => alert('❌ Failed to load deactivated slots'),
    });
  }

  // ================= SINGLE =================
  activateSingleSlot() {
    if (!this.activateDate || !this.activateSlotTime) {
      return alert('Select date and slot');
    }

    this.updateSlot(this.activateDate, this.activateSlotTime, 'Y');
  }

  deactivateSingleSlot() {
    if (!this.deactivateDate || !this.deactivateSlotTime) {
      return alert('Select date and slot');
    }

    this.updateSlot(this.deactivateDate, this.deactivateSlotTime, 'N');
  }

  // ================= WHOLE DAY =================
  activateWholeDay() {
    if (!this.activateDate) return alert('Select date');

    this.loading = true;

    this.api.getDeactivatedSlotsByDate(this.activateDate).subscribe({
      next: (res: any) => {
        const slots = res?.slots ?? [];
        if (slots.length === 0) {
          alert('No deactivated slots found');
          this.loading = false;
          return;
        }

        let done = 0;
        slots.forEach((s: any) => {
          this.api.updateSlotStatus({
            slot_date: this.activateDate,
            slot_time: s.slot_time,
            is_active: 'Y',
          }).subscribe(() => {
            done++;
            if (done === slots.length) {
              alert('✅ Whole day activated');
              this.loading = false;
              this.loadDeactivatedSlots();
              this.loadActiveSlots();
            }
          });
        });
      },
      error: () => {
        alert('❌ Failed to activate whole day');
        this.loading = false;
      },
    });
  }

  deactivateWholeDay() {
    if (!this.deactivateDate) return alert('Select date');

    this.loading = true;

    this.api.deactivateSlotsByDate({ slot_date: this.deactivateDate })
      .subscribe({
        next: () => {
          alert('🚫 Whole day deactivated');
          this.loading = false;
          this.loadActiveSlots();
          this.loadDeactivatedSlots();
        },
        error: () => {
          alert('❌ Failed to deactivate whole day');
          this.loading = false;
        },
      });
  }

  // ================= HELPER =================
  private updateSlot(date: string, time: string, status: 'Y' | 'N') {
    this.loading = true;

    this.api.updateSlotStatus({
      slot_date: date,
      slot_time: time,
      is_active: status,
    }).subscribe({
      next: () => {
        alert(status === 'Y' ? '✅ Slot activated' : '🚫 Slot deactivated');
        this.loading = false;
        this.loadActiveSlots();
        this.loadDeactivatedSlots();
      },
      error: () => {
        alert('❌ Failed to update slot');
        this.loading = false;
      },
    });
  }
}
