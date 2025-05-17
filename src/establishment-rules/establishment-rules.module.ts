import { Module } from '@nestjs/common';
import { EstablishmentRulesService } from './establishment-rules.service';
import { EstablishmentRulesController } from './establishment-rules.controller';
import { EstablishmentRulesRepository } from './establishment-rules.repository';

@Module({
  controllers: [EstablishmentRulesController],
  providers: [EstablishmentRulesService, EstablishmentRulesRepository],
  exports: [EstablishmentRulesService],
})
export class EstablishmentRulesModule {}
