import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
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

  maxDobDate: string = this.formatDate(new Date()); // today
  minAppointmentDate: string = this.formatDate(new Date()); // today only or future
  isRescheduleMode: boolean = false;
  paymentAmount: number = 700; // Set your consultation fee
  upiId: string = "mrunalk007@okhdfcbank"; // Set your UPI ID

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute, // ✅ ADD THIS
  ) {}

  ngOnInit() {
    this.createForm();
    this.watchAppointmentType();
    this.watchSource();

    const code = this.route.snapshot.queryParams["code"];
    console.log("Reschedule Code:", code); // 👈 ADD THIS

    if (code) {
      this.isRescheduleMode = true;
      this.loadAppointmentData(code); // 👈 correct method name
    }
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
      date_of_birth: ["", [Validators.required, this.noFutureDateValidator()]],
      time_of_birth: [""],
      country: ["India"],
      state: ["Maharashtra"],
      city: [""],
      subjects: [[]],
      source: [""],
      appointment_status: ["First Time"],

      transaction_id: [""],
      appointment_date: ["", Validators.required],
      slot_range: ["", Validators.required],
      friend_name: [""],

      partner_details: this.fb.array([]),

      partner_details_temp: this.fb.group({
        name: [""],
        date_of_birth: ["", [this.noFutureDateValidator()]],
        time_of_birth: [""],
        place_of_birth: [""],
      }),
    });
  }

  /* ================= GETTERS ================= */

  get partnerDetailsArray(): FormArray {
    return this.appointmentForm.get("partner_details") as FormArray;
  }

  get partnerTempGroup(): FormGroup {
    return this.appointmentForm.get("partner_details_temp") as FormGroup;
  }

  /* ================= WATCHERS ================= */

  watchAppointmentType() {
    this.appointmentForm
      .get("appointment_type")
      ?.valueChanges.subscribe((value) => {
        // 🚫 Do not auto-open modal in reschedule mode
        if (this.isRescheduleMode) return;

        if (value === "Online") {
          this.showOnlineModeModal = true;
        } else {
          this.showOnlineModeModal = false;
          this.appointmentForm.patchValue(
            { consultation_mode: "" },
            { emitEvent: false },
          );
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

  loadAppointmentData(code: string) {
    this.isLoading = true;

    this.api.getAppointmentByCode(code).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (!res?.success) {
          alert("Appointment not found");
          return;
        }

        const data = res.data;

        // 🔹 Helper function to format ISO → YYYY-MM-DD
        const formatDate = (dateStr: string) => {
          if (!dateStr) return "";
          return dateStr.split("T")[0];
        };

        // 🔹 Patch normal fields
        this.appointmentForm.patchValue(
          {
            name: data.name || "",
            email: data.email || "",
            mobile_number: data.mobile_number || "",
            gender: data.gender || "",
            marital_status: data.marital_status || "",
            is_twins: !!data.is_twins,
            appointment_type: data.appointment_type || "",
            consultation_mode: data.consultation_mode || "",

            date_of_birth: formatDate(data.date_of_birth),
            time_of_birth: data.time_of_birth || "",

            country: data.country || "India",
            state: data.state || "Maharashtra",
            city: data.city || "",

            subjects: data.subjects || [],
            source: data.source || "",
            friend_name: data.friend_name || "",
            transaction_id: data.transaction_id || "",

            appointment_status: ["First Time"],
            appointment_date: formatDate(data.appointment_date),
            slot_range: data.slot_range || "",
          },
          { emitEvent: false },
        );

        // 🔹 Load partner details
        if (data.partner_details && data.partner_details.length > 0) {
          this.partnerDetailsArray.clear();

          data.partner_details.forEach((partner: any) => {
            this.partnerDetailsArray.push(
              this.fb.group({
                name: partner.name || "",
                date_of_birth: formatDate(partner.date_of_birth),
                time_of_birth: partner.time_of_birth || "",
                place_of_birth: partner.place_of_birth || "",
                relation_type: partner.relation_type || "",
              }),
            );
          });
        }
      },

      error: () => {
        this.isLoading = false;
        alert("Failed to fetch appointment data");
      },
    });
  }

  /* ================= SLOT ================= */

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    if (!selectedDate) {
      this.slots = [];
      return;
    }

    this.api.getSlotsByDate(selectedDate).subscribe({
      next: (res: any) => {
        this.slots = (res?.slots || []).filter((s: any) => !s.is_booked);
      },
      error: () => {
        this.slots = [];
        alert("Failed to load available slots.");
      },
    });
  }

  private formatDate(date: Date): string {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  /* ================= SUBJECT ================= */

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

  /* ================= PARTNER MODAL ================= */

  openPartnerModal(type: "spouse" | "joint") {
    this.partnerModalType = type;
    this.showPartnerModal = true;
    this.partnerTempGroup.reset();
  }

  closePartnerModal() {
    this.showPartnerModal = false;
    this.partnerTempGroup.reset();
  }

  savePartnerDetails() {
    const temp = this.partnerTempGroup;
    temp.markAllAsTouched();

    if (temp.invalid) {
      alert("Please fill required partner details");
      return;
    }

    this.partnerDetailsArray.push(
      this.fb.group({
        name: temp.value.name,
        date_of_birth: temp.value.date_of_birth,
        time_of_birth: temp.value.time_of_birth || null,
        place_of_birth: temp.value.place_of_birth || null,
        relation_type: this.partnerModalType,
      }),
    );

    temp.reset();
    this.showPartnerModal = false;
  }

  copyUpiId() {
    navigator.clipboard
      .writeText(this.upiId)
      .then(() => {
        // You can add a toast notification here
        alert("UPI ID copied to clipboard! / UPI ID कॉपी झाली!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  /* ================= ONLINE MODAL ================= */

  confirmConsultationMode() {
    if (!this.appointmentForm.value.consultation_mode) {
      alert("Please select consultation mode");
      return;
    }
    this.showOnlineModeModal = false;
  }

  closeOnlineModeModal() {
    this.showOnlineModeModal = false;
  }

  closeFriendModal() {
    this.showFriendModal = false;
  }

  noFutureDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selectedDate > today ? { futureDate: true } : null;
    };
  }

  noPastDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const selected = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selected < today ? { pastDate: true } : null;
    };
  }

  /* ================= SUBMIT ================= */

  submitForm() {
    if (this.appointmentForm.invalid) {
      this.markFormGroupTouched(this.appointmentForm);
      alert("Please fill all required fields correctly");
      return;
    }

    if (
      this.appointmentForm.get("appointment_type")?.value === "Online" &&
      !this.appointmentForm.get("consultation_mode")?.value
    ) {
      alert("Please select consultation mode");
      return;
    }

    if (!this.appointmentForm.get("slot_range")?.value) {
      alert("Please select a time slot");
      return;
    }

    this.isSubmitting = true;

    const appointmentCode = this.route.snapshot.queryParams["code"];

    // ==========================================
    // 🔥 RESCHEDULE MODE
    // ==========================================
    if (appointmentCode) {
      this.api
        .rescheduleAppointment({
          appointment_code: appointmentCode,
          new_date: this.appointmentForm.get("appointment_date")?.value,
          new_slot_range: this.appointmentForm.get("slot_range")?.value,
        })
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            alert("Appointment rescheduled successfully");
          },
          error: (err) => {
            this.isSubmitting = false;
            alert(err?.error?.message || "Failed to reschedule appointment");
          },
        });

      return;
    }

    // ==========================================
    // 🟢 NORMAL BOOKING MODE
    // ==========================================

    const payload = {
      ...this.appointmentForm.getRawValue(), // 🔥 important (includes disabled fields)
      is_twins: !!this.appointmentForm.getRawValue().is_twins,
      is_appointment_conducted: false,
      booked_by: "customer",
    };

    this.api.addAppointment(payload).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;

        this.bookingReference =
          response?.appointment_code || `APP-${Date.now()}`;

        this.showSuccessMessage = true;

        // Reset form
        this.appointmentForm.reset({
          country: "India",
          state: "Maharashtra",
          is_twins: false,
          is_appointment_conducted: false,
        });

        this.partnerDetailsArray.clear();
        this.slots = [];
      },
      error: (err) => {
        this.isSubmitting = false;
        alert(err?.error?.message || "Failed to book appointment");
      },
    });
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }

  bookAnotherAppointment() {
    this.showSuccessMessage = false;
    this.bookingReference = "";
  }
}
