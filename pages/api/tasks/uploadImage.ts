// File: pages/api/upload.ts

import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";
import fs from "fs";
import util from "util";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new IncomingForm();
    const [_fields, files] = await form.parse(req);

    const persistentFile = Array.isArray(files.file)
      ? files.file[0]
      : files.file;
    // get file from persistent file

    if (!persistentFile)
      return res.status(400).json({ error: "No file found" });

    const fileName = slugify(
      (persistentFile.originalFilename ?? persistentFile.newFilename).split(
        "."
      )[0]
    );
    // Read the file into a Buffer
    const readFile = util.promisify(fs.readFile);
    const fileBuffer = await readFile(persistentFile.filepath);
    const { error: uploadError, data: uploadData } =
      await supabaseAdminClient.storage
        .from("task-assets")
        .upload(`${fileName}.jpg`, fileBuffer, { upsert: true });

    if (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }

    const { data: publicUrlData } = supabaseAdminClient.storage
      .from("task-assets")
      .getPublicUrl(uploadData.path);

    return res.status(200).json(publicUrlData);
  } else {
    res.status(405).json({ error: "Method not allowed. Use POST" });
  }
};

export default uploadImage;
