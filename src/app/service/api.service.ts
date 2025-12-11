// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://192.168.1.12:5000/api';

  constructor(private http: HttpClient) {}

  // 🔒 Attach token for secure endpoints
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // 🟢 LOGIN
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // 🟢 REGISTER
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  // ⭐ CREATE STUDENT
  createStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/createstudent`, data, {
      headers: this.getHeaders(),
    });
  }

  // 🟣 UPDATE STUDENT
  updateStudentDetails(data: any): Observable<any> {
    const url = `${this.baseUrl}/student/updatestudentdetails`;
    const headers = this.getHeaders();
    console.log('api token used:', headers.get('Authorization'));
    return this.http.post(url, data, { headers });
  }

  // 🟩 SAVE SCHEDULES (your new one)
  // 🟩 SAVE SCHEDULES
saveSchedules(data: any): Observable<any> {
  const url = `${this.baseUrl}/slots/schedule/save`;
  const headers = this.getHeaders();
  console.log('📤 Sending to:', url);
  console.log('📦 Payload:', data);
  console.log('🔐 Token:', headers.get('Authorization'));
  return this.http.post(url, data, { headers });
}


  // 🟨 GET SCHEDULES (optional for viewing existing)
  getSchedules(): Observable<any> {
    const url = `${this.baseUrl}/slots/schedule/list`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // ✅ Helpers
  saveToken(token: string) {
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
