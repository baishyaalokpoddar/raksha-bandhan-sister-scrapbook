/**
 * Compresses and resizes an uploaded image file into an optimized Web base64 JPEG
 * Keeps the file size tiny (~20KB-45KB) so it saves reliably to localStorage and share URLs
 */
export const compressImageFile = (
  file: File,
  maxWidth: number = 600,
  maxHeight: number = 600,
  quality: number = 0.72
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        // Draw and export as optimized JPEG
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedBase64);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image for compression"));
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
