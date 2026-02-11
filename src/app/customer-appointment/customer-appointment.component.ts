import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-customer-appointment",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./customer-appointment.component.html",
  styleUrls: ["./customer-appointment.component.css"],
})
export class CustomerAppointmentComponent implements OnInit {
  isDark = false;
  isLoading = false;
  isSubmitting = false;
  showSuccessMessage = false;
  bookingReference: string = "";

  slots: any[] = [];
  appointmentForm!: FormGroup;
  showPartnerModal = false;
  partnerModalType: "spouse" | "joint" = "spouse";
  showFriendModal = false;
  showOnlineModeModal = false;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
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
      appointment_date: ["", Validators.required],
      slot_range: ["", Validators.required],
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

  /* ================= SLOT LOGIC ================= */

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    if (!selectedDate) {
      this.slots = [];
      return;
    }

    const today = new Date();
    const pickedDate = new Date(selectedDate);

    // Check if selected date is in the past
    if (pickedDate < today && !this.isSameDate(today, pickedDate)) {
      alert("Please select a future date");
      this.appointmentForm.patchValue({ appointment_date: "" });
      this.slots = [];
      return;
    }

    // Use the existing API (no auth needed now)
    this.api.getSlotsByDate(selectedDate).subscribe({
      next: (res: any) => {
        let slots = Array.isArray(res?.slots) ? res.slots : [];

        // Remove booked slots
        slots = slots.filter((s: any) => !s.is_booked);

        // If today → remove expired time slots
        if (this.isSameDate(today, pickedDate)) {
          const now = new Date();
          slots = slots.filter((slot: any) =>
            this.isSlotFuture(slot.slot_range, now),
          );
        }

        this.slots = slots;

        // Auto-select first slot if only one available
        if (slots.length === 1) {
          this.appointmentForm.patchValue({ slot_range: slots[0].slot_range });
        }
      },
      error: (err) => {
        console.error("Failed to load slots:", err);
        this.slots = [];
        alert("Failed to load available slots. Please try again.");
      },
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
      this.markFormGroupTouched(this.appointmentForm);
      alert("Please fill all required fields correctly (marked with *)");
      return;
    }

    if (this.slots.length === 0) {
      alert("Please select an appointment date with available slots");
      return;
    }

    if (!this.appointmentForm.value.slot_range) {
      alert("Please select a time slot");
      return;
    }

    this.isSubmitting = true;
    this.showSuccessMessage = false;

    const raw = this.appointmentForm.value;
    const partner = raw.partner_details;

    // Prepare payload exactly as your admin form does
    const payload = {
      ...raw,
      is_twins: raw.is_twins === true,
      is_appointment_conducted: raw.is_appointment_conducted === true,
      booked_by: "customer", // Add this to identify customer booking

      partner_name: partner?.name || null,
      partner_date_of_birth: partner?.date_of_birth || null,
      partner_time_of_birth: partner?.time_of_birth || null,
      partner_place_of_birth: partner?.place_of_birth || null,
      partner_relation_type: partner?.relation_type || null,
    };

    // Remove the partner_details object since we extracted its fields
    delete payload.partner_details;

    console.log("Submitting payload:", payload);

    // Use the same API as admin form (no auth needed)
    this.api.addAppointment(payload).subscribe({
      next: (response: any) => {
        console.log("Appointment booked successfully:", response);
        this.isSubmitting = false;
        this.showSuccessMessage = true;

        // Store booking reference for display
        this.bookingReference =
          response.id ||
          response.bookingId ||
          response.reference ||
          `APP-${Date.now().toString().slice(-8)}`;

        // Reset form but keep country and state defaults
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

        // Scroll to success message
        setTimeout(() => {
          document.querySelector("#success-message")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error("Booking error:", err);

        let errorMessage = "Failed to book appointment. Please try again.";

        if (err.error?.message) {
          errorMessage = err.error.message;
        } else if (err.status === 400) {
          errorMessage = "Invalid data. Please check all fields and try again.";
        } else if (err.status === 409) {
          errorMessage =
            "This slot is already booked. Please select another slot.";
        }

        alert(errorMessage);
      },
    });
  }

  // Helper to mark all fields as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }

  // Helper to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.appointmentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Reset success message and form
  bookAnotherAppointment() {
    this.showSuccessMessage = false;
    this.bookingReference = "";
  }
}
