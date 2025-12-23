import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://192.168.1.13:5000/api';

  constructor(private http: HttpClient) {}

  // ======================================
  // 🔒 HEADERS
  // ======================================

  // For JSON-based APIs
  private getJsonHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // For FILE UPLOAD APIs (IMPORTANT)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // ======================================
  // 🔐 AUTH
  // ======================================

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  // ======================================
  // 🎓 STUDENT
  // ======================================

  createStudent(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/createstudent`,
      data,
      { headers: this.getJsonHeaders() }
    );
  }

  updateStudentDetails(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/updatestudentdetails`,
      data,
      { headers: this.getJsonHeaders() }
    );
  }

  // ======================================
  // 📅 SLOTS & SCHEDULES
  // ======================================

  saveSchedules(data: any): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/slots/saveSchedule`, // ✅ MATCH CURL
    data,
    { headers: this.getJsonHeaders() }
  );
}


  getSchedules(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/slots/schedule/list`,
      { headers: this.getJsonHeaders() }
    );
  }

   getSlotsByDate(date: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/slots/getSlotsBySpecificDate`,
    { slot_date: date },
    { headers: this.getJsonHeaders() }
  );
}

  getSlotInterval(slot_interval: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/slots/getSlotInterval?slot_interval=${slot_interval}`,
      { headers: this.getJsonHeaders() }
    );
  }

  // ======================================
  // 🧑‍⚕️ APPOINTMENTS
  // ======================================

  addAppointment(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/appointments/add`,
      data,
      { headers: this.getJsonHeaders() }
    );
  }

  getTodayAppointments(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/appointments/getTodayAppointments`,
      { headers: this.getJsonHeaders() }
    );
  }

  getFutureAppointments(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/appointments/getFutureAppointments`,
      {},
      { headers: this.getJsonHeaders() }
    );
  }

  getTodayEmptySlots(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/slots/getTodayEmptySlots`,
      { headers: this.getJsonHeaders() }
    );
  }

  getByConductStatus(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/appointments/getByConductStatus`,
      { is_active: 'Y' },
      { headers: this.getJsonHeaders() }
    );
  }

  updateConductStatus(
    appointment_code: string,
    is_conducted: boolean,
    price: number = 1500
  ): Observable<any> {
    const payload = {
      appointment_code,
      is_active: 'Y',
      price,
      is_appointment_conducted: is_conducted,
    };

    return this.http.post(
      `${this.baseUrl}/appointments/updateConductStatus`,
      payload,
      { headers: this.getJsonHeaders() }
    );
  }

  // ======================================
  // 📷📄🎥 MEDIA UPLOAD (FIXED)
  // ======================================

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/uplodeimage`,
      formData,
      { headers: this.getAuthHeaders() } // ✅ NO Content-Type
    );
  }

  uploadPdf(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/addpdf`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/addvideo`,
      formData,
      { headers: this.getAuthHeaders() }
    );
  }


  // ======================================
// 📅 SLOT STATUS MANAGEMENT (FIXED)
// ======================================

// ======================================
// 📅 SLOT & SCHEDULE MANAGEMENT
// ======================================

// 🔹 Get ACTIVE slots by date


// 🔹 Get DEACTIVATED slots by date
getDeactivatedSlotsByDate(date: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/slots/getDeactivatedSlotsByDate`,
    { slot_date: date },
    { headers: this.getJsonHeaders() }
  );
}

// 🔹 Activate / Deactivate SINGLE slot
updateSlotStatus(data: {
  slot_date: string;
  slot_range: string;   // ✅ MUST MATCH DB
  is_active: 'Y' | 'N';
}): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/slots/updateSlotStatus`,
    data,
    { headers: this.getJsonHeaders() }
  );
}

// 🔹 Deactivate WHOLE DAY
deactivateSlotsByDate(data: {
  slot_date: string;
}): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/slots/deactivateSlotsByDate`,
    data,
    { headers: this.getJsonHeaders() }
  );
}


 addServiceBooking(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/services/addServiceBooking`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }

  getServiceBookingsByService(serviceName: string) {
  const body = {
    service_name: serviceName,
  };

  return this.http.post(
    `${this.baseUrl}/services/getServiceBookingsByService`,
    body,
    { headers: this.getAuthHeaders() }
  );
}


// ======================================
// 🧑‍⚕️ APPOINTMENTS
// ======================================

getPendingAppointments(): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/appointments/getPendingAppointments`,
    {},
    { headers: this.getJsonHeaders() }
  );
}

rescheduleAppointment(data: {
  appointment_code: string;
  new_date: string;
  new_slot_range: string;
}): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/appointments/reschedule`,
    data,
    { headers: this.getJsonHeaders() }
  );
}


saveClassSchedule(data: any) {
  return this.http.post(
    `${this.baseUrl}/saveClassSchedule`,
    data,
    { headers: this.getJsonHeaders() }
  );
}


  // ======================================
  // 🧰 HELPERS
  // ======================================

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
