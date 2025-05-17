import { Item } from 'dynamoose/dist/Item';
import { EstablishmentType } from '../dto/create-establishment.dto';

export class Establishment extends Item {
  id: string;
  name: string;
  ownerId: string;
  email: string;
  type: EstablishmentType;
  createdAt?: Date;
  updatedAt?: Date;
}
