import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-services.html',
})
export class AddServicesComponent {

  loading = false;

  formData = {
    service: '',
    name: '',
    mobile: '',
    email: '',
    serviceDate: '',
    amount: '',
    transactionId: '',
  };

  constructor(private api: ApiService) {}

  submitForm() {
    if (!this.isValid()) {
      alert('⚠️ Please fill all required fields');
      return;
    }

    const payload = {
      service_name: this.formData.service,
      customer_name: this.formData.name,
      mobile: this.formData.mobile,
      email: this.formData.email,
      service_date: this.formData.serviceDate,
      amount: Number(this.formData.amount),
      transaction_id: this.formData.transactionId,
    };

    this.loading = true;

    this.api.addServiceBooking(payload).subscribe({
      next: (res) => {
        alert('✅ Service booking added successfully');
        console.log('API Response:', res);
        this.resetForm();
        this.loading = false;
      },
      error: (err) => {
        console.error('API Error:', err);
        alert('❌ Failed to add service booking');
        this.loading = false;
      },
    });
  }

  private isValid(): boolean {
  return !!(
    this.formData.service &&
    this.formData.name &&
    this.formData.mobile &&
    this.formData.serviceDate &&
    this.formData.amount
  );
}


  private resetForm() {
    this.formData = {
      service: '',
      name: '',
      mobile: '',
      email: '',
      serviceDate: '',
      amount: '',
      transactionId: '',
    };
  }
}
