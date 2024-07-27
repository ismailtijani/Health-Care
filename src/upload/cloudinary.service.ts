import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private logger: Logger;
  constructor() {
    this.logger = new Logger(CloudinaryService.name);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    fileBuffer: Buffer,
    filename: string,
  ): Promise<UploadApiResponse> {
    try {
      return await this.uploadToCloudinary(
        fileBuffer,
        filename,
        'UniIlorin Health Care/images',
      );
    } catch (error) {
      this.logger.error(`Error uploading image to Cloudinary`, error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async uploadDocument(
    fileBuffer: Buffer,
    filename: string,
  ): Promise<UploadApiResponse> {
    try {
      return await this.uploadToCloudinary(
        fileBuffer,
        filename,
        'UniIlorin Health Care/documents',
      );
    } catch (error) {
      this.logger.error(`Error uploading document to Cloudinary`, error);
      throw new Error(`Failed to upload document: ${error.message}`);
    }
  }

  private uploadToCloudinary(
    fileBuffer: Buffer,
    filename: string,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, filename_override: filename },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      uploadStream.end(fileBuffer);
    });
  }
}
