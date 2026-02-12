import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiService } from "../service/api.service";

type ScheduleTab = "today" | "upcoming" | "all";

interface ClassItem {
  slot_id: number;
  class_date: string;
  slot_time: string;
  subject_name: string;
  topic_name?: string;
  room_no?: string;
  start_time?: string;
  end_time?: string;
  class_link?: string;
  class_name?: string;
  schedule_id?: number;
}

interface StudyMaterial {
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_path?: string;
  file_size?: number;
}

interface TopicObject {
  name?: string;
  title?: string;
  topic_name?: string;
  topic?: string;
  [key: string]: any;
}

@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./student-dashboard.component.html",
  styleUrl: "./student-dashboard.component.css",
})
export class StudentDashboardComponent implements OnInit {
  /* ================= REGISTRATION MODAL ================= */
  showRegistrationModal = false;
  registrationForm!: FormGroup;
  isSubmittingRegistration = false;
  registrationSuccess = false;
  registrationError = "";
  isStudentRegistered = false;

  /* ================= TABS ================= */
  tabs: ScheduleTab[] = ["today", "upcoming", "all"];
  activeTab: ScheduleTab = "today";

  /* ================= CLASS DATA ================= */
  rawClasses: ClassItem[] = [];
  groupedSchedules: {
    date: string;
    classes: ClassItem[];
  }[] = [];

  /* ================= MODAL FOR STUDY MATERIAL ================= */
  showMaterialModal = false;
  selectedSlot: ClassItem | null = null;
  studyMediaBySlot: { [slotId: number]: StudyMaterial[] } = {};
  studyTopicBySlot: { [slotId: number]: string } = {};
  isMaterialLoading = false;

