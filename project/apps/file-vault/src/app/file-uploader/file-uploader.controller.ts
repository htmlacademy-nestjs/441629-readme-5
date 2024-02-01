import 'multer';
import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from './file-uploader.service';
import { fillDto } from '@project/shared/helpers';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { MongoIdValidationPipe } from '@project/shared/core';
import { ApiTags } from '@nestjs/swagger';
import { FILE_INFO, MAX_FILE_SIZE } from './file-uploader.constant';
import { FileValidationPipe } from './pipes/file-validation.pipe';

@ApiTags('File Uploader routes')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) { }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new FileValidationPipe({
    maxSize: MAX_FILE_SIZE,
    message: FILE_INFO.MAX_SIZE,
  }))
  public async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    const fileEntity = await this.fileUploaderService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Post('/upload-info')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFileInfo(
    @Body()
    file: Express.Multer.File,
  ) {
    const fileEntity = await this.fileUploaderService.saveFile({ ...file, buffer: Buffer.from(`${file.buffer}`, 'hex') });

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @Get(':fileId')
  public async show(
    @Param('fileId', MongoIdValidationPipe)
    fileId: string,
  ) {
    const existFile = await this.fileUploaderService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
