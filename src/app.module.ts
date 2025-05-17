import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProductModule } from './product/product.module';
import { EstablishmentRulesModule } from './establishment-rules/establishment-rules.module';

@Module({
  imports: [
    DynamooseModule.forRoot({
      aws: {
        region: process.env.AWS_REGION!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    }),
    UserModule,
    EstablishmentModule,
    ProductModule,
    EstablishmentRulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
