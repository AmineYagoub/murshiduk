import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create';

export class UpdateServiceDto extends PartialType(
  OmitType(CreateServiceDto, ['authorId'] as const)
) {}
