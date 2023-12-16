import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '@project/shared/app/types';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements IUser {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
