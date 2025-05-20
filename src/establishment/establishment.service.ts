import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Establishment } from './entities/establishment.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { InjectModel } from 'nestjs-dynamoose';
import { ModelType } from 'dynamoose/dist/General';
import { UserService } from 'src/user/user.service';
import { UserType } from 'src/user/dto/create-user.dto';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectModel('Establishment') private Model: ModelType<Establishment>,
    private readonly userService: UserService,
  ) {}

  async create(establishment: CreateEstablishmentDto): Promise<Establishment> {
    const user = await this.userService.findOne(establishment.ownerId);
    if (!user || user.type !== UserType.OWNER) {
      throw new BadRequestException('Apenas para usuário do tipo owner');
    }
    return this.Model.create(establishment);
  }

  async findAll(): Promise<Establishment[]> {
    return this.Model.scan().exec();
  }

  async findOne(id: string): Promise<Establishment> {
    const establishment = await this.Model.get(id);
    if (!establishment)
      throw new NotFoundException(`Establishment ${id} não encontrado`);

    return establishment;
  }

  async findByType(type: string): Promise<Establishment[]> {
    const establishment = await this.Model.scan('type').eq(type).exec();
    if (establishment.length === 0)
      throw new NotFoundException(
        `Establishment do tipo ${type} não encontrado`,
      );
    return establishment;
  }

  async update(
    id: string,
    establishment: UpdateEstablishmentDto,
  ): Promise<Establishment> {
    await this.findOne(id);
    return this.Model.update({ id }, establishment);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.Model.delete(id);
  }
}
