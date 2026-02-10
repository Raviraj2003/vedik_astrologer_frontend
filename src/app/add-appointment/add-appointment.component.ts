import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-add-appointment",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./add-appointment.component.html",
  styleUrls: ["./add-appointment.component.css"],
})
export class AddAppointmentComponent implements OnInit {
  store: any;
  isDark = false;
  isLoading = true;

  slots: any[] = [];
  appointmentForm!: FormGroup;
  showPartnerModal = false;
  partnerModalType: "spouse" | "joint" = "spouse";
  showFriendModal = false;
  showOnlineModeModal = false;

  constructor(
    public storeData: Store<any>,
    private api: ApiService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.initStore();
    this.createForm();
    this.watchAppointmentType();
    this.watchSource();
  }

  /* ================= FORM ================= */

  createForm() {
    this.appointmentForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile_number: [
        "",
        [Validators.required, Validators.pattern(/^\d{10}$/)],
      ],
      gender: [""],
      marital_status: [""],
      is_twins: [false],
      is_appointment_conducted: [false],
      appointment_type: [""],
      consultation_mode: [""],
      date_of_birth: [""],
      time_of_birth: [""],
      country: ["India"],
      state: ["Maharashtra"],
      city: [""],
      subjects: [[]],
      source: [""],
      appointment_status: [""],
      transaction_id: [""],
      appointment_date: [""],
      slot_range: [""],
      friend_name: [""],

      partner_details: this.fb.group({
        name: [""],
        date_of_birth: [""],
        time_of_birth: [""],
        place_of_birth: [""],
        relation_type: [""],
      }),
    });
  }

  /* ================= WATCHERS ================= */

  watchAppointmentType() {
    this.appointmentForm
      .get("appointment_type")
      ?.valueChanges.subscribe((value) => {
        if (value === "Online") {
          this.showOnlineModeModal = true;
        } else {
          this.showOnlineModeModal = false;
          this.appointmentForm.patchValue({ consultation_mode: "" });
        }
      });
  }

  watchSource() {
    this.appointmentForm.get("source")?.valueChanges.subscribe((value) => {
      if (value === "Friend") {
        this.showFriendModal = true;
      } else {
        this.showFriendModal = false;
        this.appointmentForm.patchValue({ friend_name: "" });
      }
    });
  }

  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d;
        this.isDark = this.store.theme === "dark" || this.store.isDarkMode;
        document.body.classList.toggle("dark", this.isDark);
        this.isLoading = false;
      });
  }

  /* ================= SLOT LOGIC (UPDATED) ================= */

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    if (!selectedDate) return;

    const today = new Date();
    const pickedDate = new Date(selectedDate);

    this.api.getSlotsByDate(selectedDate).subscribe({
      next: (res) => {
        let slots = Array.isArray(res?.slots) ? res.slots : [];

        // ❌ Remove booked slots
        slots = slots.filter((s: any) => !s.is_booked);

        // ⏰ If today → remove expired time slots
        if (this.isSameDate(today, pickedDate)) {
          const now = new Date();
          slots = slots.filter((slot: any) =>
            this.isSlotFuture(slot.slot_range, now),
          );
        }

        this.slots = slots;
      },
      error: () => alert("Failed to load slots"),
    });
  }

  isSameDate(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  isSlotFuture(slotRange: string, now: Date): boolean {
    // Example: "10:00 AM - 11:00 AM"
    const endTime = slotRange.split("-")[1]?.trim();
    if (!endTime) return false;

    const slotEndTime = this.convertTimeToDate(endTime, now);
    return slotEndTime.getTime() > now.getTime();
  }

  convertTimeToDate(timeStr: string, baseDate: Date): Date {
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (meridian === "PM" && hours < 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const date = new Date(baseDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  /* ================= SUBJECT / MODALS ================= */

  toggleSubject(subject: string, event: any) {
    const subjects = this.appointmentForm.value.subjects || [];
    const isChecked = event.target.checked;

    if (isChecked) {
      subjects.push(subject);

      if (subject === "Joint property holder") {
        this.openPartnerModal("joint");
      }

      if (["Divorce", "Child Birth"].includes(subject)) {
        this.openPartnerModal("spouse");
      }
    } else {
      const index = subjects.indexOf(subject);
      if (index >= 0) subjects.splice(index, 1);
    }

    this.appointmentForm.patchValue({ subjects });
  }

  openPartnerModal(type: "spouse" | "joint") {
    this.partnerModalType = type;
    this.showPartnerModal = true;
    this.appointmentForm.get("partner_details.relation_type")?.setValue(type);
  }

  closePartnerModal() {
    this.showPartnerModal = false;
    this.appointmentForm.get("partner_details")?.reset({
      relation_type: this.partnerModalType,
    });
  }

  savePartnerDetails() {
    const p = this.appointmentForm.get("partner_details")?.value;
    if (!p.name || !p.date_of_birth) {
      alert("Please fill required partner details");
      return;
    }
    this.showPartnerModal = false;
  }

  closeOnlineModeModal() {
    this.showOnlineModeModal = false;
  }

  closeFriendModal() {
    this.showFriendModal = false;
  }

  /* ================= SUBMIT ================= */

  submitForm() {
    if (this.appointmentForm.invalid) {
      alert("Please fill all required fields correctly");
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const raw = this.appointmentForm.value;
    const partner = raw.partner_details;

    const payload = {
      ...raw,
      is_twins: raw.is_twins === true,
      is_appointment_conducted: raw.is_appointment_conducted === true,

      partner_name: partner?.name || null,
      partner_date_of_birth: partner?.date_of_birth || null,
      partner_time_of_birth: partner?.time_of_birth || null,
      partner_place_of_birth: partner?.place_of_birth || null,
      partner_relation_type: partner?.relation_type || null,
    };

    this.api.addAppointment(payload).subscribe({
      next: () => {
        alert("✅ Appointment booked successfully!");
        this.appointmentForm.reset({
          country: "India",
          state: "Maharashtra",
          is_twins: false,
          is_appointment_conducted: false,
        });
        this.slots = [];
        this.showPartnerModal = false;
        this.showOnlineModeModal = false;
        this.showFriendModal = false;
      },
      error: (err) => {
        alert(
          "Failed to book appointment: " + (err.error?.message || err.message),
        );
      },
    });
  }
}
