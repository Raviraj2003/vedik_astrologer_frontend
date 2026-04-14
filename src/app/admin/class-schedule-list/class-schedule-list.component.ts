import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-class-schedule-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-schedule-list.component.html',
  styleUrl: './class-schedule-list.component.css'
})
export class ClassScheduleListComponent implements OnInit {
  // Standards
  standards: any[] = [];
  selectedStandardId: number | null = null;
  standardsLoading = false;
  standardsError = '';

  // Batches
  batches: any[] = [];
  selectedBatchCode: string | null = null;
  batchesLoading = false;
  batchesError = '';

  // Schedules
  schedules: any[] = [];
  filteredSchedules: any[] = [];
  schedulesLoading = false;
  schedulesError = '';

  // Search
  searchTerm: string = '';

  // Delete tracking
  deleteInProgress: number | null = null;
  showDeleteModal = false;
  deleteCandidate: any = null;

  // Alert modal
  showAlertModal = false;
  alertTitle = '';
  alertMessage = '';
  alertType: 'success' | 'error' = 'success';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStandards();
  }

  // ======================================
  // FETCH STANDARDS
  // ======================================
  fetchStandards(): void {
    this.standardsLoading = true;
    this.standardsError = '';

    this.apiService.getStandards().subscribe({
      next: (response) => {
        if (response.success) {
          this.standards = response.data;
        } else {
          this.standardsError = response.message || 'Failed to fetch standards';
        }
        this.standardsLoading = false;
      },
      error: (error) => {
        this.standardsError = this.getErrorMessage(error);
        this.standardsLoading = false;
      }
    });
  }

  // ======================================
  // FETCH BATCHES BY STANDARD
  // ======================================
  onStandardChange(): void {
    if (!this.selectedStandardId) {
      this.batches = [];
      this.selectedBatchCode = null;
      this.schedules = [];
      this.filteredSchedules = [];
      this.searchTerm = '';
      return;
    }

    this.fetchBatchesByStandard(this.selectedStandardId);
  }

  fetchBatchesByStandard(standardId: number): void {
    this.batchesLoading = true;
    this.batchesError = '';
    this.selectedBatchCode = null;
    this.schedules = [];
    this.filteredSchedules = [];
    this.searchTerm = '';

    this.apiService.getBatchesByStandard(standardId).subscribe({
      next: (response) => {
        if (response.success) {
          this.batches = response.data;
        } else {
          this.batchesError = 'Failed to fetch batches';
        }
        this.batchesLoading = false;
      },
      error: (error) => {
        this.batchesError = this.getErrorMessage(error);
        this.batchesLoading = false;
      }
    });
  }

  // ======================================
  // FETCH SCHEDULES BY BATCH
  // ======================================
  onBatchChange(): void {
    if (!this.selectedBatchCode) {
      this.schedules = [];
      this.filteredSchedules = [];
      this.searchTerm = '';
      return;
    }

    this.fetchSchedulesByBatch(this.selectedBatchCode);
  }

  fetchSchedulesByBatch(batchCode: string): void {
    this.schedulesLoading = true;
    this.schedulesError = '';
    this.searchTerm = '';

    this.apiService.getAdminClassSchedule().subscribe({
      next: (response) => {
        if (response.success) {
          this.schedules = response.data
            .filter((schedule: any) => schedule.batch_code === batchCode)
            .map((schedule: any) => {
              const batch = this.batches.find(b => b.batch_code === schedule.batch_code);
              return {
                ...schedule,
                batch_name: batch ? batch.batch_name : schedule.batch_name || 'Unnamed Batch'
              };
            });
          this.filteredSchedules = [...this.schedules];
        } else {
          this.schedulesError = 'Failed to fetch schedules';
        }
        this.schedulesLoading = false;
      },
      error: (error) => {
        this.schedulesError = this.getErrorMessage(error);
        this.schedulesLoading = false;
      }
    });
  }

  // ======================================
  // DELETE MODAL HANDLERS
  // ======================================
  openDeleteModal(schedule: any): void {
    if (!schedule.id) {
      this.showAlert('Error', 'Schedule ID not found. Cannot delete.', 'error');
      return;
    }
    
    this.deleteCandidate = schedule;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteCandidate = null;
  }

  confirmDelete(): void {
    if (!this.deleteCandidate) return;
    
    const scheduleId = this.deleteCandidate.id;
    
    if (!scheduleId) {
      this.showAlert('Error', 'Schedule ID not found', 'error');
      this.closeDeleteModal();
      return;
    }
    
    this.deleteInProgress = scheduleId;

    this.apiService.deleteClassScheduleWithSlots(scheduleId).subscribe({
      next: (response) => {
        if (response.success) {
          this.schedules = this.schedules.filter(s => s.id !== scheduleId);
          this.filterSchedules();
          this.showAlert('Success', 'Schedule deleted successfully!', 'success');
        } else {
          this.showAlert('Error', response.message || 'Failed to delete schedule', 'error');
        }
        this.deleteInProgress = null;
        this.closeDeleteModal();
      },
      error: (error) => {
        this.showAlert('Error', this.getErrorMessage(error), 'error');
        this.deleteInProgress = null;
        this.closeDeleteModal();
      }
    });
  }

  // ======================================
  // ALERT MODAL
  // ======================================
  showAlert(title: string, message: string, type: 'success' | 'error'): void {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertModal = true;
  }

  closeAlertModal(): void {
    this.showAlertModal = false;
  }

  // ======================================
  // FILTER SCHEDULES BY SEARCH TERM
  // ======================================
  filterSchedules(): void {
    if (!this.searchTerm.trim()) {
      this.filteredSchedules = [...this.schedules];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredSchedules = this.schedules.filter((schedule) => {
      return (
        schedule.batch_name?.toLowerCase().includes(term) ||
        schedule.batch_code?.toLowerCase().includes(term) ||
        schedule.class_name?.toLowerCase().includes(term) ||
        schedule.topic?.toLowerCase().includes(term) ||
        schedule.day_name?.toLowerCase().includes(term)
      );
    });
  }

  // ======================================
  // UTILITY FUNCTIONS
  // ======================================
  getBatchPlaceholder(): string {
    if (!this.selectedStandardId) {
      return 'Select standard first';
    }
    if (this.batchesLoading) {
      return 'Loading batches...';
    }
    if (!this.batchesLoading && this.batches.length === 0) {
      return 'No batches available for this standard';
    }
    return '-- Select Batch --';
  }

  getTotalBatches(): number {
    return this.batches?.length || 0;
  }

  getUniqueBatchesCount(): number {
    if (!this.schedules.length) return 0;
    const uniqueBatches = new Set(this.schedules.map(s => s.batch_code));
    return uniqueBatches.size;
  }

  getUniqueDaysCount(): number {
    if (!this.schedules.length) return 0;
    const uniqueDays = new Set(this.schedules.map(s => s.day_name));
    return uniqueDays.size;
  }

  getBatchInitials(batchName: string, batchCode: string): string {
    const name = batchName || batchCode || 'B';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getBatchName(batchCode: string): string {
    const batch = this.batches.find(b => b.batch_code === batchCode);
    return batch ? batch.batch_name : 'Unknown Batch';
  }

  formatTime(timeString: string): string {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  // ======================================
  // ACTION FUNCTIONS
  // ======================================
  clearSearch(): void {
    this.searchTerm = '';
    this.filterSchedules();
  }

  resetSelection(): void {
    this.selectedStandardId = null;
    this.selectedBatchCode = null;
    this.batches = [];
    this.schedules = [];
    this.filteredSchedules = [];
    this.searchTerm = '';
  }

  exportScheduleList(): void {
    if (this.filteredSchedules.length === 0) return;

    const headers = [
      'Batch Code',
      'Batch Name',
      'Class Name',
      'Topic',
      'Day',
      'Start Time',
      'End Time',
      'From Date',
      'To Date'
    ];
    
    const csvData = this.filteredSchedules.map((schedule) => [
      schedule.batch_code,
      schedule.batch_name || 'N/A',
      schedule.class_name,
      schedule.topic || 'N/A',
      schedule.day_name,
      this.formatTime(schedule.start_time),
      this.formatTime(schedule.end_time),
      this.formatDate(schedule.from_date),
      this.formatDate(schedule.to_date)
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `class_schedule_${this.getBatchName(this.selectedBatchCode || '')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // ======================================
  // ERROR HANDLING
  // ======================================
  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Cannot connect to server. Please check your internet connection.';
    } else if (error.status === 401) {
      return 'Unauthorized. Please login again.';
    } else if (error.status === 404) {
      return 'API endpoint not found. Please check the URL.';
    } else if (error.status === 500) {
      return 'Server error. Please try again later.';
    } else {
      return error.error?.message || 'An unexpected error occurred.';
    }
  }
}