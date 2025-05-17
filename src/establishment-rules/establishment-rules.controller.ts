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
import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';

@Controller('establishment-rules')
export class EstablishmentRulesController {
  constructor(
    private readonly establishmentRulesService: EstablishmentRulesService,
  ) {}

  @Post()
  create(@Body() createEstablishmentRuleDto: CreateEstablishmentRuleDto) {
    return this.establishmentRulesService.create(createEstablishmentRuleDto);
  }

  @Get(':id')
  findByEstablishmentId(@Param('id') id: string) {
    return this.establishmentRulesService.findByEstablishmentId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentRuleDto: UpdateEstablishmentRuleDto,
  ) {
    return this.establishmentRulesService.update(
      id,
      updateEstablishmentRuleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentRulesService.remove(id);
  }
}
