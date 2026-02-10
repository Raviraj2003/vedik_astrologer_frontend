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

  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
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
    }
  }

  /* ================= VALIDATION ================= */
  isFormValid(): boolean {
    if (
      !this.form.standard_id ||
      !this.form.batch_code ||
      !this.form.from_date ||
      !this.form.to_date
    ) {
      return false;
    }

    return this.form.schedules.every(
      (s: any) => s.day_name && s.start_time && s.end_time && s.slot_interval,
    );
  }

  /* ================= SUBMIT ================= */
  submit(): void {
    if (!this.isFormValid()) {
      alert("Please fill all required fields");
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
  }
}
