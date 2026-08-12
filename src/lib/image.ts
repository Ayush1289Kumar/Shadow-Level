// ─────────────────────────────────────────────────────────────────────────────
// image.ts — Client-side image compression utilities for Shadow Level
// Uses the Canvas API (zero dependencies) to compress avatars before storage.
// ─────────────────────────────────────────────────────────────────────────────

const AVATAR_SIZE = 128;
const AVATAR_QUALITY = 0.7;

/**
 * Compress an image File to a 128×128 JPEG data URL at 70% quality.
 * This reduces a typical avatar from ~500KB to ~5-15KB before localStorage storage.
 */
export function compressAvatar(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      // Draw to an offscreen canvas at target dimensions
      const canvas = document.createElement("canvas");
      canvas.width = AVATAR_SIZE;
      canvas.height = AVATAR_SIZE;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context unavailable"));
        return;
      }

      // Center-crop: compute source dimensions to fill the square
      const { naturalWidth: sw, naturalHeight: sh } = img;
      const scale = Math.max(AVATAR_SIZE / sw, AVATAR_SIZE / sh);
      const scaledW = sw * scale;
      const scaledH = sh * scale;
      const offsetX = (AVATAR_SIZE - scaledW) / 2;
      const offsetY = (AVATAR_SIZE - scaledH) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

      resolve(canvas.toDataURL("image/jpeg", AVATAR_QUALITY));
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = objectUrl;
  });
}
