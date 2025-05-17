import { Item } from 'dynamoose/dist/Item';
import { UserType } from '../dto/create-user.dto';

export class User extends Item {
  id: string;
  name: string;
  email: string;
  type: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}
