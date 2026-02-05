import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ApiService } from "../service/api.service";

interface WorkingDay {
  day: string;
  startTime: string;
  endTime: string;
  slots: string[];
  slotInterval?: number;
}

interface ScheduleData {
  fromDate: string;
  toDate: string;
  slotDuration: number;
  bufferTime: number;
  workingHours: WorkingDay[];
}

@Component({
  selector: "app-shedules",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./shedules.component.html",
})
export class ShedulesComponent implements OnInit {
  store: any;
  fromDate: string = "";
  toDate: string = "";
  slotDuration: number = 45;
  bufferTime: number = 15;

  workingHours: WorkingDay[] = [
    { day: "Monday", startTime: "", endTime: "", slots: [], slotInterval: 45 },
    { day: "Tuesday", startTime: "", endTime: "", slots: [], slotInterval: 45 },
    {
      day: "Wednesday",
      startTime: "",
      endTime: "",
      slots: [],
      slotInterval: 45,
    },
    {
      day: "Thursday",
      startTime: "",
      endTime: "",
      slots: [],
      slotInterval: 45,
    },
    { day: "Friday", startTime: "", endTime: "", slots: [], slotInterval: 45 },
    {
      day: "Saturday",
      startTime: "",
      endTime: "",
      slots: [],
      slotInterval: 45,
    },
    { day: "Sunday", startTime: "", endTime: "", slots: [], slotInterval: 45 },
  ];

  // Storage key
  private readonly STORAGE_KEY = "schedule_data";

  constructor(
    public storeData: Store<any>,
    private api: ApiService,
  ) {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d;
      });
  }

  ngOnInit() {
    this.loadFromStorage();
  }

  // Save data to localStorage
  private saveToStorage() {
    const scheduleData: ScheduleData = {
      fromDate: this.fromDate,
      toDate: this.toDate,
      slotDuration: this.slotDuration,
      bufferTime: this.bufferTime,
      workingHours: this.workingHours,
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scheduleData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  // Load data from localStorage
  private loadFromStorage() {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const scheduleData: ScheduleData = JSON.parse(storedData);

        // Load basic data
        this.fromDate = scheduleData.fromDate || "";
        this.toDate = scheduleData.toDate || "";
        this.slotDuration = scheduleData.slotDuration || 45;
        this.bufferTime = scheduleData.bufferTime || 15;

        // Load working hours with validation
        if (
          scheduleData.workingHours &&
          scheduleData.workingHours.length === 7
        ) {
          // Preserve day order and merge with existing structure
          scheduleData.workingHours.forEach((storedDay, index) => {
            if (this.workingHours[index]) {
              this.workingHours[index].startTime = storedDay.startTime || "";
              this.workingHours[index].endTime = storedDay.endTime || "";
              this.workingHours[index].slots = storedDay.slots || [];
              this.workingHours[index].slotInterval =
                storedDay.slotInterval || this.slotDuration;
            }
          });
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }

  // Clear storage (optional)
  private clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  calculateTotalSlots(): number {
    if (!this.workingHours) return 0;

    let total = 0;
    this.workingHours.forEach((day) => {
      if (day.slots && Array.isArray(day.slots)) {
        total += day.slots.length;
      }
    });
    return total;
  }

  getDayStatus(day: WorkingDay): string {
    if (!day.startTime || !day.endTime) {
      return "No hours configured";
    }

    const slotCount = day.slots ? day.slots.length : 0;
    if (slotCount === 0) {
      return "Hours set, no slots";
    }

    return `${slotCount} slot${slotCount !== 1 ? "s" : ""} generated`;
  }

  copyFromPrevious(index: number) {
    if (index === 0) return;
    const prev = this.workingHours[index - 1];
    const current = this.workingHours[index];
    current.startTime = prev.startTime;
    current.endTime = prev.endTime;
    current.slotInterval = prev.slotInterval;
    this.updateSlots(current);
    this.saveToStorage(); // Save after copying
  }

  updateSlots(day: WorkingDay) {
    if (day.startTime && day.endTime) {
      day.slots = this.generateSlots(
        day.startTime,
        day.endTime,
        day.slotInterval || this.slotDuration,
        this.bufferTime,
      );
    } else {
      day.slots = [];
    }
    this.saveToStorage(); // Save after updating slots
  }

  updateAllSlots() {
    this.workingHours.forEach((d) => {
      if (d.startTime && d.endTime) {
        d.slots = this.generateSlots(
          d.startTime,
          d.endTime,
          d.slotInterval || this.slotDuration,
          this.bufferTime,
        );
      }
    });
    this.saveToStorage(); // Save after updating all slots
  }

  private generateSlots(
    start: string,
    end: string,
    duration: number,
    buffer: number,
  ): string[] {
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
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }

  private formatTime(date: Date): string {
    let h = date.getHours();
    let m: any = date.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    if (m < 10) m = "0" + m;
    return `${h}:${m} ${ampm}`;
  }

  clearDay(index: number) {
    this.workingHours[index].startTime = "";
    this.workingHours[index].endTime = "";
    this.workingHours[index].slots = [];
    this.saveToStorage(); // Save after clearing day
  }

  saveSchedule() {
    if (!this.fromDate || !this.toDate) {
      alert("⚠️ Please select From & To dates");
      return;
    }

    const payload = {
      from_date: this.fromDate,
      to_date: this.toDate,
      schedules: this.workingHours
        .filter((d) => d.slots.length > 0)
        .map((d) => ({
          day_name: d.day,
          slots: d.slots,
        })),
    };

    console.log("📦 FINAL PAYLOAD:", payload);

    this.api.saveSchedules(payload).subscribe({
      next: (res) => {
        console.log("✅ Saved:", res);
        alert("✅ Schedule saved successfully!");
        // Optionally clear storage after successful save to server
        // this.clearStorage();
      },
      error: (err) => {
        console.error("❌ Error:", err);
        alert("❌ Failed to save schedule");
      },
    });
  }

  cancel() {
    if (
      confirm(
        "Are you sure you want to clear all changes? This will reset everything.",
      )
    ) {
      this.fromDate = "";
      this.toDate = "";
      this.slotDuration = 45;
      this.bufferTime = 15;

      this.workingHours.forEach((d) => {
        d.startTime = "";
        d.endTime = "";
        d.slots = [];
        d.slotInterval = 45;
      });

      // Clear localStorage when canceling
      this.clearStorage();
      alert("❌ All changes cleared.");
    }
  }

  // Optional: Add ngOnDestroy to save when component is destroyed
  ngOnDestroy() {
    this.saveToStorage();
  }
}
