import * as dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { UserType } from '../dto/create-user.dto';

export const UserSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: {
        name: 'EmailIndex',
      },
    },
    type: {
      type: String,
      enum: [UserType],
      required: true,
    },
  },
  { timestamps: true },
);

export const UserModel = dynamoose.model<User>(
  process.env.DYNAMODB_TABLE_USER!,
  UserSchema,
);
