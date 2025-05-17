import { Item } from 'dynamoose/dist/Item';

export class EstablishmentRules extends Item {
  id: string;
  establishmentId: string;
  picturesLimit: number;
  videoLimit: number;
  createdAt?: Date;
  updatedAt?: Date;
}
