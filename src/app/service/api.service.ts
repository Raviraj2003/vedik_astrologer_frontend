import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://192.168.1.14:5000/api";

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

  getStudentClasses(batchCode: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/getStudentClasses/${batchCode}`,
      {}, // empty body
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 🧑‍💼 ADMIN → UPDATE CLASS TOPIC (DATE-WISE)
  // ======================================

  updateClassTopicByDate(data: { class_date: string; topic: string }) {
    return this.http.post(`${this.baseUrl}/updateClassTopicByDate`, data, {
      headers: this.getJsonHeaders(),
    });
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

  getTopicList(): Observable<{
    success: boolean;
    data: {
      id: number;
      topic_name: string;
    }[];
  }> {
    return this.http.get<{
      success: boolean;
      data: {
        id: number;
        topic_name: string;
      }[];
    }>(`${this.baseUrl}/media/getTopicList`, {
      headers: this.getJsonHeaders(), // 🔐 Bearer token
    });
  }

  addTopic(data: {
    topic_name: string;
    topic_description?: string;
    created_by?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/media/addTopic`, data, {
      headers: this.getJsonHeaders(), // 🔐 Authorization
    });
  }

  // ======================================
  // 📚 TOPIC MEDIA
  // ======================================

  uploadTopicMedia(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/media/uploadTopicMedia`, formData, {
      headers: this.getAuthHeaders(), // ❗ no Content-Type
    });
  }

  getAllMedia(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/getAllMedia`,
      {},
      { headers: this.getJsonHeaders() },
    );
  }

  assignTopicAndMediaToSlot(data: {
    batch_code: string;
    slot_ids: number[];
    topic_id: number;
    media_ids: number[];
  }) {
    return this.http.post(
      `${this.baseUrl}/media/assignTopicAndMediaToSlot`,
      data,
      { headers: this.getJsonHeaders() },
    );
  }

  getTopicMedia(topicId: number) {
    return this.http.post(
      `${this.baseUrl}/media/getTopicMedia`,
      { topic_id: topicId },
      { headers: this.getJsonHeaders() },
    );
  }

  getClassStudyMaterials(slotId: number) {
    return this.http.post(
      `${this.baseUrl}/media/getClassStudyMaterials/${slotId}`,
      {},
      { headers: this.getJsonHeaders() },
    );
  }

  // 🔹 Upgrade ONE student to another batch (KEEP OLD BATCH)
  upgradeStudentBatch(data: {
    stu_ref_code: string;
    batch_code: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/batches/upgradeStudentBatch`,
      data,
      { headers: this.getJsonHeaders() }, // 🔐 Bearer token auto-added
    );
  }

  // ======================================
  // 🎓 STUDENT → CLASSES (ALL BATCHES FROM TOKEN)
  // ======================================
  getStudentClassesFromToken(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/getStudentClassesFromToken`,
      {}, // ❌ no body
      { headers: this.getJsonHeaders() }, // 🔐 Bearer token
    );
  }

  // ======================================
  // 📚 STUDENT → STUDY MATERIALS (ALL BATCHES FROM TOKEN)
  // ======================================
  getStudentStudyMaterialsFromToken(payload: { slot_id: number }) {
    return this.http.post(
      `${this.baseUrl}/media/getStudentStudyMaterialsFromToken`,
      payload,
      { headers: this.getAuthHeaders() },
    );
  }

  // ======================================
  // 🎓 CERTIFICATE (ADMIN)
  // ======================================

  uploadStudentCertificate(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/uploadStudentCertificate`,
      formData,
      {
        headers: this.getAuthHeaders(), // ❗ NO Content-Type
      },
    );
  }

  publishStudentCertificate(certificateId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/publishStudentCertificate`,
      { certificate_id: certificateId },
      {
        headers: this.getJsonHeaders(),
      },
    );
  }

  // ======================================
  // 🎓 CERTIFICATE (STUDENT)
  // ======================================

  getMyCertificates(): Observable<{
    success: boolean;
    total: number;
    data: {
      certificate_id: string;
      certificate_no: string;
      course_name: string;
      issue_date: string;
      file_path: string;
    }[];
  }> {
    return this.http.post<{
      success: boolean;
      total: number;
      data: any[];
    }>(
      `${this.baseUrl}/media/getMyCertificates`,
      {},
      {
        headers: this.getJsonHeaders(),
      },
    );
  }

  // ======================================
  // 👨‍💼 ADMIN → UPLOAD PAYMENT RECEIPT
  // ======================================
  uploadPaymentReceipt(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/uploadPaymentReceipt`,
      formData,
      { headers: this.getAuthHeaders() }, // ❗ NO Content-Type
    );
  }

  // ======================================
  // 👨‍💼 ADMIN → PUBLISH PAYMENT RECEIPT
  // ======================================
  publishPaymentReceipt(receiptId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/media/publishPaymentReceipt`,
      { receipt_id: receiptId },
      { headers: this.getJsonHeaders() },
    );
  }

  // ======================================
  // 💳 STUDENT → MY PAYMENT RECEIPTS
  // ======================================
  getMyReceipts(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/media/getMyReceipts`,
      { headers: this.getJsonHeaders() }, // Bearer token
    );
  }

  updateClassLinkBySlotId(data: {
    slot_id: number;
    class_link: string;
    updated_by: string;
  }): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/updateClassLinkBySlotId`,
      data,
      { headers: this.getJsonHeaders() }, // 🔐 Bearer token auto-added
    );
  }

  markAttendanceOnJoin(data: { slot_id: number }) {
    return this.http.post(`${this.baseUrl}/markAttendanceOnJoin`, data, {
      headers: this.getJsonHeaders(),
    });
  }

  getMyAttendanceFromToken(): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/getMyAttendanceFromToken`,
      {}, // ❌ no body
      { headers: this.getJsonHeaders() }, // 🔐 Bearer token
    );
  }

  getAttendanceByBatch(batchCode: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/getAttendanceByBatch`,
      { batch_code: batchCode },
      { headers: this.getJsonHeaders() }, // 🔐 Authorization + JSON
    );
  }

  // ======================================
  // 📘 STANDARD MASTER
  // ======================================

  getStandards(): Observable<{
    success: boolean;
    message: string;
    data: {
      standard_id: number;
      standard_name: string;
      standard_description: string;
    }[];
  }> {
    return this.http.post<{
      success: boolean;
      message: string;
      data: {
        standard_id: number;
        standard_name: string;
        standard_description: string;
      }[];
    }>(
      `${this.baseUrl}/getStandards`,
      {}, // ✅ POST body is EMPTY as per Postman
      {
        headers: this.getJsonHeaders(), // 🔐 Bearer token auto-added
      },
    );
  }

  // ======================================
  // 📦 BATCH → FILTER BY STANDARD
  // ======================================

  getBatchesByStandard(standardId: number): Observable<{
    success: boolean;
    total: number;
    data: {
      batch_code: string;
      batch_name: string;
      standard_id: number;
      standard_name: string;
      is_active: string;
      created_at: string;
    }[];
  }> {
    return this.http.post<{
      success: boolean;
      total: number;
      data: {
        batch_code: string;
        batch_name: string;
        standard_id: number;
        standard_name: string;
        is_active: string;
        created_at: string;
      }[];
    }>(
      `${this.baseUrl}/batches/getBatchesByStandard`,
      {
        standard_id: standardId, // ✅ matches Postman body
      },
      {
        headers: this.getJsonHeaders(), // 🔐 Bearer token auto-added
      },
    );
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
