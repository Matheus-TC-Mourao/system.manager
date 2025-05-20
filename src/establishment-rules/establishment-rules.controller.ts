import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstablishmentRulesService } from './establishment-rules.service';
import { CreateEstablishmentRuleDto } from './dto/create-establishment-rule.dto';
// import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';
import { EstablishmentRules } from './entities/establishment-rule.entity';
import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';

@Controller('establishment-rules')
export class EstablishmentRulesController {
  constructor(private readonly rulesService: EstablishmentRulesService) {}

  @Post()
  async create(
    @Body() createEstablishmentRuleDto: CreateEstablishmentRuleDto,
  ): Promise<EstablishmentRules> {
    return await this.rulesService.create(createEstablishmentRuleDto);
  }

  @Get(':id')
  async findByEstablishmentId(
    @Param('id') id: string,
  ): Promise<EstablishmentRules[]> {
    return await this.rulesService.findByEstablishment(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstablishmentRuleDto: UpdateEstablishmentRuleDto,
  ): Promise<EstablishmentRules> {
    return await this.rulesService.update(id, updateEstablishmentRuleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.rulesService.remove(id);
  }
}