  isLoading = true;
  todayStr = "";

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.todayStr = this.formatDate(new Date());
    this.initRegistrationForm();
    this.checkStudentRegistrationStatus();
  }

  /* ================= REGISTRATION FORM INIT ================= */
  initRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      full_name: ["", Validators.required],
      phone_no: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      birth_date: ["", Validators.required],
      birth_time: ["", Validators.required],
      whatsapp_group: ["", Validators.required],
      qualification: ["", Validators.required],
      studied_astrology: ["", Validators.required],
      computer_knowledge: ["", Validators.required],
      class_mode: ["", Validators.required],
    });
  }

  /* ================= CHECK STUDENT REGISTRATION STATUS ================= */
  checkStudentRegistrationStatus(): void {
    this.isLoading = true;

    console.log("Checking registration status...");

    this.api.checkStudentRegistration().subscribe({
      next: (res: any) => {
        console.log("Registration check response:", res);

        // Your API returns { success: true, isRegistered: false } for new students
        this.isStudentRegistered = res?.isRegistered === true;

        if (this.isStudentRegistered) {
          console.log("Student is registered - loading dashboard");
          this.showRegistrationModal = false;
          this.loadSchedule();
        } else {
          console.log("Student is NOT registered - showing registration form");
          this.isStudentRegistered = false;
          this.showRegistrationModal = true;
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error("Error checking registration status:", error);
        // On error, show registration form to be safe
        this.isStudentRegistered = false;
        this.showRegistrationModal = true;
        this.isLoading = false;
      },
    });
  }

  /* ================= SUBMIT REGISTRATION ================= */
  submitRegistration(): void {
    if (this.registrationForm.invalid) {
      this.registrationError = "Please fill all required fields.";

      Object.keys(this.registrationForm.controls).forEach((key) => {
        this.registrationForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmittingRegistration = true;
    this.registrationError = "";

    this.api.updateStudentDetails(this.registrationForm.value).subscribe({
      next: (res: any) => {
        this.isSubmittingRegistration = false;
        this.registrationSuccess = true;
        this.isStudentRegistered = true;

        // Show success message and then load dashboard
        setTimeout(() => {
          this.showRegistrationModal = false;
          this.registrationSuccess = false;
          this.loadSchedule();
        }, 2000);
      },
      error: (err) => {
        this.isSubmittingRegistration = false;
        this.registrationError =
          err.error?.message || "Registration failed. Please try again.";
      },
    });
  }

  /* ================= CLOSE REGISTRATION MODAL (NOT ALLOWED) ================= */
  closeRegistrationModal(): void {
    // Do nothing - modal cannot be closed without registration
    if (!this.isStudentRegistered) {
      this.registrationError =
        "You must complete registration to access the dashboard.";
    }
  }

  /* ================= LOAD CLASSES ================= */
  loadSchedule(): void {
    this.isLoading = true;

    this.api.getStudentClassesFromToken().subscribe({
      next: (res: any) => {
        this.rawClasses = res?.data || [];
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Error loading classes:", err);
        this.rawClasses = [];
        this.groupedSchedules = [];
        this.isLoading = false;
      },
    });
  }

  /* ================= CHECK IF CLASS HAS LINK ================= */
  hasClassLink(slot: ClassItem): boolean {
    return !!(
      slot.class_link &&
      slot.class_link.trim() !== "" &&
      slot.class_link !== "null"
    );
  }

  /* ================= JOIN CLASS ================= */
  joinClass(slot: ClassItem): void {
    if (this.hasClassLink(slot)) {
      this.markAttendance(slot.slot_id);
      window.open(slot.class_link, "_blank");
    }
  }

  /* ================= MARK ATTENDANCE ================= */
  private markAttendance(slotId: number): void {
    this.api.markAttendanceOnJoin({ slot_id: slotId }).subscribe({
      next: (res: any) => {
        console.log("Attendance marked successfully:", res);
      },
      error: (error) => {
        console.error("Error marking attendance:", error);
      },
    });
  }

  /* ================= VIEW STUDY MATERIAL ================= */
  viewStudyMaterials(slot: ClassItem): void {
    this.selectedSlot = slot;
    const slotId = slot.slot_id;

    this.showMaterialModal = true;
    this.isMaterialLoading = true;

    delete this.studyMediaBySlot[slotId];
    delete this.studyTopicBySlot[slotId];

    this.api.getStudentStudyMaterialsFromToken({ slot_id: slotId }).subscribe({
      next: (res: any) => {
        let topic = "No topic specified";

        if (res) {
          if (typeof res.topic === "string") {
            topic = res.topic;
          } else if (res.topic && typeof res.topic === "object") {
            const topicObj = res.topic as TopicObject;
            topic =
              topicObj.name ||
              topicObj.title ||
              topicObj.topic_name ||
              topicObj.topic ||
              JSON.stringify(res.topic);
          } else if (res.data?.topic) {
            if (typeof res.data.topic === "string") {
              topic = res.data.topic;
            } else if (typeof res.data.topic === "object") {
              const dataTopicObj = res.data.topic as TopicObject;
              topic =
                dataTopicObj.name ||
                dataTopicObj.title ||
                dataTopicObj.topic_name ||
                dataTopicObj.topic ||
                JSON.stringify(res.data.topic);
            }
          } else if (res.data?.topic_name) {
            topic = res.data.topic_name;
          } else if (res.topic_name) {
            topic = res.topic_name;
          }
        }

        if (topic === "No topic specified" && this.selectedSlot?.topic_name) {
          topic = this.selectedSlot.topic_name;
        }

        this.studyTopicBySlot[slotId] = topic;

        let media: StudyMaterial[] = [];

        if (res?.media && Array.isArray(res.media)) {
          media = res.media;
        } else if (res?.data?.media && Array.isArray(res.data.media)) {
          media = res.data.media;
        } else if (res?.data && Array.isArray(res.data)) {
          media = res.data;
        } else if (res && Array.isArray(res)) {
          media = res;
        }

        this.studyMediaBySlot[slotId] = media;
        this.isMaterialLoading = false;
      },
      error: (error) => {
        console.error("Error loading study materials:", error);

        const fallbackTopic =
          this.selectedSlot?.topic_name ||
          "Failed to load topic. Please try again.";

        this.studyTopicBySlot[slotId] = fallbackTopic;
        this.studyMediaBySlot[slotId] = [];
        this.isMaterialLoading = false;
      },
    });
  }

  /* ================= CLOSE MODAL ================= */
  closeModal(): void {
    this.showMaterialModal = false;
    this.selectedSlot = null;
  }

  /* ================= OPEN FILE ================= */
  openFile(path: string | undefined): void {
    if (!path) {
      console.warn("No file path provided");
      return;
    }

    const baseUrl = "https://vediknode.vedikastrologer.com";
    const fullUrl = path.startsWith("http") ? path : baseUrl + path;

    window.open(fullUrl, "_blank");
  }

  /* ================= TAB HANDLERS ================= */
  setActiveTab(tab: ScheduleTab): void {
    this.activeTab = tab;
    this.applyFilter();
  }

  getTabLabel(tab: ScheduleTab): string {
    const labels = {
      today: "Today",
      upcoming: "Upcoming",
      all: "All Classes",
    };
    return labels[tab];
  }

  /* ================= FILTER + GROUP ================= */
  applyFilter(): void {
    let filtered = [...this.rawClasses];

    if (this.activeTab === "today") {
      filtered = filtered.filter((c) => c.class_date === this.todayStr);
    }

    if (this.activeTab === "upcoming") {
      filtered = filtered.filter((c) => c.class_date > this.todayStr);
    }

    const map = new Map<string, ClassItem[]>();

    filtered.forEach((c) => {
      if (!map.has(c.class_date)) {
        map.set(c.class_date, []);
      }

      const [start, end] = c.slot_time?.split(" - ") || ["", ""];

      map.get(c.class_date)!.push({
        ...c,
        start_time: start,
        end_time: end,
      });
    });

    this.groupedSchedules = Array.from(map.entries()).map(
      ([date, classes]) => ({ date, classes }),
    );
  }

  /* ================= DATE FORMAT ================= */
  private formatDate(d: Date): string {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  /* ================= GET FILE ICON ================= */
  getFileIcon(mimeType: string | undefined): string {
    if (!mimeType) return "📎";
    const mime = mimeType.toLowerCase();
    if (mime.includes("pdf")) return "📄";
    if (mime.includes("image")) return "🖼️";
    if (mime.includes("video")) return "🎬";
    if (mime.includes("audio")) return "🎵";
    if (mime.includes("word") || mime.includes("doc")) return "📝";
    if (mime.includes("excel") || mime.includes("sheet")) return "📊";
    if (mime.includes("powerpoint") || mime.includes("ppt")) return "📽️";
    if (mime.includes("text") || mime.includes("txt")) return "📃";
    return "📎";
  }

  /* ================= GET CURRENT TOPIC ================= */
  getCurrentTopic(): string {
    if (!this.selectedSlot) return "No topic specified";
    const slotId = this.selectedSlot.slot_id;
    const topic = this.studyTopicBySlot[slotId];
    return topic || this.selectedSlot.topic_name || "No topic specified";
  }

  /* ================= GET CURRENT MEDIA ================= */
  getCurrentMedia(): StudyMaterial[] {
    if (!this.selectedSlot) return [];
    const slotId = this.selectedSlot.slot_id;
    return this.studyMediaBySlot[slotId] || [];
  }

  /* ================= FORMAT FILE SIZE ================= */
  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return "Size unknown";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  }

  /* ================= LOGOUT ================= */
  logout(): void {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
}
