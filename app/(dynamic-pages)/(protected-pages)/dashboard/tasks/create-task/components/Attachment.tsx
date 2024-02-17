import React from "react";
import { File, XIcon } from "lucide-react";
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

interface AttachmentProps {
  preview: FilePreview;
  openPreview: (preview: any) => void;
  handleDeleteFile: (path: string, index: number) => void;
  index: number;
}

export const Attachment: React.FC<AttachmentProps> = ({
  preview,
  openPreview,
  handleDeleteFile,
  index,
}) => {
  return (
    <div className="flex w-fit items-center justify-between p-2 border rounded-lg bg-gradient-to-r from-muted to-transparent">
      <button
        className="flex items-center space-x-2"
        onClick={(e) => {
          e.preventDefault();
          openPreview(preview);
        }}
      >
        <File className="w-4 h-4 text-foreground" aria-hidden="true" />
        <span className="truncate text-sm">
          {"file" in preview ? preview.file.name : preview.name}
        </span>
      </button>
      <button
        type="button"
        onClick={() => handleDeleteFile(preview.path, index)}
        className="text-destructive pl-2"
      >
        <XIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
};
