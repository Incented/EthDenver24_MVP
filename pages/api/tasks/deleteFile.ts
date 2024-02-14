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

const collectRequestBody = (req: NextApiRequest): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // Convert binary chunks to string
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", (error) => reject(error));
  });
};

const deleteFile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const body = await collectRequestBody(req);
    console.log("Request body:", body); // Check the entire body structure
    const { path } = body;

    console.log("Deleting file:", path);

    if (!path) {
      return res.status(400).json({ error: "File path is required" });
    }

    // Ensure the path is sent as an array
    const { error } = await supabaseAdminClient.storage
      .from("task-assets")
      .remove(path); // Corrected to use an array

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "File deleted successfully" });
  } else {
    return res.status(405).json({ error: "Method not allowed. Use DELETE" });
  }
};

export default deleteFile;
