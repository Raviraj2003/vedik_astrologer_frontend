import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-assign-media',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-media.component.html',
  styleUrl: './assign-media.component.css',
})
export class AssignMediaComponent implements OnInit {

  // 🔹 Batch dropdown
  batches: any[] = [];
  selectedBatchCode: string = '';
  selectedBatchName: string = '';

  // 🔹 Media list
  mediaList: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllBatches();
  }

  // ======================================
  // 🔹 FETCH ALL BATCHES
  // ======================================
  getAllBatches() {
    this.api.getAllBatches().subscribe({
      next: (res) => {
        if (res.success) {
          this.batches = res.data || [];
        }
      },
      error: (err) => {
        console.error('Failed to load batches', err);
      },
    });
  }

  // ======================================
  // 🔹 ON BATCH CHANGE → FETCH MEDIA
  // ======================================
  onBatchChange() {
    if (!this.selectedBatchCode) return;

    this.loading = true;
    this.errorMsg = '';
    this.mediaList = [];

    this.api.getBatchMediaList(this.selectedBatchCode).subscribe({
      next: (res) => {
        if (res.success) {
          this.mediaList = res.data || [];
          this.selectedBatchName = res.batch_name || '';
        } else {
          this.errorMsg = res.message || 'No media found';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Failed to load batch media';
        this.loading = false;
      },
    });
  }

  // ======================================
  // 🔹 PUBLISH MEDIA
  // ======================================
publishMedia(media: any) {
  if (!this.selectedBatchCode) return;

  const payload = {
    batch_code: this.selectedBatchCode,
    media_ref_code: media.media_ref_code,
    media_type: media.media_type,
  };

  media.publishing = true;

  this.api.publishMediaToBatch(payload).subscribe({
    next: (res) => {
      if (res.success) {
        // ✅ RE-FETCH MEDIA LIST (single source of truth)
        this.onBatchChange();
      } else {
        alert(res.message || 'Publish failed');
      }
      media.publishing = false;
    },
    error: (err) => {
      console.error(err);
      alert('Error while publishing media');
      media.publishing = false;
    },
  });
}


  // ======================================
  // 🔹 MEDIA TYPE
  // ======================================
  getMediaType(file: string): string {
    if (!file) return '-';
    const ext = file.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'PDF';
    if (['mp4', 'mov', 'avi'].includes(ext!)) return 'VIDEO';
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext!)) return 'IMAGE';
    return 'OTHER';
  }
}
