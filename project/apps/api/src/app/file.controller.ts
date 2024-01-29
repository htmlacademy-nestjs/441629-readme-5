import 'multer';
import { Controller, Get, HttpException, Param, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { FileInterceptor } from '@nestjs/platform-express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApplicationServiceURL } from './app.config';

@ApiTags('File-vault routes')
@Controller('file')
@UseFilters(AxiosExceptionFilter)
export class FileController {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  @Get('/:id')
  public async index(
    @Param('id')
    id: string,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${id}`);

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile()
    dto: Express.Multer.File,
  ) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload-info`, { ...dto, buffer: dto.buffer.toString('hex') });

      return data;
    } catch ({ response }) {
      throw new HttpException(response?.data?.message, response?.data?.statusCode);
    }
  }
}
