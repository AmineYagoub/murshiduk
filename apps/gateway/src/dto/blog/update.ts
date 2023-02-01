import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create';

export class UpdateBlogDto extends PartialType(
  OmitType(CreateBlogDto, ['authorId'] as const)
) {
  blogId: string;
}
