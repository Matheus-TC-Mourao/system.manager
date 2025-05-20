import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { UserModule } from 'src/user/user.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import { EstablishmentSchema } from './schemas/establishment.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Establishment',
        schema: EstablishmentSchema,
        options: {
          tableName: process.env.DYNAMODB_TABLE_ESTABLISHMENT,
        },
      },
    ]),
    UserModule,
  ],
  controllers: [EstablishmentController],
  providers: [EstablishmentService],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}
