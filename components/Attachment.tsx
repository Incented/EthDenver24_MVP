import React from "react";
import { File, XIcon } from "lucide-react";

interface AttachmentProps {
  name: string;
  onClick?: () => void;
  onRemove?: () => void;
}

export const Attachment: React.FC<AttachmentProps> = ({
  name,
  onClick,
  onRemove,
}) => {
  return (
    <div className="flex w-fit items-center justify-between p-2 border rounded-lg bg-gradient-to-r from-muted to-transparent">
      <button
        className="flex items-center space-x-2"
        onClick={onClick ?? undefined}
      >
        <File className="w-4 h-4 text-foreground" aria-hidden="true" />
        <span className="truncate text-sm">{name}</span>
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-destructive pl-2"
        >
          <XIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

// code a/c to new ui
// import { FC } from "react";
// import { File, MoreVertical } from "lucide-react";

// interface AttachmentProps {
//   fileName: string;
// }

// export const Attachment: FC<AttachmentProps> = ({ fileName }) => {
//   return (
//     <div className="flex items-center gap-1 px-2 py-2.5 border rounded-md w-fit">
//       <File size={16} />
//       <samp className="text-xs">{fileName}</samp>
//       <MoreVertical size={16} className="ml-2" />
//     </div>
//   );
// };
