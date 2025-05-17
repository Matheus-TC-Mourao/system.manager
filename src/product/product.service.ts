import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { EstablishmentService } from 'src/establishment/establishment.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly establishmentService: EstablishmentService,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.establishmentService.findOne(createProductDto.establishmentId);
    return this.productRepository.create(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} não encontrado`);
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existing = await this.productRepository.findOne(id);
    if (
      updateProductDto.establishmentId &&
      updateProductDto.establishmentId !== existing.establishmentId
    ) {
      await this.establishmentService.findOne(updateProductDto.establishmentId);
    }
    const updated = { ...existing, ...updateProductDto };
    return this.productRepository.update(id, updated);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.remove(id);
  }
}
