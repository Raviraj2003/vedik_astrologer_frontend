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
  activateSlotRange = '';
  deactivatedSlots: {
    slot_range: string;
    day_name?: string;
  }[] = [];

  // ================= DEACTIVATE =================
  deactivateDate = '';
  deactivateSlotRange = '';
  activeSlots: {
    slot_range: string;
    day_name?: string;
  }[] = [];

  constructor(private api: ApiService) {}

  // ======================================================
  // 🔹 LOAD ACTIVE SLOTS (SAFE MAPPING)
  // ======================================================
  loadActiveSlots() {
    if (!this.deactivateDate) return;

    this.api.getSlotsByDate(this.deactivateDate).subscribe({
      next: (res: any) => {
        const slots = res?.slots ?? [];

        this.activeSlots = slots.map((s: any) =>
          typeof s === 'string'
            ? { slot_range: s }
            : {
                slot_range: s.slot_range,
                day_name: s.day_name,
              }
        );
      },
      error: () => alert('❌ Failed to load active slots'),
    });
  }

  // ======================================================
  // 🔹 LOAD DEACTIVATED SLOTS (FIXED)
  // ======================================================
  loadDeactivatedSlots() {
    if (!this.activateDate) return;

    this.api.getDeactivatedSlotsByDate(this.activateDate).subscribe({
      next: (res: any) => {
        const slots = res?.slots ?? [];

        this.deactivatedSlots = slots.map((s: any) => ({
          slot_range: typeof s === 'string' ? s : s.slot_range,
          day_name: new Date(this.activateDate).toLocaleDateString('en-US', {
            weekday: 'long',
          }),
        }));
      },
      error: () => alert('❌ Failed to load deactivated slots'),
    });
  }

  // ======================================================
  // 🔹 SINGLE SLOT ACTIONS
  // ======================================================
  activateSingleSlot() {
    if (!this.activateDate || !this.activateSlotRange) {
      return alert('Select date and slot');
    }

    this.updateSlot(this.activateDate, this.activateSlotRange, 'Y');
  }

  deactivateSingleSlot() {
    if (!this.deactivateDate || !this.deactivateSlotRange) {
      return alert('Select date and slot');
    }

    this.updateSlot(this.deactivateDate, this.deactivateSlotRange, 'N');
  }

  // ======================================================
  // 🔹 WHOLE DAY ACTIONS
  // ======================================================
  activateWholeDay() {
    if (!this.activateDate) return alert('Select date');

    this.loading = true;

    this.api.getDeactivatedSlotsByDate(this.activateDate).subscribe({
      next: (res: any) => {
        const slots = res?.slots ?? [];

        if (!slots.length) {
          alert('No deactivated slots found');
          this.loading = false;
          return;
        }

        let completed = 0;

        slots.forEach((s: any) => {
          const slotRange = typeof s === 'string' ? s : s.slot_range;

          this.api.updateSlotStatus({
            slot_date: this.activateDate,
            slot_range: slotRange,
            is_active: 'Y',
          }).subscribe({
            next: () => {
              completed++;
              if (completed === slots.length) {
                alert('✅ Whole day activated');
                this.loading = false;
                this.reloadBoth();
              }
            },
            error: () => {
              alert('❌ Failed during activation');
              this.loading = false;
            },
          });
        });
      },
      error: () => {
        alert('❌ Failed to load deactivated slots');
        this.loading = false;
      },
    });
  }

  deactivateWholeDay() {
    if (!this.deactivateDate) return alert('Select date');

    this.loading = true;

    this.api
      .deactivateSlotsByDate({ slot_date: this.deactivateDate })
      .subscribe({
        next: () => {
          alert('🚫 Whole day deactivated');
          this.loading = false;
          this.reloadBoth();
        },
        error: () => {
          alert('❌ Failed to deactivate whole day');
          this.loading = false;
        },
      });
  }

  // ======================================================
  // 🔹 COMMON SLOT UPDATE
  // ======================================================
  private updateSlot(
    date: string,
    range: string,
    status: 'Y' | 'N'
  ) {
    this.loading = true;

    this.api
      .updateSlotStatus({
        slot_date: date,
        slot_range: range,
        is_active: status,
      })
      .subscribe({
        next: () => {
          alert(
            status === 'Y'
              ? '✅ Slot activated'
              : '🚫 Slot deactivated'
          );
          this.loading = false;
          this.reloadBoth();
        },
        error: () => {
          alert('❌ Failed to update slot');
          this.loading = false;
        },
      });
  }

  // ======================================================
  // 🔹 HELPER
  // ======================================================
  private reloadBoth() {
    if (this.activateDate) this.loadDeactivatedSlots();
    if (this.deactivateDate) this.loadActiveSlots();
  }
}
