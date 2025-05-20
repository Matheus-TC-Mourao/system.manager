import { Module } from '@nestjs/common';
import { EstablishmentRulesService } from './establishment-rules.service';
import { EstablishmentRulesController } from './establishment-rules.controller';
import { EstablishmentModule } from 'src/establishment/establishment.module';
import { EstablishmentRulesSchema } from './schemas/establishment-rules.schema';
import { DynamooseModule } from 'nestjs-dynamoose';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'EstablishmentRules',
        schema: EstablishmentRulesSchema,
        options: {
          tableName: process.env.DYNAMODB_TABLE_ESTABLISHMENT_RULES,
        },
      },
    ]),
    EstablishmentModule,
  ],
  controllers: [EstablishmentRulesController],
  providers: [EstablishmentRulesService],
  exports: [EstablishmentRulesService],
})
export class EstablishmentRulesModule {}
