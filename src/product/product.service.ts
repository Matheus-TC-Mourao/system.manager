import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { InjectModel } from 'nestjs-dynamoose';
import { ModelType } from 'dynamoose/dist/General';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private Model: ModelType<Product>,
    private readonly establishmentService: EstablishmentService,
  ) {}
  async create(product: CreateProductDto): Promise<Product> {
    await this.establishmentService.findOne(product.establishmentId);
    const created = await this.Model.create(product);
    return created;
  }

  async findAll(): Promise<Product[]> {
    const result = await this.Model.scan().exec();
    return result;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.Model.get(id);
    if (!product) throw new NotFoundException(`Product ${id} não encontrado`);
    return product;
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const existing = await this.findOne(id);
    if (
      product.establishmentId &&
      product.establishmentId !== existing.establishmentId
    ) {
      await this.establishmentService.findOne(product.establishmentId);
    }
    const updated = { ...product };
    return this.Model.update(id, updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.Model.delete(id);
  }
}
