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

  // 🟢 LOGIN (no headers)
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  // 🟢 REGISTER (no headers)
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  // ⭐ CREATE STUDENT (secured)
  createStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/student/createstudent`, data, {
      headers: this.getHeaders(),
    });
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
