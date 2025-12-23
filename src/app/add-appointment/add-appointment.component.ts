import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  // 👇 Modal control for partner details
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

  createForm() {
    this.appointmentForm = this.fb.group({
      name: [''],
      email: [''],
      mobile_number: [''],
      gender: [''],
      marital_status: [''],
      is_twins: [''],
      appointment_type: [''],
      date_of_birth: [''],
      time_of_birth: [''],
      country: ['India'],
      state: ['Maharashtra'],
      city: [''],
      subjects: [[]],
      source: [''],
      is_appointment_conducted: [''],
      appointment_status: [''],
      transaction_id: [''],
      appointment_date: [''],
      slot_time: [''],

      // 🆕 Partner Details
      partner_name: [''],
      partner_date_of_birth: [''],
      partner_time_of_birth: [''],
      partner_place_of_birth: [''],
    });
  }

  async initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => {
      const hasChangeTheme = this.store?.theme !== d?.theme;
      const hasChangeLayout = this.store?.layout !== d?.layout;
      this.store = d;
      this.isDark = this.store.theme === 'dark' || this.store.isDarkMode;

      if (hasChangeTheme || hasChangeLayout) {
        this.applyTheme();
      }
      this.isLoading = false;
    });
  }

  applyTheme() {
    document.body.classList.toggle('dark', this.isDark);
  }

  // ✅ Fetch slots by date
  onDateChange(event: any) {
    const date = event.target.value;
    if (!date) return;

    this.api.getSlotsByDate(date).subscribe({
      next: (res) => {
        if (res?.slots && Array.isArray(res.slots)) {
          this.slots = res.slots.filter((s: any) => !s.is_booked);
        } else {
          this.slots = [];
        }
        console.log('🎯 Slots loaded:', this.slots);
      },
      error: (err) => {
        console.error('Error fetching slots:', err);
        alert('Failed to load available slots');
      },
    });
  }

  // ✅ Format slot time to 12-hour format (AM/PM)
  formatTime(time: string): string {
    if (!time) return '';

    let [hourStr, minuteStr] = time.split(':');
    if (!minuteStr) minuteStr = '00';

    const hour = Number(hourStr);
    const minute = Number(minuteStr);

    if (isNaN(hour) || isNaN(minute)) return time;

    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;

    return `${adjustedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
  }

  // 🟨 Handle checkbox selection for subjects + open modal conditionally
  toggleSubject(subject: string, event: any) {
    const subjects = this.appointmentForm.value.subjects || [];

    if (event.target.checked) {
      subjects.push(subject);

      // ✅ Open modal if one of these selected
      if (['Divorce', 'Child Birth', 'Joint property holder'].includes(subject)) {
        this.showPartnerModal = true;
      }
    } else {
      const index = subjects.indexOf(subject);
      if (index >= 0) subjects.splice(index, 1);
    }

    this.appointmentForm.patchValue({ subjects });
  }

  // 👇 Close Partner modal
  closePartnerModal() {
    this.showPartnerModal = false;
  }

  // 🟩 Submit appointment form
  submitForm() {
    const payload = this.appointmentForm.value;
    console.log('📦 Submitting appointment:', payload);

    this.api.addAppointment(payload).subscribe({
      next: (res) => {
        console.log('✅ Appointment added:', res);
        alert('Appointment booked successfully!');
        this.appointmentForm.reset();
        this.showPartnerModal = false;
      },
      error: (err) => {
        console.error('❌ Error adding appointment:', err);
        alert('Failed to book appointment.');
      },
    });
  }
}
