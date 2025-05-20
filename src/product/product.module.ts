import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { EstablishmentModule } from 'src/establishment/establishment.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
        options: {
          tableName: process.env.DYNAMODB_TABLE_PRODUCT,
        },
      },
    ]),
    EstablishmentModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
