import * as mime from "mime";

export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  return `${timestamp}_${originalName}`;
}

export function validateImageFile(originalName: string): boolean {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  const mimeType = mime.getType(originalName);
  return mimeType && allowedMimeTypes.includes(mimeType);
}
