import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { EstablishmentRepository } from './establishment.repository';
import { Establishment } from './entities/establishment.entity';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/dto/create-user.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    private readonly establishmentRepository: EstablishmentRepository,
    private readonly userService: UserService,
  ) {}

  async create(
    createEstablishmentDto: CreateEstablishmentDto,
  ): Promise<Establishment> {
    const user = await this.userService.findOne(createEstablishmentDto.ownerId);
    if (!user || user.type !== UserType.OWNER) {
      throw new BadRequestException('Apenas para usuário do tipo owner');
    }
    return this.establishmentRepository.create(createEstablishmentDto);
  }

  findAll(): Promise<Establishment[]> {
    return this.establishmentRepository.findAll();
  }

  async findOne(id: string): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findOne(id);
    if (!establishment)
      throw new NotFoundException(`Establishment ${id} não encontrado`);
    return establishment;
  }

  async findByType(type: string): Promise<Establishment> {
    const establishment = await this.establishmentRepository.findByType(type);
    if (!establishment)
      throw new NotFoundException(
        `Establishment do tipo ${type} não encontrado`,
      );
    return establishment;
  }

  async update(
    id: string,
    updateEstablishmentDto: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    await this.establishmentRepository.findOne(id);
    return this.establishmentRepository.update(id, updateEstablishmentDto);
  }

  async remove(id: string): Promise<void> {
    await this.establishmentRepository.remove(id);
  }
}
