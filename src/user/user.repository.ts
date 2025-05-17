import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserModel } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  async create(user: CreateUserDto): Promise<User> {
    const created = await UserModel.create(user);
    return created;
  }

  async findAll(): Promise<User[]> {
    const result = await UserModel.scan().exec();
    return result;
  }

  async findOne(id: string): Promise<User> {
    const result = await UserModel.get(id);
    return result;
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const updateObj = { ...user };
    updateObj.updatedAt = new Date();

    const updated = await UserModel.update({ id }, updateObj);

    return updated;
  }
  async remove(id: string): Promise<void> {
    await UserModel.delete(id);
  }
}
