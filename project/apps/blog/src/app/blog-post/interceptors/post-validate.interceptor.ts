import { BadRequestException, CallHandler, ExecutionContext, HttpException, HttpStatus, Logger, NestInterceptor } from '@nestjs/common';
import { IPost, PostEnum } from '@project/shared/app/types';
import { ValidationError, validate } from 'class-validator';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { plainToInstance } from 'class-transformer';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { CreatePostDto } from '../dto/create-post.dto';

export class PostValidateInterceptor implements NestInterceptor {
  private getDto(postType) {
    switch (postType) {
      case PostEnum.video:
        return CreateVideoPostDto;
      case PostEnum.text:
        return CreateTextPostDto;
      case PostEnum.quote:
        return CreateQuotePostDto;
      case PostEnum.photo:
        return CreatePhotoPostDto;
      case PostEnum.link:
        return CreateLinkPostDto;
      default:
        return CreatePostDto;
    }
  }

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const post: IPost = request.body;
    let validationResult;

    validationResult = await validate(
      plainToInstance(this.getDto(post.postType), post),
      { validationError: { target: false } }
    );

    if (validationResult) {
      const errors = [];

      validationResult.forEach(item => {
        for (let key in item.constraints) {
          errors.push(item.constraints[key]);
        }
      });

      if (errors.length) {
        throw new BadRequestException(errors);
      }
    }

    return next.handle();
  }
}
