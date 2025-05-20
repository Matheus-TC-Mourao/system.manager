import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

export const EstablishmentRulesSchema = new dynamoose.Schema(
  {
    id: { type: String, hashKey: true, default: () => uuidv4() },
    establishmentId: { type: String, required: true },
    picturesLimit: { type: Number, required: true },
    videoLimit: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);
