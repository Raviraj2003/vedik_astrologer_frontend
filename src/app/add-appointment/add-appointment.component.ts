import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
})
export class AddAppointmentComponent implements OnInit {
  store: any;
  isDark = false;
  isLoading = true;

  slots: any[] = [];
  appointmentForm!: FormGroup;
  showPartnerModal = false;

  constructor(
    public storeData: Store<any>,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initStore();
    this.createForm();
  }

  // ================= FORM =================
  createForm() {
    this.appointmentForm = this.fb.group({
      name: [''],
      email: [''],
      mobile_number: [''],
      gender: [''],
      marital_status: [''],

      // ✅ BOOLEAN DEFAULTS (FIX)
      is_twins: [false],
      is_appointment_conducted: [false],

      appointment_type: [''],
      date_of_birth: [''],
      time_of_birth: [''],
      country: ['India'],
      state: ['Maharashtra'],
      city: [''],
      subjects: [[]],
      source: [''],
      appointment_status: [''],
      transaction_id: [''],
      appointment_date: [''],
      slot_range: [''],

      // Partner details
      partner_name: [''],
      partner_date_of_birth: [''],
      partner_time_of_birth: [''],
      partner_place_of_birth: [''],
    });
  }

  // ================= THEME =================
  async initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => {
      this.store = d;
      this.isDark = this.store.theme === 'dark' || this.store.isDarkMode;
      document.body.classList.toggle('dark', this.isDark);
      this.isLoading = false;
    });
  }

  // ================= SLOTS =================
  onDateChange(event: any) {
    const date = event.target.value;
    if (!date) return;

    this.api.getSlotsByDate(date).subscribe({
      next: (res) => {
        this.slots = Array.isArray(res?.slots)
          ? res.slots.filter((s: any) => !s.is_booked)
          : [];
      },
      error: () => alert('Failed to load slots'),
    });
  }

  // ================= SUBJECTS =================
  toggleSubject(subject: string, event: any) {
    const subjects = this.appointmentForm.value.subjects || [];

    if (event.target.checked) {
      subjects.push(subject);

      if (['Divorce', 'Child Birth', 'Joint property holder'].includes(subject)) {
        this.showPartnerModal = true;
      }
    } else {
      const i = subjects.indexOf(subject);
      if (i >= 0) subjects.splice(i, 1);
    }

    this.appointmentForm.patchValue({ subjects });
  }

  closePartnerModal() {
    this.showPartnerModal = false;
  }

  // ================= SUBMIT =================
  submitForm() {
  const raw = this.appointmentForm.value;

  const payload = {
    ...raw,

    // ✅ DATE FIELDS → NULL
    date_of_birth: raw.date_of_birth || null,
    appointment_date: raw.appointment_date || null,
    partner_date_of_birth: raw.partner_date_of_birth || null,

    // ✅ TIME FIELDS → NULL  🔥 THIS FIXES YOUR ERROR
    time_of_birth: raw.time_of_birth || null,
    partner_time_of_birth: raw.partner_time_of_birth || null,

    // ✅ BOOLEAN SAFETY
    is_twins: raw.is_twins === true,
    is_appointment_conducted: raw.is_appointment_conducted === true,
  };

  console.log('📦 FINAL PAYLOAD:', payload);

  this.api.addAppointment(payload).subscribe({
    next: () => {
      alert('✅ Appointment booked successfully!');
      this.appointmentForm.reset({
        is_twins: false,
        is_appointment_conducted: false,
      });
      this.slots = [];
      this.showPartnerModal = false;
    },
    error: (err) => {
      console.error('❌ Error:', err);
      alert('Failed to book appointment.');
    },
  });
}

}
