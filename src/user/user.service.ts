import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
// import { UserModel } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from 'nestjs-dynamoose';
import { ModelType } from 'dynamoose/dist/General';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: ModelType<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const existing = await this.userModel.scan('email').eq(user.email).exec();
    if (existing.count !== 0) {
      throw new BadRequestException('Já existe usuário com esse email!');
    }
    return this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.scan().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.get(id);
    if (!user) throw new NotFoundException(`User ${id} não encontrado`);
    return user;
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    return this.userModel.update({ id }, user);
  }
  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.userModel.delete(id);
  }
}
