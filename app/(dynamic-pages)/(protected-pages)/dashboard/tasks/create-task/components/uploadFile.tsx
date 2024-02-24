import { useToastMutation } from "@/hooks/useToastMutation";
import axios from "axios";
import { Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const UploadFiles = ({
  onUpload,
  showFilePreviews,
}: {
  onUpload: (filesInfo: { name: string; url: string }[]) => void;
  showFilePreviews: (files: File[], paths: string[]) => void;
}) => {
  // const UploadFiles = ({ onUpload }: { onUpload: (files: File[]) => void }) => {

  const uploadFileMutation = useToastMutation<string[], unknown, File>(
    async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        "/api/tasks/uploadFiles", // Ensure this endpoint supports various file types
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Upload response data:", data);

      return data;
    },
    {
      loadingMessage: "Uploading file...",
      successMessage: `File uploaded! `,
      errorMessage: "Failed to upload file",
      onSuccess: (data, variables) => {
        console.log("Upload response data:", data);
        if (Array.isArray(data) && data.length > 0) {
          // Since the response is an array of URLs, use the first URL for the file
          const fileInfo = { name: variables.name, url: data[0] };
          onUpload([fileInfo]);
        } else {
          console.error("No URLs in the response data");
        }
      },
    }
  );

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const uploadPromises = acceptedFiles.map((file) =>
        uploadFileMutation.mutateAsync(file)
      );

      Promise.all(uploadPromises)
        .then((filesInfoArray) => {
          // filesInfoArray is an array of fileInfo, where each fileInfo corresponds to a file
          const filesInfo = filesInfoArray.map((urlArray, index) => ({
            name: acceptedFiles[index].name,
            url: urlArray[0], // Assuming each response is an array with a single URL
          }));
          onUpload(filesInfo);
          showFilePreviews(
            acceptedFiles,
            filesInfo.map((f) => f.url)
          );
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
        });
    },
    [uploadFileMutation, onUpload, showFilePreviews]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 4,
  });

  return (
    <div
      className="border-2 rounded-lg border-dashed h-64 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload size={20} className="text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            Drag and Drop or Browse to upload  files / photos
          </p>
        </div>
      )}
    </div>
  );
};

export { UploadFiles };
