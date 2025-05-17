import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../entities/product.entity';

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

export const ProductModel = dynamoose.model<Product>(
  process.env.DYNAMODB_TABLE_PRODUCT!,
  ProductSchema,
);
