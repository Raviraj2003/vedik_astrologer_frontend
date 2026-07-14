import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApiService } from "../service/api.service";

interface Receipt {
  receipt_id: string;
  receipt_no: string;
  amount: number;
  payment_mode: string;
  transaction_id: string;
  created_at: string;
  file_path: string;
}

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

  receipts: Receipt[] = [];

  loading = false;
  errorMsg = "";

  // ===============================
  // IN-PAGE PDF VIEWER STATE
  // ===============================
  showReceiptModal = false;
  viewingReceipt: Receipt | null = null;
  viewingReceiptUrl: SafeResourceUrl | null = null;
  isReceiptLoading = false;
  isFullscreen = false;

  // Same backend host used to serve uploaded files - the app runs on
  // localhost:4200 (Angular dev server) so relative paths must be
  // resolved against the API host, not the dev server.
  private readonly baseUrl = "https://vediknode.vedikastrologer.com";

  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) {}

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
  // DERIVED STATS (for summary header)
  // ===============================

  get totalReceipts(): number {
    return this.receipts.length;
  }

  get totalPaidAmount(): number {
    return this.receipts.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
  }

  get latestReceiptDate(): string | null {
    if (!this.receipts.length) return null;
    return this.receipts.reduce((latest, r) =>
      new Date(r.created_at) > new Date(latest) ? r.created_at : latest,
    this.receipts[0].created_at);
  }

  // ===============================
  // RESOLVE FULL FILE URL AGAINST BACKEND HOST
  // ===============================

  private resolveFileUrl(path: string | undefined): string | null {
    if (!path) return null;
    return path.startsWith("http") ? path : this.baseUrl + path;
  }

  // ===============================
  // VIEW RECEIPT PDF (NOW OPENS IN-PAGE)
  // ===============================

  viewReceipt(receipt: Receipt): void {
    const fullUrl = this.resolveFileUrl(receipt.file_path);

    if (!fullUrl) return;

    this.viewingReceipt = receipt;
    this.viewingReceiptUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
    this.isReceiptLoading = true;
    this.showReceiptModal = true;
  }

  onReceiptPreviewLoaded(): void {
    this.isReceiptLoading = false;
  }

  closeReceiptModal(): void {
    this.showReceiptModal = false;
    this.viewingReceipt = null;
    this.viewingReceiptUrl = null;
    this.isReceiptLoading = false;
    this.isFullscreen = false;
  }

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
  }

  // ===============================
  // OPEN IN NEW TAB (fallback, e.g. for download)
  // ===============================

  openReceiptExternally(): void {
    const fullUrl = this.resolveFileUrl(this.viewingReceipt?.file_path);
    if (fullUrl) {
      window.open(fullUrl, "_blank");
    }
  }
}