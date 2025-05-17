import { Item } from 'dynamoose/dist/Item';

export class Product extends Item {
  id: string;
  name: string;
  price: number;
  establishmentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
