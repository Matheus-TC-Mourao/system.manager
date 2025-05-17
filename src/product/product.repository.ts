import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductModel } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository {
  async create(product: CreateProductDto): Promise<Product> {
    const created = await ProductModel.create(product);
    return created;
  }

  async findAll(): Promise<Product[]> {
    const result = await ProductModel.scan().exec();
    return result;
  }

  async findOne(id: string): Promise<Product> {
    const result = await ProductModel.get(id);
    return result;
  }

  async findByType(type: string): Promise<Product> {
    const result = await ProductModel.get(type);
    return result;
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const updateObj = { ...product };
    updateObj.updatedAt = new Date();

    const updated = await ProductModel.update({ id }, updateObj);

    return updated;
  }

  async remove(id: string): Promise<void> {
    await ProductModel.delete(id);
  }
}
