import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/service/api.service';
import { toggleAnimation } from 'src/app/shared/animations';

@Component({
  templateUrl: './Dashboard.html',
  animations: [toggleAnimation],
})
export class DashboardComponent implements OnInit {
  store: any;
  isLoading = true;

  // 🔹 Tabs
  activeTab: string = 'today';

  // 🔹 Data
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  totalEmptySlots: number = 0;

  // 🔹 Modals
  selectedAppointment: any = null;

  priceModal = {
    show: false,
    appointment: null as any,
    newStatus: false,
    price: 0,
  };

  constructor(
    public storeData: Store<any>,
    private api: ApiService
  ) {
    this.initStore();
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  // ===============================
  // 🔹 LOAD DATA BASED ON TAB
  // ===============================
  loadAppointments() {
    this.isLoading = true;
    this.appointments = [];
    this.filteredAppointments = [];

    let apiCall;

    switch (this.activeTab) {
      case 'today':
        apiCall = this.api.getTodayAppointments();
        break;

      case 'future':
        apiCall = this.api.getFutureAppointments(); // ✅ FUTURE
        break;

      case 'empty':
        apiCall = this.api.getTodayEmptySlots();
        break;

      case 'conducted':
        apiCall = this.api.getByConductStatus();
        break;

      default:
        this.isLoading = false;
        return;
    }

    apiCall.subscribe({
      next: (res: any) => {
        if (this.activeTab === 'empty') {
  this.appointments = (res?.empty_slots || []).map((slot: any) => ({
    ...slot,
    slot_time: slot.slot_range // normalize
  }));
  this.totalEmptySlots = res?.total_empty_slots || 0;
}
 else {
          this.appointments = res?.data || [];
        }

        this.filteredAppointments = this.appointments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ API Error:', err);
        this.appointments = [];
        this.filteredAppointments = [];
        this.isLoading = false;
      },
    });
  }

  // ===============================
  // 🔹 TAB LABELS
  // ===============================
  getTabLabel(tab: string): string {
    switch (tab) {
      case 'today':
        return "Today's";
      case 'future':
        return 'Future';
      case 'empty':
        return 'Empty Slots';
      case 'conducted':
        return 'Conducted';
      default:
        return tab;
    }
  }

  // ===============================
  // 🔹 TAB CHANGE
  // ===============================
  setActiveTab(tab: string) {
    if (this.isLoading) return;
    this.activeTab = tab;
    this.loadAppointments();
  }

  // ===============================
  // 🔹 CONDUCT STATUS (WITH PRICE)
  // ===============================
  toggleConducted(appt: any) {
    this.priceModal.show = true;
    this.priceModal.appointment = appt;
    this.priceModal.newStatus = !appt.is_appointment_conducted;
    this.priceModal.price = appt.price || 1500;
  }

  confirmPriceUpdate() {
    const appt = this.priceModal.appointment;
    const price = Number(this.priceModal.price);
    const newStatus = this.priceModal.newStatus;

    if (!price || price <= 0) {
      alert('⚠️ Please enter a valid price');
      return;
    }

    this.isLoading = true;
    this.closePriceModal();

    this.api
      .updateConductStatus(appt.appointment_code, newStatus, price)
      .subscribe({
        next: () => {
          appt.is_appointment_conducted = newStatus;
          appt.price = price;
          appt.appointment_status = newStatus ? 'conducted' : 'pending';
          this.isLoading = false;
          alert(`✅ Appointment ${appt.appointment_code} updated`);
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
          this.isLoading = false;
          alert('❌ Failed to update appointment');
        },
      });
  }

  closePriceModal() {
    this.priceModal.show = false;
    this.priceModal.appointment = null;
    this.priceModal.price = 0;
  }

  // ===============================
  // 🔹 DETAILS MODAL
  // ===============================
  openDetails(appt: any) {
    this.selectedAppointment = appt;
  }

  closePopup() {
    this.selectedAppointment = null;
  }

  // ===============================
  // 🔹 STORE INIT
  // ===============================
  initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => (this.store = d));
  }
}
