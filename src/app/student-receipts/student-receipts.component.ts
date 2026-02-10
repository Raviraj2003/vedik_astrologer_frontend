import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-student-receipts",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./student-receipts.component.html",
  styleUrl: "./student-receipts.component.css",
})
export class StudentReceiptsComponent implements OnInit {
  // ===============================
  // STATE
  // ===============================

  receipts: {
    receipt_id: string;
    receipt_no: string;
    amount: number;
    payment_mode: string;
    transaction_id: string;
    created_at: string;
    file_path: string;
  }[] = [];

  loading = false;
  errorMsg = "";

  constructor(private api: ApiService) {}

  // ===============================
  // INIT
  // ===============================

  ngOnInit(): void {
    this.fetchMyReceipts();
  }

  // ===============================
  // FETCH STUDENT RECEIPTS
  // ===============================

  fetchMyReceipts(): void {
    this.loading = true;
    this.errorMsg = "";

    this.api.getMyReceipts().subscribe({
      next: (res) => {
        this.loading = false;

        if (res?.success) {
          this.receipts = res.data || [];
        } else {
          this.errorMsg = "Failed to load payment receipts";
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = "Unable to fetch payment receipts";
      },
    });
  }

  // ===============================
  // VIEW RECEIPT PDF
  // ===============================

  viewReceipt(filePath: string): void {
    if (!filePath) return;
    window.open(filePath, "_blank");
  }
}
