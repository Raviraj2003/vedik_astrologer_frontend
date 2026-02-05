import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ApiService } from "src/app/service/api.service";
import { toggleAnimation } from "src/app/shared/animations";

interface DashboardStats {
  today: number;
  future: number;
  empty: number;
  conducted: number;
  [key: string]: number;
}

type TabType = "today" | "future" | "empty" | "conducted";

@Component({
  templateUrl: "./Dashboard.html",
  animations: [toggleAnimation],
})
export class DashboardComponent implements OnInit {
  store: any;
  isLoading = true;

  // 🔹 Tabs
  activeTab: TabType = "today";
  tabs: TabType[] = ["today", "future", "empty", "conducted"];

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

  // Statistics with proper typing
  stats: DashboardStats = {
    today: 0,
    future: 0,
    empty: 0,
    conducted: 0,
  };

  constructor(
    public storeData: Store<any>,
    private api: ApiService,
  ) {
    this.initStore();
  }

  ngOnInit(): void {
    this.loadAppointments();
    this.calculateInitialStats();
  }

  // ===============================
  // 🔹 CALCULATE INITIAL STATS
  // ===============================
  calculateInitialStats() {
    this.stats = {
      today: 0,
      future: 0,
      empty: 0,
      conducted: 0,
    };
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
      case "today":
        apiCall = this.api.getTodayAppointments();
        break;

      case "future":
        apiCall = this.api.getFutureAppointments();
        break;

      case "empty":
        apiCall = this.api.getTodayEmptySlots();
        break;

      case "conducted":
        apiCall = this.api.getByConductStatus();
        break;

      default:
        this.isLoading = false;
        return;
    }

    apiCall.subscribe({
      next: (res: any) => {
        if (this.activeTab === "empty") {
          this.appointments = (res?.empty_slots || []).map((slot: any) => ({
            ...slot,
            slot_time: slot.slot_range,
          }));
          this.totalEmptySlots = res?.total_empty_slots || 0;
        } else {
          this.appointments = res?.data || [];
        }

        this.filteredAppointments = this.appointments;
        this.isLoading = false;

        this.updateStatsFromResponse(res);
      },
      error: (err) => {
        console.error("❌ API Error:", err);
        this.appointments = [];
        this.filteredAppointments = [];
        this.isLoading = false;
      },
    });
  }

  // ===============================
  // 🔹 UPDATE STATISTICS FROM RESPONSE
  // ===============================
  updateStatsFromResponse(res: any) {
    if (this.activeTab === "empty") {
      this.stats.empty = res?.total_empty_slots || this.appointments.length;
    } else {
      this.stats[this.activeTab] = this.appointments.length;
    }
  }

  // ===============================
  // 🔹 TAB LABELS
  // ===============================
  getTabLabel(tab: string): string {
    const labels: { [key: string]: string } = {
      today: "Today's",
      future: "Upcoming",
      empty: "Empty Slots",
      conducted: "Conducted",
    };
    return labels[tab] || tab;
  }

  // ===============================
  // 🔹 TAB CHANGE
  // ===============================
  setActiveTab(tab: TabType) {
    if (this.isLoading) return;
    this.activeTab = tab;
    this.loadAppointments();
  }

  // ===============================
  // 🔹 GET TAB ICON
  // ===============================
  getTabIcon(tab: string): string {
    const icons: { [key: string]: string } = {
      today: "📅",
      future: "⏳",
      empty: "⏰",
      conducted: "✅",
    };
    return icons[tab] || "📋";
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
      alert("⚠️ Please enter a valid price");
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
          appt.appointment_status = newStatus ? "conducted" : "pending";
          this.isLoading = false;
          this.showToast(
            `Appointment ${appt.appointment_code} updated successfully`,
            "success",
          );
        },
        error: (err) => {
          console.error("❌ Update failed:", err);
          this.isLoading = false;
          this.showToast("Failed to update appointment", "error");
        },
      });
  }

  // ===============================
  // 🔹 TOAST NOTIFICATION
  // ===============================
  showToast(message: string, type: "success" | "error" | "info" = "info") {
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white ${
      type === "success"
        ? "bg-green-600"
        : type === "error"
          ? "bg-red-600"
          : "bg-blue-600"
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
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
  // 🔹 FORMAT CURRENCY
  // ===============================
  formatCurrency(amount: number | undefined): string {
    if (!amount) return "-";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // ===============================
  // 🔹 GET STATUS COLOR
  // ===============================
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      conducted:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      confirmed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
  }

  // ===============================
  // 🔹 STORE INIT
  // ===============================
  initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => (this.store = d));
  }
}
