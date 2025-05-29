/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'diwrfhagt',
  api_key: '338948144218659',
  api_secret: 'NB7qF_AA3B1zDkw9RLyZkNTXNJ4',
});

// Upload Function
export async function uploadToCloudinary(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'centers',
      resource_type: 'auto',
    });
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Cloudinary upload failed');
  }
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  filename: string,
) {
  return new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'centers',
          resource_type: 'auto',
          public_id: filename.replace(/\.[^/.]+$/, ''), // remove extension for public_id
        },
        (
          error: unknown,
          result: { secure_url: string; public_id: string } | undefined,
        ) => {
          if (error) {
            console.error('Cloudinary buffer upload failed:', error);
            return reject(new Error('Cloudinary upload failed'));
          }
          if (result) {
            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
            });
          }
        },
      );
      stream.end(buffer);
    },
  );
}

export const deleteFromCloudinary = async (imageUrl: string) => {
  const publicId = imageUrl.split('/').pop()?.split('.')[0];
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};
