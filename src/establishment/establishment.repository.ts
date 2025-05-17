import { Injectable } from '@nestjs/common';
import { Establishment } from './entities/establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { EstablishmentModel } from './schemas/establishment.schema';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentRepository {
  async create(establishment: CreateEstablishmentDto): Promise<Establishment> {
    const created = await EstablishmentModel.create(establishment);
    return created;
  }

  async findAll(): Promise<Establishment[]> {
    const result = await EstablishmentModel.scan().exec();
    return result;
  }

  async findOne(id: string): Promise<Establishment> {
    const result = await EstablishmentModel.get(id);
    return result;
  }

  async findByType(type: string): Promise<Establishment> {
    const result = await EstablishmentModel.get(type);
    return result;
  }

  async update(
    id: string,
    establishment: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    const updateObj = { ...establishment };
    updateObj.updatedAt = new Date();

    const updated = await EstablishmentModel.update({ id }, updateObj);

    return updated;
  }

  async remove(id: string): Promise<void> {
    await EstablishmentModel.delete(id);
  }
}
