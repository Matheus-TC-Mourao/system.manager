import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

export const ProductSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    establishmentId: { type: String, required: true },
  },
  { timestamps: true },
);
