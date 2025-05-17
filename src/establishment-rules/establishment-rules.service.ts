import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstablishmentRuleDto } from './dto/create-establishment-rule.dto';
import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';
import { EstablishmentRulesRepository } from './establishment-rules.repository';
import { EstablishmentService } from 'src/establishment/establishment.service';
import { EstablishmentRules } from './entities/establishment-rule.entity';

@Injectable()
export class EstablishmentRulesService {
  constructor(
    private readonly repository: EstablishmentRulesRepository,
    private readonly establishmentService: EstablishmentService,
  ) {}

  async create(dto: CreateEstablishmentRuleDto): Promise<EstablishmentRules> {
    await this.establishmentService.findOne(dto.establishmentId);
    return this.repository.create(dto);
  }

  async findByEstablishmentId(
    establishmentId: string,
  ): Promise<EstablishmentRules[]> {
    const rulesList =
      await this.repository.findByEstablishment(establishmentId);
    const rule = rulesList[0];
    if (!rule) {
      throw new NotFoundException(
        `Regras não encontradas para ${establishmentId}`,
      );
    }
    return rulesList;
  }

  async update(
    id: string,
    updateEstablishmentRuleDto: UpdateEstablishmentRuleDto,
  ): Promise<EstablishmentRules> {
    const existing = await this.repository.findOne(id);
    if (!existing) {
      throw new NotFoundException(`Regras ${id} não encontradas`);
    }
    const updated = {
      ...existing,
      ...updateEstablishmentRuleDto,
    } as EstablishmentRules;
    return this.repository.update(updated);
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
