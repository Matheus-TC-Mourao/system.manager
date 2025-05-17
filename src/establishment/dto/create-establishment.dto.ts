import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';

export enum EstablishmentType {
  SHOPPING = 'shopping',
  LOCAL = 'local',
}

export class CreateEstablishmentDto {
  @IsString()
  readonly name: string;

  @IsUUID()
  readonly ownerId: string;

  @IsEnum(EstablishmentType)
  readonly type: EstablishmentType;

  @IsDate()
  readonly createdAt?: Date;

  @IsDate()
  readonly updatedAt?: Date;
}
