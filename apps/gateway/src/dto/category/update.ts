import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
