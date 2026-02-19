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

  // 🔹 Data - Store all raw data separately
  rawAppointments: {
    today: any[];
    future: any[];
    empty: any[];
    conducted: any[];
  } = {
    today: [],
    future: [],
    empty: [],
    conducted: [],
  };

  // Display data for current tab
  displayAppointments: any[] = [];
  totalEmptySlots: number = 0;

  // All-time collection data
  allConductedAppointments: any[] = [];
  totalCollectionAmount: number = 0;
  isTotalCollectionLoading: boolean = true;

  // 🔹 Modals
  selectedAppointment: any = null;

  priceModal = {
    show: false,
    appointment: null as any,
    newStatus: false,
    price: 0,
  };

  // Statistics
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
    this.loadAllData();
  }

  // ===============================
  // 🔹 LOAD ALL DATA ON INITIALIZATION
  // ===============================
  loadAllData() {
    this.isLoading = true;

    // Use forkJoin to load all data in parallel
    const todayCall = this.api.getTodayAppointments();
    const futureCall = this.api.getFutureAppointments();
    const emptyCall = this.api.getTodayEmptySlots();
    const conductedCall = this.api.getByConductStatus();

    Promise.all([
      todayCall.toPromise(),
      futureCall.toPromise(),
      emptyCall.toPromise(),
      conductedCall.toPromise(),
    ])
      .then(([todayRes, futureRes, emptyRes, conductedRes]) => {
        // Store today's appointments
        this.rawAppointments.today = todayRes?.data || [];
        this.stats.today = this.rawAppointments.today.length;

        // Store future appointments
        this.rawAppointments.future = futureRes?.data || [];
        this.stats.future = this.rawAppointments.future.length;

        // Store empty slots
        if (emptyRes) {
          this.rawAppointments.empty = (emptyRes?.empty_slots || []).map(
            (slot: any) => ({
              ...slot,
              slot_time: slot.slot_range,
            }),
          );
          this.totalEmptySlots = emptyRes?.total_empty_slots || 0;
          this.stats.empty = this.totalEmptySlots;
        }

        // Store conducted appointments
        this.rawAppointments.conducted = conductedRes?.data || [];
        this.stats.conducted = this.rawAppointments.conducted.length;

        // Also store all conducted for collection calculation
        this.allConductedAppointments = this.rawAppointments.conducted;

        // Calculate total collection from ALL conducted appointments
        const conductedWithPrice = this.allConductedAppointments.filter(
          (appt) => appt.is_appointment_conducted && appt.price,
        );

        this.totalCollectionAmount = conductedWithPrice.reduce((sum, appt) => {
          const price = Number(appt.price) || 0;
          return sum + price;
        }, 0);

        // Set display data for active tab
        this.updateDisplayForActiveTab();

        this.isLoading = false;
        this.isTotalCollectionLoading = false;
      })
      .catch((error) => {
        console.error("❌ Failed to load dashboard data:", error);
        this.isLoading = false;
        this.isTotalCollectionLoading = false;
      });
  }

  // ===============================
  // 🔹 UPDATE DISPLAY DATA BASED ON ACTIVE TAB
  // ===============================
  updateDisplayForActiveTab() {
    switch (this.activeTab) {
      case "today":
        this.displayAppointments = this.rawAppointments.today;
        break;
      case "future":
        this.displayAppointments = this.rawAppointments.future;
        break;
      case "empty":
        this.displayAppointments = this.rawAppointments.empty;
        break;
      case "conducted":
        this.displayAppointments = this.rawAppointments.conducted;
        break;
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
  // 🔹 TAB CHANGE - Now just updates display without API calls
  // ===============================
  setActiveTab(tab: TabType) {
    if (this.isLoading) return;
    this.activeTab = tab;
    this.updateDisplayForActiveTab();
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

  // ===============================
  // 🔹 OPEN PRICE MODAL
  // ===============================
  openPriceModal(appointment: any) {
    this.priceModal = {
      show: true,
      appointment: appointment,
      price: appointment.price || 0,
      newStatus: !appointment.is_appointment_conducted,
    };
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

          // Update raw data based on where this appointment belongs

          // Update in today's appointments
          const todayIndex = this.rawAppointments.today.findIndex(
            (a) => a.appointment_code === appt.appointment_code,
          );
          if (todayIndex !== -1) {
            this.rawAppointments.today[todayIndex] = appt;
          }

          // Update in future appointments
          const futureIndex = this.rawAppointments.future.findIndex(
            (a) => a.appointment_code === appt.appointment_code,
          );
          if (futureIndex !== -1) {
            this.rawAppointments.future[futureIndex] = appt;
          }

          // Update in conducted appointments
          const conductedIndex = this.rawAppointments.conducted.findIndex(
            (a) => a.appointment_code === appt.appointment_code,
          );

          if (newStatus) {
            // If marking as conducted, add to conducted list if not already there
            if (conductedIndex === -1) {
              this.rawAppointments.conducted.push(appt);
            } else {
              this.rawAppointments.conducted[conductedIndex] = appt;
            }
          } else {
            // If un-conducting, remove from conducted list
            if (conductedIndex !== -1) {
              this.rawAppointments.conducted.splice(conductedIndex, 1);
            }
          }

          // Update stats
          this.stats.conducted = this.rawAppointments.conducted.length;

          // Update allConductedAppointments and total collection
          const allIndex = this.allConductedAppointments.findIndex(
            (a) => a.appointment_code === appt.appointment_code,
          );

          if (newStatus) {
            if (allIndex === -1) {
              this.allConductedAppointments.push(appt);
              this.totalCollectionAmount += price;
            } else {
              const oldPrice =
                this.allConductedAppointments[allIndex].price || 0;
              this.totalCollectionAmount =
                this.totalCollectionAmount - oldPrice + price;
              this.allConductedAppointments[allIndex] = appt;
            }
          } else {
            if (allIndex !== -1) {
              this.totalCollectionAmount -=
                this.allConductedAppointments[allIndex].price || 0;
              this.allConductedAppointments.splice(allIndex, 1);
            }
          }

          // Update display for current tab
          this.updateDisplayForActiveTab();

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
  // 🔹 FORMAT CURRENCY - FIXED VERSION
  // ===============================
  formatCurrency(amount: number | undefined | null): string {
    if (amount === undefined || amount === null) {
      return "₹0";
    }

    if (isNaN(amount)) {
      console.warn("formatCurrency received NaN:", amount);
      return "₹0";
    }

    const numAmount = Number(amount);

    if (isNaN(numAmount) || numAmount === 0) {
      return "₹0";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
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
  // 🔹 PAYMENT CALCULATIONS - ALL TIME
  // ===============================

  getTotalCollection(): string {
    if (this.isTotalCollectionLoading) {
      return "Loading...";
    }
    return this.formatCurrency(this.totalCollectionAmount);
  }

  getConductedCount(): number {
    return this.allConductedAppointments.length;
  }

  getAverageFee(): string {
    const conductedWithPrice = this.allConductedAppointments.filter(
      (appt) => appt.is_appointment_conducted && appt.price,
    );

    if (conductedWithPrice.length === 0) return "₹0";

    const total = conductedWithPrice.reduce((sum, appt) => {
      const price = Number(appt.price) || 0;
      return sum + price;
    }, 0);
    const avg = Math.round(total / conductedWithPrice.length);
    return this.formatCurrency(avg);
  }

  getTodayCollection(): string {
    const today = new Date().toDateString();
    const total = this.rawAppointments.today
      .filter((appt) => {
        if (!appt.is_appointment_conducted || !appt.price) return false;
        const apptDate = new Date(
          appt.updated_at || appt.created_at,
        ).toDateString();
        return apptDate === today;
      })
      .reduce((sum, appt) => {
        const price = Number(appt.price) || 0;
        return sum + price;
      }, 0);
    return this.formatCurrency(total);
  }

  getPendingCollection(): string {
    const pendingCount = this.rawAppointments.conducted.filter(
      (appt) => !appt.is_appointment_conducted,
    ).length;
    const avgFee = this.getAverageFeeNumber();
    const total = pendingCount * avgFee;
    return this.formatCurrency(total);
  }

  getAverageFeeNumber(): number {
    const conductedWithPrice = this.allConductedAppointments.filter(
      (appt) => appt.is_appointment_conducted && appt.price,
    );

    if (conductedWithPrice.length === 0) return 1500;

    const total = conductedWithPrice.reduce((sum, appt) => {
      const price = Number(appt.price) || 0;
      return sum + price;
    }, 0);
    return Math.round(total / conductedWithPrice.length);
  }

  // ===============================
  // 🔹 REFRESH DATA (Manual refresh)
  // ===============================
  refreshData() {
    this.loadAllData();
  }

  // ===============================
  // 🔹 STORE INIT
  // ===============================
  initStore() {
    this.storeData.select((d) => d.index).subscribe((d) => (this.store = d));
  }
}
