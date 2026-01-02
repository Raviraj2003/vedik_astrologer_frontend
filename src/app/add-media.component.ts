import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-media',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-media.component.html',
})
export class AddMediaComponent {
  loading = false;

  // Data Objects
  imageData = { title: '', description: '', file: null as File | null };
  pdfData   = { title: '', description: '', file: null as File | null };
  videoData = { title: '', description: '', file: null as File | null };

  // UI Preview Helpers
  imagePreview: string | ArrayBuffer | null = null;
  pdfFileName: string = '';
  videoFileName: string = '';

  constructor(private api: ApiService) {}

  onFileChange(event: any, type: 'image' | 'pdf' | 'video') {
    const file = event.target.files[0];
    if (!file) return;

    if (type === 'image') {
      this.imageData.file = file;
      // Generate Image Preview
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    } 
    
    if (type === 'pdf') {
      this.pdfData.file = file;
      this.pdfFileName = file.name;
    } 
    
    if (type === 'video') {
      this.videoData.file = file;
      this.videoFileName = file.name;
    }
  }

  // ================= UPLOAD ACTIONS =================

  uploadImage() {
    if (!this.imageData.file) return alert('Please select an image first');
    
    const fd = new FormData();
    fd.append('title', this.imageData.title);
    fd.append('description', this.imageData.description);
    fd.append('image', this.imageData.file);

    this.executeUpload(this.api.uploadImage(fd), 'image');
  }

  uploadPdf() {
    if (!this.pdfData.file) return alert('Please select a PDF first');
    
    const fd = new FormData();
    fd.append('title', this.pdfData.title);
    fd.append('description', this.pdfData.description);
    fd.append('pdf', this.pdfData.file);

    this.executeUpload(this.api.uploadPdf(fd), 'pdf');
  }

  uploadVideo() {
    if (!this.videoData.file) return alert('Please select a video first');
    
    const fd = new FormData();
    fd.append('title', this.videoData.title);
    fd.append('description', this.videoData.description);
    fd.append('video', this.videoData.file);

    this.executeUpload(this.api.uploadVideo(fd), 'video');
  }

  // Helper to handle the API call and cleanup
  private executeUpload(obs: any, type: 'image' | 'pdf' | 'video') {
    this.loading = true;
    obs.subscribe({
      next: () => {
        alert(`✅ ${type.toUpperCase()} uploaded successfully!`);
        this.resetForm(type);
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        alert('Upload failed. Please try again.');
        this.loading = false;
      }
    });
  }

  private resetForm(type: 'image' | 'pdf' | 'video') {
  if (type === 'image') {
    this.imageData = { title: '', description: '', file: null }; // Clears description
    this.imagePreview = null;
  } else if (type === 'pdf') {
    this.pdfData = { title: '', description: '', file: null };   // Clears description
    this.pdfFileName = '';
  } else if (type === 'video') {
    
    this.videoData = { title: '', description: '', file: null }; // Clears description
    this.videoFileName = '';
  }
}
}