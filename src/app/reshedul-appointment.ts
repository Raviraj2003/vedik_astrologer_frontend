import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-reshedul-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reshedul-appointment.html',
})
export class ReshedulAppointmentComponent implements OnInit {

  appointments: any[] = [];
  filteredAppointments: any[] = [];
  slots: any[] = [];

  selectedAppointment: any = null;
  newDate = '';
  newSlot = '';

  searchText = '';
  isLoading = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPendingAppointments();
  }

  // ================= LOAD PENDING APPOINTMENTS =================
  loadPendingAppointments() {
    this.isLoading = true;

    this.api.getPendingAppointments().subscribe({
      next: (res) => {
        this.appointments = (res.data || []).filter(
          (a: any) => a.appointment_status === 'pending'
        );
        this.filteredAppointments = this.appointments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  // ================= SEARCH =================
  applySearch() {
    const value = this.searchText.toLowerCase().trim();

    this.filteredAppointments = this.appointments.filter(a =>
      a.name?.toLowerCase().includes(value) ||
      a.mobile_number?.includes(value)
    );
  }

  // ================= SELECT APPOINTMENT =================
  toggleSelection(appt: any) {
  // If clicking the same appointment → UNSELECT
  if (
    this.selectedAppointment &&
    this.selectedAppointment.appointment_code === appt.appointment_code
  ) {
    this.selectedAppointment = null;
    this.newDate = '';
    this.newSlot = '';
    this.slots = [];
    return;
  }

  // Else select new appointment
  this.selectedAppointment = appt;
  this.newDate = '';
  this.newSlot = '';
  this.slots = [];
}


  // ================= LOAD SLOTS =================
  loadSlots() {
    if (!this.newDate) return;

    this.api.getSlotsByDate(this.newDate).subscribe({
      next: (res) => {
        this.slots = res.slots || []; // ✅ IMPORTANT FIX
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ================= RESCHEDULE =================
  reschedule() {
    if (!this.selectedAppointment) return;

    const payload = {
      appointment_code: this.selectedAppointment.appointment_code,
      new_date: this.newDate,
      new_slot_range: this.newSlot,
    };

    this.api.rescheduleAppointment(payload).subscribe({
      next: () => {
        alert('Appointment rescheduled successfully');
        this.selectedAppointment = null;
        this.newDate = '';
        this.newSlot = '';
        this.slots = [];
        this.loadPendingAppointments();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to reschedule appointment');
      },
    });
  }
}
