import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateEstablishmentRuleDto {
  @IsUUID()
  readonly establishmentId: string;

  @IsInt()
  @Min(0)
  readonly picturesLimit: number;

  @IsInt()
  @Min(0)
  readonly videoLimit: number;
}
