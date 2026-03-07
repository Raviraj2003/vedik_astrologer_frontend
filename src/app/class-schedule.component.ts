import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-class-schedule",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./class-schedule.component.html",
})
export class ClassScheduleComponent implements OnInit {
  // Days dropdown
  days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Standards & Batches
  standardsList: any[] = [];
  batchList: any[] = [];

  selectedStandardId: number | "" = "";

  // Form model
  form: any = {
    standard_id: "",
    batch_code: "",
    from_date: "",
    to_date: "",
    schedules: [
      {
        day_name: "",
        start_time: "",
        end_time: "",
        slot_interval: 30,
      },
    ],
  };

  // Validation messages
  dateError: string = "";
  timeErrors: { [key: number]: string } = {};

  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
  }

  /* ================= TODAY'S DATE GETTER ================= */
  get today(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.api.getStandards().subscribe({
      next: (res: any) => {
        this.standardsList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.standardsList = []),
    });
  }

  /* ================= STANDARD CHANGE ================= */
  onStandardChange(): void {
    this.form.batch_code = "";
    this.batchList = [];

    if (!this.form.standard_id) return;

    const standardId = Number(this.form.standard_id);

    this.api.getBatchesByStandard(standardId).subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
      },
      error: () => (this.batchList = []),
    });
  }

  /* ================= DATE VALIDATION ================= */
  validateDates(): boolean {
    if (!this.form.from_date || !this.form.to_date) {
      this.dateError = "";
      return true; // Not invalid, just incomplete
    }

    const fromDate = new Date(this.form.from_date);
    const toDate = new Date(this.form.to_date);

    if (toDate <= fromDate) {
      this.dateError = "End date must be greater than start date";
      return false;
    }

    this.dateError = "";
    return true;
  }

  /* ================= TIME VALIDATION FOR SCHEDULE ================= */
  validateScheduleTimes(index: number): boolean {
    const schedule = this.form.schedules[index];

    if (!schedule.start_time || !schedule.end_time) {
      this.timeErrors[index] = "";
      return true;
    }

    // Convert time strings to comparable values
    const startTime = schedule.start_time;
    const endTime = schedule.end_time;

    if (endTime <= startTime) {
      this.timeErrors[index] = "End time must be greater than start time";
      return false;
    }

    this.timeErrors[index] = "";
    return true;
  }

  /* ================= VALIDATE ALL SCHEDULE TIMES ================= */
  validateAllScheduleTimes(): boolean {
    let isValid = true;
    this.form.schedules.forEach((schedule: any, index: number) => {
      if (!this.validateScheduleTimes(index)) {
        isValid = false;
      }
    });
    return isValid;
  }

  /* ================= ON DATE CHANGE ================= */
  onDateChange(): void {
    this.validateDates();
  }

  /* ================= ON TIME CHANGE ================= */
onTimeChange(index: number): void {
  const schedule = this.form.schedules[index];

  if (!schedule.start_time || !schedule.end_time) {
    schedule.slot_interval = 0;
    return;
  }

  const start = schedule.start_time.split(":");
  const end = schedule.end_time.split(":");

  const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
  const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);

  if (endMinutes <= startMinutes) {
    this.timeErrors[index] = "End time must be greater than start time";
    schedule.slot_interval = 0;
    return;
  }

  this.timeErrors[index] = "";

  // Calculate interval
  schedule.slot_interval = endMinutes - startMinutes;
}
  /* ================= ADD / REMOVE DAY ================= */
  addSchedule(): void {
    this.form.schedules.push({
      day_name: "",
      start_time: "",
      end_time: "",
      slot_interval: 30,
    });
  }

  removeSchedule(index: number): void {
    if (this.form.schedules.length > 1) {
      this.form.schedules.splice(index, 1);
      // Clear time error for removed schedule
      delete this.timeErrors[index];
      // Re-index remaining time errors
      const newTimeErrors: { [key: number]: string } = {};
      Object.keys(this.timeErrors).forEach((key) => {
        const numKey = parseInt(key);
        if (numKey < index) {
          newTimeErrors[numKey] = this.timeErrors[numKey];
        } else if (numKey > index) {
          newTimeErrors[numKey - 1] = this.timeErrors[numKey];
        }
      });
      this.timeErrors = newTimeErrors;
    }
  }

  /* ================= VALIDATION ================= */
  isFormValid(): boolean {
    // Check basic fields
    if (
      !this.form.standard_id ||
      !this.form.batch_code ||
      !this.form.from_date ||
      !this.form.to_date
    ) {
      return false;
    }

    // Check date validation
    if (!this.validateDates()) {
      return false;
    }

    // Check schedules
    let schedulesValid = true;
    this.form.schedules.forEach((s: any, index: number) => {
      if (!s.day_name || !s.start_time || !s.end_time || !s.slot_interval) {
        schedulesValid = false;
      }
      // Check time validation for each schedule
      if (!this.validateScheduleTimes(index)) {
        schedulesValid = false;
      }
    });

    return schedulesValid;
  }

  /* ================= SUBMIT ================= */
  submit(): void {
    // Run all validations before submit
    if (!this.validateDates() || !this.validateAllScheduleTimes()) {
      return;
    }

    if (!this.isFormValid()) {
      alert("Please fill all required fields correctly");
      return;
    }

    this.loading = true;

    const payload = {
      standard_id: this.form.standard_id,
      batch_code: this.form.batch_code,
      from_date: this.form.from_date,
      to_date: this.form.to_date,
      schedules: this.form.schedules,
    };

    this.api.saveClassSchedule(payload).subscribe({
      next: () => {
        alert("Class schedule saved successfully");
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        alert(err?.error?.message || "Failed to save schedule");
        this.loading = false;
      },
    });
  }

  /* ================= RESET ================= */
  resetForm(): void {
    this.form = {
      standard_id: "",
      batch_code: "",
      from_date: "",
      to_date: "",
      schedules: [
        {
          day_name: "",
          start_time: "",
          end_time: "",
          slot_interval: 30,
        },
      ],
    };
    this.batchList = [];
    this.dateError = "";
    this.timeErrors = {};
  }
}
