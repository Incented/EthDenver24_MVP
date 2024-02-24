// File: pages/api/upload.ts

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import formidable, { IncomingForm } from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import util from "util";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFiles = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new IncomingForm({
      multiples: true,
    });
    const [_fields, rawFiles] = await form.parse(req);
    const files = (
      "files[]" in rawFiles
        ? rawFiles["files[]"]
        : Array.isArray(rawFiles.file)
        ? rawFiles.file
        : [rawFiles.file]
    ) as formidable.File[];
    console.log(files);
    if (!files.length) {
      return res.status(400).json({ error: "No files found" });
    }
    // Check if files.file is an array and handle accordingly
    const nonEmptyFiles: formidable.File[] = files.filter((file) =>
      Boolean(file)
    ) as formidable.File[];
    if (nonEmptyFiles.length === 0) {
      return res.status(400).json({ error: "No files found" });
    }

    const uploadPromises = nonEmptyFiles.map(async (file) => {
      const originalName = file.originalFilename ?? file.newFilename;
      const fileName = slugify(originalName.split(".")[0]);
      const fileExtension = originalName.split(".").pop(); // Extract file extension

      // Read the file into a Buffer
      const readFile = util.promisify(fs.readFile);
      const fileBuffer = await readFile(file.filepath);

      const { error: uploadError, data: uploadData } =
        await supabaseAdminClient.storage
          .from("task-assets")
          .upload(`${fileName}.${fileExtension}`, fileBuffer, { upsert: true });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data: publicUrlData } = supabaseAdminClient.storage
        .from("task-assets")
        .getPublicUrl(uploadData.path);

      console.log("public Url", publicUrlData.publicUrl);

      return {
        name: originalName,
        url: publicUrlData.publicUrl,
      };
    });

    try {
      const uploadedFilesData = await Promise.all(uploadPromises);
      return res.status(200).json(uploadedFilesData);
    } catch (error) {
      // Perform type checking
      if (error instanceof Error) {
        // Now TypeScript knows `error` is an Error object, so you can access `error.message`
        return res.status(500).json({ error: error.message });
      } else {
        // If it's not an Error object, handle it accordingly
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    return res.status(405).json({ error: "Method not allowed. Use POST" });
  }
};

export default uploadFiles;
