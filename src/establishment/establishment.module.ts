import { Module } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { EstablishmentRepository } from './establishment.repository';

@Module({
  controllers: [EstablishmentController],
  providers: [EstablishmentService, EstablishmentRepository],
  exports: [EstablishmentService],
})
export class EstablishmentModule {}
