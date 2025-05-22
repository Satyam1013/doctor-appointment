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
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'centers',
  });
  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}
