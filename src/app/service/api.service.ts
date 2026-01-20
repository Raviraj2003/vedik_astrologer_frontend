import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://192.168.1.8:5000/api";

  constructor(private http: HttpClient) {}

  // ======================================
  // 🔒 HEADERS
  // ======================================

  // For JSON-based APIs
  private getJsonHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    });
  }

  // For FILE UPLOAD APIs (IMPORTANT)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : "",
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

  addstudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/addstudent`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  updateStudentDetails(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/updatestudentdetails`,
      data,
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 📅 SLOTS & SCHEDULES
  // ======================================

  saveSchedules(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/slots/saveSchedule`, // ✅ MATCH CURL
      data,
      { headers: this.getJsonHeaders() },
    );
  }

  getSchedules(): Observable<any> {
    return this.http.get(`${this.baseUrl}/slots/schedule/list`, {
      headers: this.getJsonHeaders(),
    });
  }

  getSlotsByDate(date: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/slots/getSlotsBySpecificDate`,
      { slot_date: date },
      { headers: this.getJsonHeaders() },
    );
  }

  getSlotInterval(slot_interval: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/slots/getSlotInterval?slot_interval=${slot_interval}`,
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 🧑‍⚕️ APPOINTMENTS
  // ======================================

  addAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments/add`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  getTodayAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments/getTodayAppointments`, {
      headers: this.getJsonHeaders(),
    });
  }

  getFutureAppointments(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/appointments/getFutureAppointments`,
      {},
      { headers: this.getJsonHeaders() },
    );
  }

  getTodayEmptySlots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/slots/getTodayEmptySlots`, {
      headers: this.getJsonHeaders(),
    });
  }

  getByConductStatus(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/appointments/getByConductStatus`,
      { is_active: "Y" },
      { headers: this.getJsonHeaders() },
    );
  }

  updateConductStatus(
    appointment_code: string,
    is_conducted: boolean,
    price: number = 1500,
  ): Observable<any> {
    const payload = {
      appointment_code,
      is_active: "Y",
      price,
      is_appointment_conducted: is_conducted,
    };

    return this.http.post(
      `${this.baseUrl}/appointments/updateConductStatus`,
      payload,
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 📷📄🎥 MEDIA UPLOAD (FIXED)
  // ======================================

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/uplodeimage`,
      formData,
      { headers: this.getAuthHeaders() }, // ✅ NO Content-Type
    );
  }

  uploadPdf(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/media/addpdf`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  uploadVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/media/addvideo`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

  // ======================================
  // 📅 SLOT STATUS MANAGEMENT (FIXED)
  // ======================================

  // 🔹 Get DEACTIVATED slots by date
  getDeactivatedSlotsByDate(date: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/slots/getDeactivatedSlotsByDate`,
      { slot_date: date },
      { headers: this.getJsonHeaders() },
    );
  }

  // 🔹 Activate / Deactivate SINGLE slot
  updateSlotStatus(data: {
    slot_date: string;
    slot_range: string; // ✅ MUST MATCH DB
    is_active: "Y" | "N";
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/slots/updateSlotStatus`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  // 🔹 Deactivate WHOLE DAY
  deactivateSlotsByDate(data: { slot_date: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/slots/deactivateSlotsByDate`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  addServiceBooking(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/services/addServiceBooking`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getServiceBookingsByService(serviceName: string) {
    const body = {
      service_name: serviceName,
    };

    return this.http.post(
      `${this.baseUrl}/services/getServiceBookingsByService`,
      body,
      { headers: this.getAuthHeaders() },
    );
  }

  // ======================================
  // 🧑‍⚕️ APPOINTMENTS
  // ======================================

  getPendingAppointments(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/appointments/getPendingAppointments`,
      {},
      { headers: this.getJsonHeaders() },
    );
  }

  rescheduleAppointment(data: {
    appointment_code: string;
    new_date: string;
    new_slot_range: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments/reschedule`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  saveClassSchedule(data: any) {
    return this.http.post(`${this.baseUrl}/saveClassSchedule`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  createBatch(data: any) {
    return this.http.post(`${this.baseUrl}/batches/createBatch`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  // 🔹 Get students eligible for batch (is_in_batch = Y & batch_code IS NULL)
  getEligibleBatchStudents(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/batches/getEligibleBatchStudents`,
      {},
      { headers: this.getJsonHeaders() },
    );
  }

  getAllStudents(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/getAllStudents`,
      {}, // empty body as per curl
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 👨‍💼 ADMIN → UPDATE STUDENT DETAILS
  // ======================================

  adminUpdateStudentDetails(data: {
    stu_ref_code: string;
    fees?: number;
    certificate_marksheet_code?: string;
    marks_obtained?: number;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/adminUpdateStudentDetails`,
      data,
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 📦 BATCH MASTER
  // ======================================

  getAllBatches(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/batches/getAllBatches`,
      {}, // POST body is empty as per curl
      { headers: this.getJsonHeaders() },
    );
  }

  // 🔹 Assign selected students to batch ✅ ADD THIS
  assignStudentsToBatch(data: {
    batch_code: string;
    student_ref_codes: string[];
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/batches/assignStudentsToBatch`,
      data,
      { headers: this.getJsonHeaders() },
    );
  }

  getBatchMediaList(batchCode: string): Observable<any> {
    const body = {
      batch_code: batchCode,
    };

    return this.http.post(`${this.baseUrl}/media/getBatchMediaList`, body, {
      headers: this.getJsonHeaders(),
    });
  }

  publishMediaToBatch(data: {
    batch_code: string;
    media_ref_code: string;
    media_type: "PDF" | "VIDEO" | "IMAGE";
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/media/publishMediaToBatch`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  getStudentClassSchedule(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/student/getStudentClassSchedule`,
      {}, // ✅ empty body as per curl
      { headers: this.getJsonHeaders() },
    );
  }

  // STUDENT → GET PUBLISHED STUDY MATERIALS
  getStudentStudyMaterials(): Observable<{
    success: boolean;
    batch_code: string;
    total: number;
    data: any[];
  }> {
    return this.http.post<{
      success: boolean;
      batch_code: string;
      total: number;
      data: any[];
    }>(
      `${this.baseUrl}/media/getBatchMediaForStudent`,
      {},
      { headers: this.getJsonHeaders() },
    );
  }

  viewMedia(refCode: string): string {
    // We return the URL directly because this API is used
    // in <a href> or <iframe>, not via HttpClient
    return `${this.baseUrl}/media/view/${refCode}`;
  }

  // ======================================
  // 🧰 HELPERS
  // ======================================

  saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  logout(): void {
    localStorage.removeItem("token");
  }
}
