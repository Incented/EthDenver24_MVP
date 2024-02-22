"use client";

import { Attachment } from "@/components/Attachment";
import { AttachmentDialog } from "@/components/AttachmentDialog";
import { useState } from "react";

export function AttachmentClient({
  attachments,
}: {
  attachments: Array<{
    name: string;
    url: string;
  }>;
}) {
  const [selectedAttachment, setSelectedAttachment] = useState<{
    name: string;
    type: string;
    previewUrl: string;
  } | null>(null);

  const handleAttachmentClick = (file: { name: string; url: string }) => {
    setSelectedAttachment({
      name: file.name,
      type: "image/*",
      previewUrl: file.url,
    });
  };

  const closeAttachmentDialog = () => {
    setSelectedAttachment(null);
  };

  return (
    <>
      {attachments.length > 0 && (
        <div>
          <h4 className="mb-2 text-sm font-medium ">Attachment files</h4>
          <div className="flex flex-wrap items-center gap-2">
            {attachments.map((file) => (
              <Attachment
                key={file.url}
                name={file.name}
                onClick={() => handleAttachmentClick(file)}
              />
            ))}
          </div>
        </div>
      )}
      {selectedAttachment && (
        <AttachmentDialog
          onOpenChange={closeAttachmentDialog}
          attachment={{
            file: {
              name: selectedAttachment.name,
              type: selectedAttachment.type,
            },
            previewUrl: selectedAttachment.previewUrl,
          }}
        />
      )}
    </>
  );
}
