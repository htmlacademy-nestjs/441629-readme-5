import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderModel } from './file-uploader.model';

@Injectable()
export class FileUploaderRepository extends BaseMongoRepository<FileUploaderEntity, FileUploaderModel> {
  constructor(
    @InjectModel(FileUploaderModel.name)
    fileUploaderModel: Model<FileUploaderModel>,
  ) {
    super(fileUploaderModel, FileUploaderEntity.fromObject);
  }
}
