import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  Get,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { CurrentUser } from 'src/shared/decorators';
import { Student } from 'src/studentAuth/entities';
import { AuthGuard } from 'src/shared/guards';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File Uploads')
@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
  private logger: Logger;
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly uploadService: UploadService,
  ) {
    this.logger = new Logger(UploadController.name);
  }

  /**
   * API Endpoint to uplaod Profile picture
   * @param file
   * @param user
   * @returns
   */
  @Post('profile-picture')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2MB
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: Student,
  ) {
    try {
      const result = await this.cloudinaryService.uploadImage(
        file.buffer,
        file.originalname,
      );
      await this.uploadService.saveProfilePicture(user.id, result.secure_url);
      return {
        message: 'Profile picture uploaded successfully',
        url: result.secure_url,
      };
    } catch (error) {
      this.logger.error(`Error uploading profile picture`, error);
      throw new BadRequestException(
        `Error uploading profile picture: ${error.message}`,
      );
    }
  }

  // /**
  //  * API endpoint to upload documents
  //  * @param file
  //  * @param user
  //  * @returns
  //  */
  // @Post('document')
  // @UseInterceptors(FileInterceptor('document'))
  // async uploadDocument(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
  //         new FileTypeValidator({ fileType: /(pdf|doc|docx)$/ }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  //   @CurrentUser() user: DoctorEntity,
  // ) {
  //   try {
  //     const result = await this.cloudinaryService.uploadDocument(
  //       file.buffer,
  //       file.originalname,
  //     );
  //     await this.uploadService.saveDocument(
  //       user.id,
  //       result.secure_url,
  //       file.originalname,
  //     );
  //     return {
  //       message: 'Document uploaded successfully',
  //       url: result.secure_url,
  //     };
  //   } catch (error) {
  //     this.logger.error(`Error uploading document`, error);
  //     throw new BadRequestException(
  //       `Error uploading document: ${error.message}`,
  //     );
  //   }
  // }

  /**
   * API endpoint to retrieve user profile picture
   * @param userId
   * @returns
   */
  @Get('profile-picture/:userId')
  async getProfilePicture(@Param('userId') userId: number) {
    try {
      const url = await this.uploadService.getProfilePictureUrl(userId);
      return { url };
    } catch (error) {
      this.logger.error(`Error retrieving profile picture`, error);
      throw new BadRequestException(
        `Error retrieving profile picture: ${error.message}`,
      );
    }
  }

  // /**
  //  * API endpoint to retrieve user profile documents
  //  * @param userId
  //  * @returns
  //  */
  // @Get('documents/:userId')
  // async getUserDocuments(@Param('userId') userId: string) {
  //   try {
  //     const documents = await this.uploadService.getUserDocuments(userId);
  //     return { documents };
  //   } catch (error) {
  //     this.logger.error(`Error retrieving user documents`, error);
  //     throw new BadRequestException(
  //       `Error retrieving user documents: ${error.message}`,
  //     );
  //   }
  // }
}
