import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Attachment {
  file: {
    type: string;
    name: string;
  };
  previewUrl: string;
}

interface AttachmentDialogProps {
  onOpenChange: (open: boolean) => void;
  attachment: Attachment;
}

export const AttachmentDialog: React.FC<AttachmentDialogProps> = ({
  onOpenChange,
  attachment,
}) => {
  return (
    <Dialog open={!!attachment} onOpenChange={onOpenChange}>
      <DialogContent className="w-auto h-auto max-w-4xl max-h-screen overflow-y-auto p-4">
        {/* Image Preview */}
        {attachment.file.type.startsWith("image/") && (
          <img
            src={attachment.previewUrl}
            alt={attachment.file.name}
            className="max-w-full max-h-screen"
          />
        )}

        {/* PDF Preview */}
        {attachment.file.type === "application/pdf" && (
          <iframe
            src={attachment.previewUrl}
            title="PDF Preview"
            style={{ width: "100%", height: "500px" }} // Adjust size as needed
          />
        )}

        {/* Fallback for Unsupported File Types */}
        {!(
          attachment.file.type.startsWith("image/") ||
          attachment.file.type === "application/pdf"
        ) && <p>Unsupported file type</p>}
      </DialogContent>
    </Dialog>
  );
};
