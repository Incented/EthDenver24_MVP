export interface BasicFilePreview {
  name: string;
  url: string;
  path: string;
}

export interface ExtendedFilePreview {
  file: File;
  previewUrl: string;
  path: string;
}

export type FilePreview = BasicFilePreview | ExtendedFilePreview;

export type AttachmentType = {
  file: File;
  previewUrl: string;
};
