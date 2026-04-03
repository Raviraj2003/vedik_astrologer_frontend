import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-topic-media-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topic-media-list.component.html',
  styleUrls: ['./topic-media-list.component.css']
})
export class TopicMediaListComponent implements OnInit {
  // Standards
  standards: any[] = [];
  selectedStandardId: number | null = null;
  standardsLoading = false;
  standardsError = '';

  // Topics
  topics: any[] = [];
  selectedTopicId: number | null = null;
  topicsLoading = false;
  topicsError = '';

  // Media
  mediaItems: any[] = [];
  filteredMediaItems: any[] = [];
  mediaLoading = false;
  mediaError = '';

  // Search
  searchTerm: string = '';
  searchType: string = 'all'; // all, title, filename, type

  // Edit modal
  showEditModal = false;
  editingMedia: any = null;
  editForm = {
    id: 0,
    title: '',
    description: ''
  };
  updateLoading = false;
  updateError = '';

  // Delete confirmation
  showDeleteModal = false;
  deletingMedia: any = null;
  deleteLoading = false;
  deleteError = '';

  // Preview modal
  showPreviewModal = false;
  previewMedia: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStandards();
  }

  // ======================================
  // FETCH STANDARDS
  // ======================================
  fetchStandards(): void {
    this.standardsLoading = true;
    this.standardsError = '';

    this.apiService.getStandards().subscribe({
      next: (response) => {
        if (response.success) {
          this.standards = response.data;
        } else {
          this.standardsError = response.message || 'Failed to fetch standards';
        }
        this.standardsLoading = false;
      },
      error: (error) => {
        console.error('Error fetching standards:', error);
        this.standardsError = this.getErrorMessage(error);
        this.standardsLoading = false;
      }
    });
  }

  // ======================================
  // FETCH TOPICS BY STANDARD
  // ======================================
  onStandardChange(): void {
    if (!this.selectedStandardId) {
      this.topics = [];
      this.selectedTopicId = null;
      this.mediaItems = [];
      this.filteredMediaItems = [];
      this.searchTerm = '';
      return;
    }

    this.fetchTopicsByStandard(this.selectedStandardId);
  }

  fetchTopicsByStandard(standardId: number): void {
    this.topicsLoading = true;
    this.topicsError = '';
    this.selectedTopicId = null;
    this.mediaItems = [];
    this.filteredMediaItems = [];
    this.searchTerm = '';

    this.apiService.getTopicsByStandard(standardId).subscribe({
      next: (response) => {
        if (response.success) {
          this.topics = response.data;
          console.log('Topics fetched:', this.topics);
        } else {
          this.topicsError = 'Failed to fetch topics';
        }
        this.topicsLoading = false;
      },
      error: (error) => {
        console.error('Error fetching topics:', error);
        this.topicsError = this.getErrorMessage(error);
        this.topicsLoading = false;
      }
    });
  }

  // ======================================
  // FETCH MEDIA BY TOPIC
  // ======================================
  onTopicSelect(topicId: number): void {
    this.selectedTopicId = topicId;
    this.fetchMediaByTopic(topicId);
  }

  fetchMediaByTopic(topicId: number): void {
    this.mediaLoading = true;
    this.mediaError = '';
    this.searchTerm = '';

    console.log('Fetching media for topic ID:', topicId);

    this.apiService.getTopicMediaByTopic(topicId).subscribe({
      next: (response) => {
        console.log('Media response:', response);
        
        if (response.success) {
          // Check if data exists and is an array
          const mediaData = response.data || [];
          
          // Map the response data to include additional fields
          this.mediaItems = mediaData.map((media: any) => ({
            ...media,
            title: media.title || this.extractTitleFromFileName(media.file_name),
            description: media.description || '',
            media_type: this.getMediaTypeFromMimeType(media.mime_type),
            created_at: media.created_at,
            updated_at: media.created_at || media.updated_at,
            file_url: media.file_url || media.file_path
          }));
          
          this.filteredMediaItems = [...this.mediaItems];
          console.log('Processed media items:', this.mediaItems);
        } else {
          this.mediaError = response.message || 'Failed to fetch media';
          this.mediaItems = [];
          this.filteredMediaItems = [];
        }
        this.mediaLoading = false;
      },
      error: (error) => {
        console.error('Error fetching media:', error);
        this.mediaError = this.getErrorMessage(error);
        this.mediaLoading = false;
        this.mediaItems = [];
        this.filteredMediaItems = [];
      }
    });
  }

  // ======================================
  // HELPER FUNCTIONS FOR DATA MAPPING
  // ======================================
  extractTitleFromFileName(fileName: string): string {
    if (!fileName) return 'Untitled';
    // Remove file extension
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return fileName;
    return fileName.substring(0, lastDotIndex);
  }

  getMediaTypeFromMimeType(mimeType: string): string {
    if (!mimeType) return 'file';
    
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.includes('pdf')) return 'pdf';
    if (mimeType.includes('document')) return 'document';
    if (mimeType.includes('mpeg')) return 'audio';
    if (mimeType.includes('mp4')) return 'video';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'image';
    return 'file';
  }

  // ======================================
  // FILTER MEDIA BY SEARCH TERM
  // ======================================
  filterMedia(): void {
    if (!this.searchTerm.trim()) {
      this.filteredMediaItems = [...this.mediaItems];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredMediaItems = this.mediaItems.filter((media) => {
      if (this.searchType === 'title') {
        return media.title?.toLowerCase().includes(term);
      } else if (this.searchType === 'filename') {
        return media.file_name?.toLowerCase().includes(term);
      } else if (this.searchType === 'type') {
        return media.media_type?.toLowerCase().includes(term);
      } else {
        // Search in all fields
        return (
          media.title?.toLowerCase().includes(term) ||
          media.description?.toLowerCase().includes(term) ||
          media.media_type?.toLowerCase().includes(term) ||
          media.file_name?.toLowerCase().includes(term) ||
          (media.mime_type && media.mime_type.toLowerCase().includes(term))
        );
      }
    });
  }

  // ======================================
  // EDIT MEDIA
  // ======================================
  openEditModal(media: any): void {
    this.editingMedia = media;
    this.editForm = {
      id: media.id,
      title: media.title || '',
      description: media.description || ''
    };
    this.updateError = '';
    this.showEditModal = true;
  }

  closeEditModal(): void {
    this.showEditModal = false;
    this.editingMedia = null;
    this.editForm = { id: 0, title: '', description: '' };
    this.updateError = '';
  }

  updateMedia(): void {
    if (!this.editForm.title?.trim()) {
      this.updateError = 'Title is required';
      return;
    }

    this.updateLoading = true;
    this.updateError = '';

    const updateData: any = {
      id: this.editForm.id,
      title: this.editForm.title
    };

    if (this.editForm.description) {
      updateData.description = this.editForm.description;
    }

    this.apiService.updateTopicMedia(updateData).subscribe({
      next: (response) => {
        if (response.success) {
          // Update the media item in the local array
          const index = this.mediaItems.findIndex(m => m.id === this.editForm.id);
          if (index !== -1) {
            this.mediaItems[index] = {
              ...this.mediaItems[index],
              title: this.editForm.title,
              description: this.editForm.description
            };
          }
          
          // Update filtered items as well
          const filteredIndex = this.filteredMediaItems.findIndex(m => m.id === this.editForm.id);
          if (filteredIndex !== -1) {
            this.filteredMediaItems[filteredIndex] = {
              ...this.filteredMediaItems[filteredIndex],
              title: this.editForm.title,
              description: this.editForm.description
            };
          }

          this.closeEditModal();
        } else {
          this.updateError = response.message || 'Failed to update media';
        }
        this.updateLoading = false;
      },
      error: (error) => {
        console.error('Error updating media:', error);
        this.updateError = this.getErrorMessage(error);
        this.updateLoading = false;
      }
    });
  }

  // ======================================
  // DELETE MEDIA
  // ======================================
  openDeleteModal(media: any): void {
    this.deletingMedia = media;
    this.deleteError = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deletingMedia = null;
    this.deleteError = '';
  }

  confirmDelete(): void {
    if (!this.deletingMedia) return;

    this.deleteLoading = true;
    this.deleteError = '';

    this.apiService.deleteTopicMedia(this.deletingMedia.id).subscribe({
      next: (response) => {
        if (response.success) {
          // Remove from media items
          this.mediaItems = this.mediaItems.filter(m => m.id !== this.deletingMedia.id);
          this.filteredMediaItems = this.filteredMediaItems.filter(m => m.id !== this.deletingMedia.id);
          this.closeDeleteModal();
        } else {
          this.deleteError = response.message || 'Failed to delete media';
        }
        this.deleteLoading = false;
      },
      error: (error) => {
        console.error('Error deleting media:', error);
        this.deleteError = this.getErrorMessage(error);
        this.deleteLoading = false;
      }
    });
  }

  // ======================================
  // PREVIEW MEDIA
  // ======================================
  openPreviewModal(media: any): void {
    this.previewMedia = media;
    this.showPreviewModal = true;
  }

  closePreviewModal(): void {
    this.showPreviewModal = false;
    this.previewMedia = null;
  }

  // ======================================
  // UTILITY FUNCTIONS
  // ======================================
  getStandardName(): string {
    const standard = this.standards.find(s => s.standard_id === this.selectedStandardId);
    return standard ? standard.standard_name : 'Select Standard';
  }

  getTopicName(): string {
    const topic = this.topics.find(t => t.id === this.selectedTopicId);
    return topic ? topic.topic_name : 'Select Topic';
  }

  getMediaTypeIcon(mediaType: string): string {
    const type = mediaType?.toLowerCase() || '';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('document')) return '📑';
    return '📁';
  }

  getMediaTypeColor(mediaType: string): string {
    const type = mediaType?.toLowerCase() || '';
    if (type.includes('video')) return 'from-red-500 to-red-600';
    if (type.includes('audio')) return 'from-green-500 to-green-600';
    if (type.includes('pdf')) return 'from-orange-500 to-orange-600';
    if (type.includes('image')) return 'from-purple-500 to-purple-600';
    if (type.includes('document')) return 'from-blue-500 to-blue-600';
    return 'from-gray-500 to-gray-600';
  }

  getFileExtension(filename: string): string {
    if (!filename) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
  }

  formatFileSize(bytes: number): string {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  getFullFileUrl(filePath: string): string {
    if (!filePath) return '';
    // If it's already a full URL
    if (filePath.startsWith('http')) {
      return filePath;
    }
    // Construct full URL with base URL
    return `https://vediknode.vedikastrologer.com${filePath}`;
  }

  // ======================================
  // ACTION FUNCTIONS
  // ======================================
  clearSearch(): void {
    this.searchTerm = '';
    this.searchType = 'all';
    this.filterMedia();
  }

  resetSelection(): void {
    this.selectedStandardId = null;
    this.selectedTopicId = null;
    this.topics = [];
    this.mediaItems = [];
    this.filteredMediaItems = [];
    this.searchTerm = '';
  }

  refreshMedia(): void {
    if (this.selectedTopicId) {
      this.fetchMediaByTopic(this.selectedTopicId);
    }
  }

  // Add this method to handle opening URLs
openFileUrl(url: string): void {
  window.open(url, '_blank');
}

  exportMediaList(): void {
    if (this.filteredMediaItems.length === 0) return;

    const headers = [
      'ID',
      'Title',
      'Description',
      'Media Type',
      'File Name',
      'File Size',
      'MIME Type',
      'Created At'
    ];
    
    const csvData = this.filteredMediaItems.map((media) => [
      media.id,
      media.title || 'N/A',
      media.description || 'N/A',
      media.media_type || 'N/A',
      media.file_name || 'N/A',
      this.formatFileSize(media.file_size),
      media.mime_type || 'N/A',
      this.formatDate(media.created_at)
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => 
        row.map(cell => `"${cell}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `topic_media_${this.getTopicName()}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // ======================================
  // ERROR HANDLING
  // ======================================
  private getErrorMessage(error: any): string {
    if (error.status === 0) {
      return 'Cannot connect to server. Please check your internet connection.';
    } else if (error.status === 401) {
      return 'Unauthorized. Please login again.';
    } else if (error.status === 404) {
      return 'API endpoint not found. Please check the URL.';
    } else if (error.status === 500) {
      return 'Server error. Please try again later.';
    } else {
      return error.error?.message || 'An unexpected error occurred.';
    }
  }
}