import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum UserType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
