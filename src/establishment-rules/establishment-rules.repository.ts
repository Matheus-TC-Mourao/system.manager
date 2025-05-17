import { CreateEstablishmentRuleDto } from './dto/create-establishment-rule.dto';
import { EstablishmentRules } from './entities/establishment-rule.entity';
import { EstablishmentRulesModel } from './schemas/establishment-rules.schema';

export class EstablishmentRulesRepository {
  async create(rules: CreateEstablishmentRuleDto): Promise<EstablishmentRules> {
    return await EstablishmentRulesModel.create(rules);
  }

  async findByEstablishment(
    establishmentId: string,
  ): Promise<EstablishmentRules[]> {
    return await EstablishmentRulesModel.query('establishmentId')
      .eq(establishmentId)
      .exec();
  }

  findOne(id: string): Promise<EstablishmentRules> {
    return EstablishmentRulesModel.get(id);
  }

  async update(rules: EstablishmentRules): Promise<EstablishmentRules> {
    return await EstablishmentRulesModel.update(rules);
  }

  async remove(id: string): Promise<void> {
    return await EstablishmentRulesModel.delete(id);
  }
}
