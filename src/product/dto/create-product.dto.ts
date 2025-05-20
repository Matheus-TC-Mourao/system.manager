import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsUUID()
  readonly establishmentId: string;
}
