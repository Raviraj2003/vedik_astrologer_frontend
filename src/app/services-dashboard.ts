import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-services-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services-dashboard.html',
})
export class ServicesDashboardComponent implements OnInit {

  // ================= TAB STATE =================
  activeTab: 'services' | 'muhurta' | 'kundali' | 'preparing' = 'services';

  // ================= API =================
  apiUrl = 'http://192.168.1.8:5000/api/services/getServiceBookingsByService';

  // ================= DATA =================
  selectedService = 'Astrology Consultation';
  servicesList: any[] = [];
  filteredList: any[] = [];

  // ================= UI =================
  isLoading = false;
  customerName = '';
  totalAmount = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadServices();
  }

  // ================= TAB CHANGE =================
  setTab(tab: any) {
    this.activeTab = tab;

    switch (tab) {
      case 'services':
        this.selectedService = 'Astrology Consultation';
        break;
      case 'muhurta':
        this.selectedService = 'Muhurta';
        break;
      case 'kundali':
        this.selectedService = 'Kundali Matching';
        break;
      case 'preparing':
        this.selectedService = 'Preparing Kundali';
        break;
    }

    this.customerName = '';
    this.loadServices();
  }

  // ================= LOAD DATA =================
  loadServices() {
    this.isLoading = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const body = {
      service_name: this.selectedService,
    };

    this.http.post<any>(this.apiUrl, body, { headers }).subscribe({
      next: (res) => {
        this.servicesList = res.data || [];
        this.filteredList = this.servicesList;
        this.calculateTotal();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  // ================= SEARCH =================
  filterByCustomer() {
    const value = this.customerName.toLowerCase().trim();

    this.filteredList = this.servicesList.filter(item =>
      item.customer_name?.toLowerCase().includes(value)
    );

    this.calculateTotal();
  }

  // ================= TOTAL =================
  calculateTotal() {
    this.totalAmount = this.filteredList.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  }
}
