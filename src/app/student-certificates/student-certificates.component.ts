import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-student-certificates",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./student-certificates.component.html",
  styleUrl: "./student-certificates.component.css",
})
export class StudentCertificatesComponent implements OnInit {
  // ===============================
  // STATE
  // ===============================

  certificates: {
    certificate_id: string;
    certificate_no: string;
    course_name: string;
    issue_date: string;
    file_path: string;
  }[] = [];

  loading = false;
  errorMsg = "";

  constructor(private api: ApiService) {}

  // ===============================
  // INIT
  // ===============================

  ngOnInit(): void {
    this.fetchMyCertificates();
  }

  // ===============================
  // FETCH STUDENT CERTIFICATES
  // ===============================

  fetchMyCertificates(): void {
    this.loading = true;
    this.errorMsg = "";

    this.api.getMyCertificates().subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success) {
          this.certificates = res.data || [];
        } else {
          this.errorMsg = "Failed to load certificates";
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = "Unable to fetch certificates";
      },
    });
  }

  // ===============================
  // VIEW / DOWNLOAD CERTIFICATE
  // ===============================

  viewCertificate(filePath: string): void {
    if (!filePath) return;
    window.open(filePath, "_blank");
  }
}
