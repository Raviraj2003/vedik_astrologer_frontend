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

      // ✅ Nested FormGroup for partner details
      partner_details: this.fb.group({
        name: [""],
        date_of_birth: [""],
        time_of_birth: [""],
        place_of_birth: [""],
        relation_type: [""], // 'spouse' or 'joint'
      }),
    });
  }

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

  onDateChange(event: any) {
    const date = event.target.value;
    if (!date) return;

    this.api.getSlotsByDate(date).subscribe({
      next: (res) => {
        this.slots = Array.isArray(res?.slots)
          ? res.slots.filter((s: any) => !s.is_booked)
          : [];
      },
      error: () => alert("Failed to load slots"),
    });
  }

  toggleSubject(subject: string, event: any) {
    const subjects = this.appointmentForm.value.subjects || [];
    const checkbox = event.target;
    const isChecked = checkbox.checked;

    if (isChecked) {
      subjects.push(subject);

      if (subject === "Joint property holder") {
        this.partnerModalType = "joint";
        this.openPartnerModal("joint");
      }

      if (["Divorce", "Child Birth"].includes(subject)) {
        this.partnerModalType = "spouse";
        this.openPartnerModal("spouse");
      }
    } else {
      const index = subjects.indexOf(subject);
      if (index >= 0) {
        subjects.splice(index, 1);
      }
    }

    this.appointmentForm.patchValue({ subjects });
  }

  openPartnerModal(type: "spouse" | "joint") {
    this.partnerModalType = type;
    this.showPartnerModal = true;

    // Set relation type in partner details
    this.appointmentForm.get("partner_details.relation_type")?.setValue(type);
  }

  closePartnerModal() {
    this.showPartnerModal = false;

    // Clear partner details if modal is closed without saving
    this.appointmentForm.get("partner_details")?.reset({
      relation_type: this.partnerModalType,
    });
  }

  savePartnerDetails() {
    const partnerDetails = this.appointmentForm.get("partner_details")?.value;

    // Basic validation
    if (!partnerDetails.name || !partnerDetails.date_of_birth) {
      alert(
        `Please fill required ${this.partnerModalType === "joint" ? "co-owner" : "spouse"} details`,
      );
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

  submitForm() {
    if (this.appointmentForm.invalid) {
      alert("Please fill all required fields correctly");
      this.appointmentForm.markAllAsTouched();
      return;
    }

    const raw = this.appointmentForm.value;
    const partner = raw.partner_details;

    const payload = {
      // Main form fields
      name: raw.name,
      email: raw.email,
      mobile_number: raw.mobile_number,
      gender: raw.gender,
      marital_status: raw.marital_status,
      is_twins: raw.is_twins === true,
      is_appointment_conducted: raw.is_appointment_conducted === true,
      appointment_type: raw.appointment_type,
      consultation_mode: raw.consultation_mode,
      date_of_birth: raw.date_of_birth || null,
      time_of_birth: raw.time_of_birth || null,
      country: raw.country,
      state: raw.state,
      city: raw.city,
      subjects: raw.subjects,
      source: raw.source,
      appointment_status: raw.appointment_status,
      transaction_id: raw.transaction_id,
      appointment_date: raw.appointment_date || null,
      slot_range: raw.slot_range,
      friend_name: raw.friend_name || null,

      // Partner details (flattened for backend)
      partner_name: partner?.name || null,
      partner_date_of_birth: partner?.date_of_birth || null,
      partner_time_of_birth: partner?.time_of_birth || null,
      partner_place_of_birth: partner?.place_of_birth || null,
      partner_relation_type: partner?.relation_type || null,
    };

    console.log("📦 FINAL PAYLOAD:", payload);

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
        console.error("❌ Error:", err);
        alert(
          "Failed to book appointment: " + (err.error?.message || err.message),
        );
      },
    });
  }
}
