import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
import { EstablishmentType } from '../dto/create-establishment.dto';
import { Establishment } from '../entities/establishment.entity';

export const EstablishmentSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    name: { type: String, required: true },
    ownerId: { type: String, required: true },
    type: { type: String, enum: [EstablishmentType], required: true },
  },
  { timestamps: true },
);

export const EstablishmentModel = dynamoose.model<Establishment>(
  process.env.DYNAMODB_TABLE_ESTABLISHMENT!,
  EstablishmentSchema,
);
