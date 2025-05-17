import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(UserType)
  readonly type: UserType;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}
