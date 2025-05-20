import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProductModule } from './product/product.module';
import { EstablishmentRulesModule } from './establishment-rules/establishment-rules.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        aws: {
          region: config.get('AWS_REGION'),
          accessKeyId: config.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: config.get('AWS_SECRET_ACCESS_KEY'),
        },
      }),
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
