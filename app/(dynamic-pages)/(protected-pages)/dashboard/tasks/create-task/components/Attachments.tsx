import { Label } from "@/components/ui/label";
import { File, XIcon } from "lucide-react";
import { AttachmentDialog } from "@/components/AttachmentDialog";

export function Attachments({
  filePreviews,
  removeFile,
  openPreview,
  closePreview,
  selectedAttachment,
}: {
  filePreviews: { file: File; previewUrl: string }[];
  removeFile: (index: number) => void;
  openPreview: (attachment: { file: File; previewUrl: string }) => void;
  closePreview: () => void;
  selectedAttachment: { file: File; previewUrl: string } | null;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Attachments</Label>
      <div>
        <div className="flex flex-wrap gap-2">
          {filePreviews.map(({ file, previewUrl }, index) => (
            <div
              key={index}
              className="flex w-fit items-center justify-between p-2 border rounded-lg bg-gradient-to-r from-muted to-transparent"
            >
              <button
                className="flex items-center space-x-2"
                onClick={() => openPreview({ file, previewUrl })}
              >
                <File className="w-4 h-4 text-foreground" aria-hidden="true" />
                <span className="truncate text-sm">{file.name}</span>
              </button>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-destructive pl-2"
              >
                <XIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        {selectedAttachment && (
          <AttachmentDialog
            onOpenChange={closePreview}
            attachment={selectedAttachment}
          />
        )}
      </div>
    </div>
  );
}
