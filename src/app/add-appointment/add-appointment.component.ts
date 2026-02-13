import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormArray,
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

  /* ================= STORE ================= */

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

      partner_details: this.fb.array([]),

      partner_details_temp: this.fb.group({
        name: [""],
        date_of_birth: [""],
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

  /* ================= ONLINE / FRIEND MODAL ================= */

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

  /* ================= SUBMIT ================= */

  submitForm() {
    if (this.appointmentForm.invalid) {
      this.markFormGroupTouched(this.appointmentForm);
      alert("Please fill all required fields correctly");
      return;
    }

    if (
      this.appointmentForm.value.appointment_type === "Online" &&
      !this.appointmentForm.value.consultation_mode
    ) {
      alert("Please select consultation mode");
      return;
    }

    if (!this.appointmentForm.value.slot_range) {
      alert("Please select a time slot");
      return;
    }

    this.isSubmitting = true;

    const payload = {
      ...this.appointmentForm.value,
      is_twins: this.appointmentForm.value.is_twins === true,
      is_appointment_conducted: false,
      booked_by: "customer",
    };

    this.api.addAppointment(payload).subscribe({
      next: (response: any) => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.bookingReference =
          response.appointment_code || `APP-${Date.now()}`;

        this.appointmentForm.reset({
          country: "India",
          state: "Maharashtra",
          is_twins: false,
          is_appointment_conducted: false,
        });

        this.slots = [];
      },
      error: (err) => {
        this.isSubmitting = false;
        alert(err.error?.message || "Failed to book appointment");
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
