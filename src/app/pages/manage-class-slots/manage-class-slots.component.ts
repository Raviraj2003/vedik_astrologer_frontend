import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../service/api.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage-class-slots",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./manage-class-slots.component.html",
  styleUrls: ["./manage-class-slots.component.css"],
})
export class ManageClassSlotsComponent implements OnInit {
  // Dropdown data
  standardsList: any[] = [];
  batchList: any[] = [];

  // Selected values
  selectedStandardId: number | "" = "";
  selectedBatchCode: string = "";

  // Class slots data
  classSlots: any[] = [];
  filteredSlots: any[] = [];

  // UI states
  loading = false;
  slotsLoading = false;
  deleteLoading = false;
  searchText: string = "";
  selectedDate: string = "";
  showValidationErrors: boolean = false;

  // For editing
  editingSlot: any = null;
  editFormData: any = {
    schedule_id: "",
    day_name: "",
    start_time: "",
    end_time: "",
    slot_interval: 30,
    from_date: "",
    to_date: "",
  };

  // Status options
  statusOptions = [
    { value: "scheduled", label: "Scheduled", color: "blue" },
    { value: "ongoing", label: "Ongoing", color: "yellow" },
    { value: "completed", label: "Completed", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "red" },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
  }

  /* ================= LOAD STANDARDS ================= */
  loadStandards(): void {
    this.apiService.getStandards().subscribe({
      next: (res: any) => {
        this.standardsList = Array.isArray(res?.data) ? res.data : [];
      },
      error: (err) => {
        console.error("Error loading standards:", err);
        this.standardsList = [];
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to load standards",
        });
      },
    });
  }

  /* ================= ON STANDARD CHANGE ================= */
  onStandardChange(): void {
    // Reset batch and slots
    this.selectedBatchCode = "";
    this.batchList = [];
    this.classSlots = [];
    this.filteredSlots = [];

    if (!this.selectedStandardId) return;

    this.loading = true;
    const standardId = Number(this.selectedStandardId);

    this.apiService.getBatchesByStandard(standardId).subscribe({
      next: (res: any) => {
        this.batchList = Array.isArray(res?.data) ? res.data : [];
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading batches:", err);
        this.batchList = [];
        this.loading = false;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to load batches",
        });
      },
    });
  }

  /* ================= ON BATCH CHANGE ================= */
  onBatchChange(): void {
    if (!this.selectedBatchCode) {
      this.classSlots = [];
      this.filteredSlots = [];
      return;
    }

    this.loadClassSlots();
  }

  /* ================= LOAD CLASS SLOTS ================= */
  loadClassSlots(): void {
    this.slotsLoading = true;
    this.classSlots = [];
    this.filteredSlots = [];

    this.apiService.getStudentClasses(this.selectedBatchCode).subscribe({
      next: (res: any) => {
        // Process the response to add parsed time fields
        if (res?.success && res?.data) {
          this.classSlots = Array.isArray(res.data)
            ? this.processSlotsData(res.data)
            : [];
        } else if (Array.isArray(res)) {
          this.classSlots = this.processSlotsData(res);
        } else if (res?.data && Array.isArray(res.data)) {
          this.classSlots = this.processSlotsData(res.data);
        }

        this.applyFilters();
        this.slotsLoading = false;
      },
      error: (err) => {
        console.error("Error loading class slots:", err);
        this.classSlots = [];
        this.filteredSlots = [];
        this.slotsLoading = false;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err?.error?.message || "Failed to load class slots",
        });
      },
    });
  }

  /* ================= PROCESS SLOTS DATA TO ADD PARSED TIME FIELDS ================= */
  processSlotsData(slots: any[]): any[] {
    return slots.map((slot: any) => {
      if (slot.slot_time && !slot.start_time) {
        const times = this.parseSlotTime(slot.slot_time);
        return {
          ...slot,
          start_time: times.start,
          end_time: times.end,
        };
      }
      return slot;
    });
  }

  /* ================= APPLY FILTERS ================= */
  applyFilters(): void {
    let filtered = [...this.classSlots];

    // Filter by date if selected
    if (this.selectedDate) {
      filtered = filtered.filter((slot) => {
        const slotDate =
          slot.class_date?.substring(0, 10) || slot.date?.substring(0, 10);
        return slotDate === this.selectedDate;
      });
    }

    // Filter by search text
    if (this.searchText.trim()) {
      const term = this.searchText.toLowerCase().trim();
      filtered = filtered.filter(
        (slot) =>
          slot.topic_name?.toLowerCase().includes(term) ||
          slot.class_name?.toLowerCase().includes(term) ||
          slot.day_name?.toLowerCase().includes(term) ||
          slot.slot_time?.toLowerCase().includes(term),
      );
    }

    this.filteredSlots = filtered;
  }

  /* ================= CLEAR FILTERS ================= */
  clearFilters(): void {
    this.searchText = "";
    this.selectedDate = "";
    this.applyFilters();
  }

  /* ================= EDIT SLOT ================= */
  editSlot(slot: any): void {
    this.editingSlot = slot;
    this.prepareEditFormData(slot);
  }

  /* ================= PARSE SLOT TIME ================= */
  parseSlotTime(slotTime: string): { start: string; end: string } {
    if (slotTime) {
      const times = slotTime.split(" - ");
      return {
        start: times[0] || "",
        end: times[1] || "",
      };
    }
    return { start: "", end: "" };
  }

  /* ================= FORMAT TIME FOR INPUT (24-hour format) ================= */
  formatTimeForInput(timeStr: string): string {
    if (!timeStr) return "";

    // Convert "03:15 PM" to "15:15" format for input[type=time]
    try {
      // Check if it's already in 24-hour format
      if (timeStr.match(/^\d{2}:\d{2}$/)) {
        return timeStr;
      }

      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");

      if (modifier === "PM" && hours !== "12") {
        hours = String(parseInt(hours, 10) + 12);
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }

      return `${hours.padStart(2, "0")}:${minutes}`;
    } catch (e) {
      return timeStr;
    }
  }

  /* ================= FORMAT TIME FOR DISPLAY (12-hour format) ================= */
  formatTimeForDisplay(timeStr: string): string {
    if (!timeStr) return "";

    // If it's already in 12-hour format (contains AM/PM), return as is
    if (timeStr.includes("AM") || timeStr.includes("PM")) {
      return timeStr;
    }

    // Convert "15:15" to "03:15 PM"
    try {
      const [hours, minutes] = timeStr.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12.toString().padStart(2, "0")}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
    }
  }

  /* ================= UPDATE EDIT FORM DATA FOR SLOT ================= */
  prepareEditFormData(slot: any): void {
    const times = slot.slot_time
      ? this.parseSlotTime(slot.slot_time)
      : { start: slot.start_time || "", end: slot.end_time || "" };

    this.editFormData = {
      schedule_id: slot.schedule_id || slot.id,
      day_name: slot.day_name || "",
      start_time: this.formatTimeForInput(times.start),
      end_time: this.formatTimeForInput(times.end),
      slot_interval: slot.slot_interval || 30,
      from_date: slot.from_date || slot.class_date || "",
      to_date: slot.to_date || slot.class_date || "",
    };
  }

  /* ================= CANCEL EDIT ================= */
  cancelEdit(): void {
    this.editingSlot = null;
    this.editFormData = {
      schedule_id: "",
      day_name: "",
      start_time: "",
      end_time: "",
      slot_interval: 30,
      from_date: "",
      to_date: "",
    };
    this.showValidationErrors = false; // Reset validation flag
  }

  /* ================= SAVE SLOT CHANGES ================= */
  saveSlotChanges(): void {
    // Set validation flag to true to show red borders
    this.showValidationErrors = true;

    // Validate required fields
    if (
      !this.editFormData.day_name ||
      !this.editFormData.start_time ||
      !this.editFormData.end_time
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill all required fields (Day, Start Time, End Time)",
      });
      return;
    }

    // Validate time range
    if (this.editFormData.end_time <= this.editFormData.start_time) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "End time must be greater than start time",
      });
      return;
    }

    // Validate dates
    if (this.editFormData.from_date && this.editFormData.to_date) {
      const fromDate = new Date(this.editFormData.from_date);
      const toDate = new Date(this.editFormData.to_date);

      if (toDate < fromDate) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          text: "End date cannot be before start date",
        });
        return;
      }
    }

    // Reset validation flag if validation passes
    this.showValidationErrors = false;

    Swal.fire({
      title: "Update Schedule?",
      text: "Are you sure you want to update this class schedule?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateSchedule();
      }
    });
  }

  /* ================= UPDATE SCHEDULE USING API ================= */
  updateSchedule(): void {
    // Show loading
    Swal.fire({
      title: "Updating...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Prepare data for API - WITHOUT TOPIC FIELD
    const updateData = {
      schedule_id: this.editFormData.schedule_id,
      day_name: this.editFormData.day_name,
      start_time: this.editFormData.start_time,
      end_time: this.editFormData.end_time,
      slot_interval: this.editFormData.slot_interval,
      from_date: this.editFormData.from_date,
      to_date: this.editFormData.to_date,
      // topic field completely removed
    };

    // Call the API
    this.apiService.updateClassSchedule(updateData).subscribe({
      next: (response: any) => {
        Swal.close();

        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: response.message || "Class schedule updated successfully",
            timer: 2000,
            showConfirmButton: false,
          });

          this.cancelEdit();
          this.loadClassSlots(); // Reload slots to show updated data
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: response.message || "Failed to update schedule",
          });
        }
      },
      error: (err) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err?.error?.message || "Failed to update class schedule",
        });
      },
    });
  }

  /* ================= DELETE SLOT ================= */
  deleteSlot(slot: any): void {
    const slotId = slot.slot_id || slot.id;
    const slotIdentifier =
      slot.slot_time ||
      `${slot.start_time} - ${slot.end_time}` ||
      `Slot #${slotId}`;

    Swal.fire({
      title: "Delete Class Slot?",
      html: `
        <div class="text-left">
          <p class="mb-2">Are you sure you want to delete this class slot?</p>
          <p class="text-sm text-gray-600"><strong>Day:</strong> ${slot.day_name || "N/A"}</p>
          <p class="text-sm text-gray-600"><strong>Date:</strong> ${this.formatDate(slot.class_date || slot.date)}</p>
          <p class="text-sm text-gray-600"><strong>Time:</strong> ${slot.slot_time || slot.start_time + " - " + slot.end_time}</p>
          <p class="text-sm text-gray-600"><strong>Topic:</strong> ${slot.topic_name || "N/A"}</p>
          <p class="text-xs text-red-500 mt-3">This action cannot be undone!</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          this.apiService.deleteClassSlot(slotId).subscribe({
            next: (response: any) => {
              if (response.success) {
                resolve(response);
              } else {
                Swal.showValidationMessage(
                  response.message || "Failed to delete slot",
                );
                resolve(null);
              }
            },
            error: (err) => {
              Swal.showValidationMessage(
                err?.error?.message || "Failed to delete class slot",
              );
              resolve(null);
            },
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text:
            result.value.message || "Class slot has been deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Remove the deleted slot from the local arrays
        this.classSlots = this.classSlots.filter(
          (s) => (s.slot_id || s.id) !== slotId,
        );
        this.applyFilters(); // Re-apply filters to update filteredSlots
      }
    });
  }

  /* ================= GET STATUS COLOR CLASS ================= */
  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  }

  /* ================= GET STATUS DOT COLOR ================= */
  getStatusDotColor(status: string): string {
    switch (status?.toLowerCase()) {
      case "scheduled":
        return "bg-blue-500";
      case "ongoing":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  }

  /* ================= FORMAT DATE ================= */
  formatDate(dateString: string): string {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  /* ================= REFRESH SLOTS ================= */
  refreshSlots(): void {
    if (this.selectedBatchCode) {
      this.loadClassSlots();
    }
  }

  /* ================= GET UNIQUE DATES FOR FILTER ================= */
  get uniqueDates(): string[] {
    const dates = this.classSlots
      .map(
        (slot) =>
          slot.class_date?.substring(0, 10) || slot.date?.substring(0, 10),
      )
      .filter((date) => date);
    return [...new Set(dates)].sort().reverse();
  }

  /* ================= RESET SELECTION ================= */
  resetSelection(): void {
    this.selectedStandardId = "";
    this.selectedBatchCode = "";
    this.batchList = [];
    this.classSlots = [];
    this.filteredSlots = [];
    this.clearFilters();
    this.cancelEdit();
  }
}
