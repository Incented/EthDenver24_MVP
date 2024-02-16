import { FC } from "react";
import { File, MoreVertical } from "lucide-react";

interface AttachmentProps {
  fileName: string;
}

export const Attachment: FC<AttachmentProps> = ({ fileName }) => {
  return (
    <div className="flex items-center gap-1 px-2 py-2.5 border rounded-md w-fit">
      <File size={16} />
      <samp className="text-xs">{fileName}</samp>
      <MoreVertical size={16} className="ml-2" />
    </div>
  );
};
