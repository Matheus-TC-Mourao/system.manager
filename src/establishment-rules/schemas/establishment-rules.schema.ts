import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
import { EstablishmentRules } from '../entities/establishment-rule.entity';

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

export const EstablishmentRulesModel = dynamoose.model<EstablishmentRules>(
  process.env.DYNAMODB_TABLE_ESTABLISHMENT_RULES!,
  EstablishmentRulesSchema,
);
