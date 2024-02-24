import { useToastMutation } from "@/hooks/useToastMutation";
import axios from "axios";
import { Image } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";

const uploadedFilesResponseSchema = z.array(z.object({
  name: z.string(),
  url: z.string(),
}));

type UploadedFiles = z.infer<typeof uploadedFilesResponseSchema>

const UploadImageFile = ({
  onUpload,
}: {
  onUpload: (filesInfo: { name: string; url: string }[]) => void;
}) => {
  // const UploadFiles = ({ onUpload }: { onUpload: (files: File[]) => void }) => {

  const uploadFileMutation = useToastMutation<UploadedFiles, unknown, Array<File>>(
    async (files) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`files[]`, file);
      });

      const { data } = await axios.post(
        "/api/tasks/uploadFilesv2", // Ensure this endpoint supports various file types
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Upload response data:", data);

      return uploadedFilesResponseSchema.parse(data);
    },
    {
      loadingMessage: "Uploading file...",
      successMessage: `File uploaded! `,
      errorMessage: "Failed to upload file",
      onSuccess: (filesInfoArray, variables) => {
        console.log("Upload response data:", filesInfoArray);
        if (Array.isArray(filesInfoArray) && filesInfoArray.length > 0) {
          onUpload(filesInfoArray);
        } else {
          console.error("No URLs in the response data");
        }
      },
    }
  );

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      return uploadFileMutation.mutateAsync(acceptedFiles);

    },
    [uploadFileMutation, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 4,
  });

  return (
    <div
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center">
          <Image size={40} className="text-secondary stroke-0.5" />
        </div>
      )}
    </div>
  );
};

export { UploadImageFile };
