import { CreateEstablishmentRuleDto } from './dto/create-establishment-rule.dto';
import { EstablishmentRules } from './entities/establishment-rule.entity';
import { InjectModel } from 'nestjs-dynamoose';
import { ModelType } from 'dynamoose/dist/General';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';

export class EstablishmentRulesService {
  constructor(
    @InjectModel('EstablishmentRules')
    private Model: ModelType<EstablishmentRules>,
    private readonly establishmentService: EstablishmentService,
  ) {}

  async create(rules: CreateEstablishmentRuleDto): Promise<EstablishmentRules> {
    await this.establishmentService.findOne(rules.establishmentId);
    return this.Model.create(rules);
  }

  async findByEstablishment(
    establishmentId: string,
  ): Promise<EstablishmentRules[]> {
    const rulesList = await this.Model.scan('establishmentId')
      .eq(establishmentId)
      .exec();
    if (rulesList.length === 0) {
      throw new NotFoundException(
        `Regras não encontradas para ${establishmentId}`,
      );
    }
    return rulesList;
  }

  async findOne(id: string): Promise<EstablishmentRules> {
    const existing = await this.Model.get(id);
    if (!existing) {
      throw new NotFoundException(`Regras ${id} não encontradas`);
    }
    return existing;
  }

  async update(
    id: string,
    rules: UpdateEstablishmentRuleDto,
  ): Promise<EstablishmentRules> {
    await this.findOne(id);

    return this.Model.update({ id }, rules);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    return this.Model.delete(id);
  }
}
