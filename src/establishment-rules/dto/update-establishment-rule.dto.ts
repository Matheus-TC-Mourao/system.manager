import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablishmentRuleDto } from './create-establishment-rule.dto';

export class UpdateEstablishmentRuleDto extends PartialType(
  CreateEstablishmentRuleDto,
) {}
