import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "app-add-media",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./add-media.component.html",
})
export class AddMediaComponent implements OnInit {
  loading = false;

  // ================= IMAGE / PDF / VIDEO =================
  imageData = { title: "", description: "", file: null as File | null };
  pdfData = { title: "", description: "", file: null as File | null };
  videoData = { title: "", description: "", file: null as File | null };

  imagePreview: string | ArrayBuffer | null = null;
  pdfFileName = "";
  videoFileName = "";

  // ================= TOPIC MEDIA =================
  topics: any[] = [];
  selectedTopicId: number | null = null;
  selectedTopicName = ""; // ✅ UI ONLY

  topicMediaData = {
    title: "",
    description: "",
    file: null as File | null,
  };

  topicFileName = "";
  topicFileType = "";

  constructor(private api: ApiService) {}

  // ================= INIT =================
  ngOnInit(): void {
    this.loadTopics();
  }

  // ================= LOAD TOPICS =================
  loadTopics(): void {
    this.api.getTopicList().subscribe({
      next: (res: any) => {
        this.topics = res?.data || [];
      },
      error: () => {
        alert("❌ Failed to load topics");
      },
    });
  }

  // ================= TOPIC CHANGE =================
  onTopicChange(): void {
    const topic = this.topics.find((t) => t.id === this.selectedTopicId);
    this.selectedTopicName = topic ? topic.topic_name : "";
  }

  // ================= IMAGE / PDF / VIDEO =================
  onFileChange(event: Event, type: "image" | "pdf" | "video"): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    if (type === "image") {
      this.imageData.file = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }

    if (type === "pdf") {
      this.pdfData.file = file;
      this.pdfFileName = file.name;
    }

    if (type === "video") {
      this.videoData.file = file;
      this.videoFileName = file.name;
    }
  }

  // ================= TOPIC FILE =================
  onTopicFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];
    this.topicMediaData.file = file;
    this.topicFileName = file.name;

    if (file.type.includes("pdf")) this.topicFileType = "PDF";
    else if (file.type.includes("image")) this.topicFileType = "IMAGE";
    else if (file.type.includes("video")) this.topicFileType = "VIDEO";
    else this.topicFileType = "FILE";
  }

  // ================= UPLOAD IMAGE =================
  uploadImage(): void {
    if (!this.imageData.file) return alert("Select image");

    const fd = new FormData();
    fd.append("title", this.imageData.title);
    fd.append("description", this.imageData.description);
    fd.append("image", this.imageData.file);

    this.executeUpload(this.api.uploadImage(fd), "image");
  }

  // ================= UPLOAD PDF =================
  uploadPdf(): void {
    if (!this.pdfData.file) return alert("Select PDF");

    const fd = new FormData();
    fd.append("title", this.pdfData.title);
    fd.append("description", this.pdfData.description);
    fd.append("pdf", this.pdfData.file);

    this.executeUpload(this.api.uploadPdf(fd), "pdf");
  }

  // ================= UPLOAD VIDEO =================
  uploadVideo(): void {
    if (!this.videoData.file) return alert("Select video");

    const fd = new FormData();
    fd.append("title", this.videoData.title);
    fd.append("description", this.videoData.description);
    fd.append("video", this.videoData.file);

    this.executeUpload(this.api.uploadVideo(fd), "video");
  }

  // ================= UPLOAD TOPIC MEDIA =================
  uploadTopicMedia(): void {
    if (!this.selectedTopicId || !this.topicMediaData.file) {
      return alert("Select topic and file");
    }

    const fd = new FormData();
    fd.append("topic_id", String(this.selectedTopicId)); // ✅ ID ONLY
    fd.append("title", this.topicMediaData.title || "");
    fd.append("description", this.topicMediaData.description || "");
    fd.append("file", this.topicMediaData.file);

    this.executeUpload(this.api.uploadTopicMedia(fd), "topic media");
  }

  // ================= COMMON UPLOADER =================
  private executeUpload(obs: any, type: string): void {
    this.loading = true;

    obs.subscribe({
      next: () => {
        alert(`✅ ${type.toUpperCase()} uploaded successfully`);
        this.resetForm(type);
        this.loading = false;
      },
      error: () => {
        alert("❌ Upload failed");
        this.loading = false;
      },
    });
  }

  // ================= RESET =================
  private resetForm(type: string): void {
    if (type === "image") {
      this.imageData = { title: "", description: "", file: null };
      this.imagePreview = null;
    }

    if (type === "pdf") {
      this.pdfData = { title: "", description: "", file: null };
      this.pdfFileName = "";
    }

    if (type === "video") {
      this.videoData = { title: "", description: "", file: null };
      this.videoFileName = "";
    }

    if (type === "topic media") {
      this.topicMediaData = { title: "", description: "", file: null };
      this.selectedTopicId = null;
      this.selectedTopicName = "";
      this.topicFileName = "";
      this.topicFileType = "";
    }
  }
}
