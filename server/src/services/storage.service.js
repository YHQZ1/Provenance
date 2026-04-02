import { supabaseAdmin } from "../../config/database.js";
import fs from "fs/promises";
import path from "path";

const BUCKET_NAME = "documents";

export const storageService = {
  /**
   * Upload file to Supabase Storage
   */
  async uploadFile(localFilePath, userId, originalName) {
    const ext = path.extname(originalName);
    const timestamp = Date.now();
    const safeName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const storagePath = `${userId}/${timestamp}-${safeName}${ext}`;

    const fileBuffer = await fs.readFile(localFilePath);

    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: getContentType(ext),
        upsert: false,
      });

    if (error) {
      throw new Error(`Storage upload failed: ${error.message}`);
    }

    // Clean up temp file
    await fs.unlink(localFilePath).catch((err) => {
      console.error("Failed to clean up temp file:", err);
    });

    return { path: storagePath };
  },

  /**
   * Get signed URL for file access
   */
  async getSignedUrl(storagePath, expiresInSeconds = 3600) {
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(storagePath, expiresInSeconds);

    if (error) {
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }

    return data.signedUrl;
  },

  /**
   * Delete file from storage
   */
  async deleteFile(storagePath) {
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([storagePath]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  },
};

function getContentType(ext) {
  const map = {
    ".pdf": "application/pdf",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".tiff": "image/tiff",
    ".tif": "image/tiff",
  };
  return map[ext.toLowerCase()] || "application/octet-stream";
}