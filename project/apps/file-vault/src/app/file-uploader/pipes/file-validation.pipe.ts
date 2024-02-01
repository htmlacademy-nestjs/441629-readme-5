import { Injectable, PayloadTooLargeException, PipeTransform } from '@nestjs/common';

export type FileSizeOptions = {
  maxSize: number,
  message: string,
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(
    private readonly options: FileSizeOptions,
  ) {
    Object.assign(this, options);
  }

  public transform(value: File): File {
    if (value.size > this.options.maxSize) {
      throw new PayloadTooLargeException(this.options.message);
    }

    return value;
  }
}
